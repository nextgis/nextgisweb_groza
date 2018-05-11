import datetime
import time


def get_now_utc_ts():
    return int(time.time())


def get_timedelta_from_ts(start, end):
    start_dt = datetime.datetime.utcfromtimestamp(start)
    end_dt = datetime.datetime.utcfromtimestamp(end)
    return end_dt - start_dt


def get_timedelta_sec_from_ts(start, end):
    timedelta = get_timedelta_from_ts(start, end)
    return int(timedelta.total_seconds())


def get_now_utc_iso_8601():
    return datetime.datetime.utcnow().strftime("%Y-%m-%dT%H%M%SZ")


def ts_to_iso_8601(ts):
    return datetime.datetime.fromtimestamp(ts).strftime("%Y-%m-%dT%H%M%SZ")
