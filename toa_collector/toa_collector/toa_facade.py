import time

import requests
from config import Config
from endpoints import toa
from model import GetEventsResult
from utils import ts_to_iso_8601


def collect(ts_start, ts_stop=time.time()):
    get_events_url = toa['getEvents'].format(
        root=Config.get_toa_url(),
        start=ts_to_iso_8601(ts_start),
        stop=ts_to_iso_8601(ts_stop)
    )

    response = requests.get(get_events_url)

    if response.status_code == 200:
        events = response.json()
        return GetEventsResult(ts_start, ts_stop, events)
    else:
        return None
