from apscheduler.schedulers.blocking import BlockingScheduler
from config import Config
from toa_collector.facades import *


def handle_last_interval():
    last_update_ts = NgwFacade.get_last_update_ts()
    get_events_result = ToaFacade.collect(last_update_ts)
    if get_events_result:
        NgwFacade.send_events_to_ngw(get_events_result)
        RgFacade.init_events(get_events_result)


def run():
    handle_last_interval()
    scheduler = BlockingScheduler()
    scheduler.add_job(ToaFacade.collect, 'interval', id='collect', seconds=Config.get_query_interval())
    scheduler.start()


def main():
    Config.init()
    NgwFacade.init(Config)
    ToaFacade.init(Config)
    RgFacade.init(Config)
    run()


if __name__ == '__main__':
    main()
