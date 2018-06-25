from apscheduler.schedulers.blocking import BlockingScheduler
from config import Config
from toa_collector.facades import *
from toa_collector.processing import *
from utils import get_now_utc_ts, get_timedelta_sec_from_ts, ts_to_iso_8601
from log import info

IS_CLIPPING = True


def clip(get_events_result):
    if IS_CLIPPING:
        Clip.clip(get_events_result)


def pull_old_events(ts_start, ts_stop):
    get_events_result = ToaFacade.collect(ts_start, ts_stop)
    if get_events_result:
        clip(get_events_result)
        success_result = NgwFacade.send_events_to_ngw(get_events_result)
        if not success_result:
            time.sleep(Config.get_repeat_delay())
            pull_old_events(ts_start, ts_stop)
    else:
        time.sleep(Config.get_repeat_delay())
        pull_old_events(ts_start, ts_stop)


def handle_last_interval(current_ts):
    chunk_pulling_period = Config.get_chunk_pulling_period()

    last_update_ts = NgwFacade.get_last_update_ts()
    next_sec_update_ts = last_update_ts + 1

    time_delta_sec = get_timedelta_sec_from_ts(next_sec_update_ts, current_ts)

    if time_delta_sec <= chunk_pulling_period:
        pull_old_events(next_sec_update_ts, current_ts)
    elif time_delta_sec > chunk_pulling_period:
        current_start_ts = next_sec_update_ts
        current_end_ts = current_start_ts + chunk_pulling_period
        while current_end_ts < current_ts:
            pull_old_events(current_start_ts, current_end_ts)
            current_start_ts = current_end_ts + 1
            current_end_ts = current_start_ts + chunk_pulling_period
        pull_old_events(current_start_ts, current_ts)


def init_redis(current_ts):
    ts_start = current_ts - Config.get_active_monitoring_period()
    get_events_result = NgwFacade.get_rg_events(ts_start, current_ts)
    clip(get_events_result)
    result = RgFacade.init_events(get_events_result)
    if not result:
        time.sleep(Config.get_repeat_delay())
        init_redis(current_ts)


def periodic_pull_events(ts_start, ts_stop):
    get_events_result = ToaFacade.collect(ts_start, ts_stop)
    if get_events_result:
        clip(get_events_result)
        push_events_to_ngw(get_events_result)
        push_events_to_rg(get_events_result)
    else:
        time.sleep(Config.get_repeat_delay())
        periodic_pull_events(ts_start, ts_stop)


def push_events_to_ngw(get_events_result):
    success_result = NgwFacade.send_events_to_ngw(get_events_result)
    if not success_result:
        info('[NGW] Sent failed. Repeating...')
        time.sleep(Config.get_repeat_delay())
        push_events_to_ngw(get_events_result)


def push_events_to_rg(get_events_result):
    success_result = RgFacade.send_events(get_events_result)
    if not success_result:
        info('[RG] Sent failed. Repeating...')
        time.sleep(Config.get_repeat_delay())
        push_events_to_rg(get_events_result)


def periodic_collect():
    current_ts = get_now_utc_ts()
    last_update_ts = NgwFacade.get_last_update_cached()
    info('[periodic] Start update from "{start}" to "{end}"'.format(
        start=ts_to_iso_8601(last_update_ts),
        end=ts_to_iso_8601(current_ts)
    ))
    periodic_pull_events(last_update_ts + 1, current_ts)
    return True


def run():
    current_ts = get_now_utc_ts()
    handle_last_interval(current_ts)
    init_redis(current_ts)

    query_interval = Config.get_query_interval()
    scheduler = BlockingScheduler()
    scheduler.add_job(periodic_collect, 'interval', id='periodic_collect', seconds=query_interval)
    scheduler.start()


def main():
    Config.init()
    NgwFacade.init(Config)
    ToaFacade.init(Config)
    RgFacade.init(Config)
    Clip.init(Config)
    run()


if __name__ == '__main__':
    main()
