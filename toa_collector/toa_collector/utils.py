import datetime


def get_now_utc_iso_8601():
    return datetime.datetime.utcnow().strftime("%Y-%m-%dT%H%M%SZ")
