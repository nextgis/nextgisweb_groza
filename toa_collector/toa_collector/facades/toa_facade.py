import time

import requests

from ..endpoints import toa
from ..log import info
from ..model import GetEventsResult
from ..schemas.toa import ToaEventsSetSchema
from ..utils import ts_to_iso_8601
from ..log import data


class ToaFacade():
    config = None

    @staticmethod
    def init(config):
        ToaFacade.config = config

    @staticmethod
    def collect(ts_start, ts_stop=int(time.time())):
        start_iso = ts_to_iso_8601(ts_start)
        end_iso = ts_to_iso_8601(ts_start)

        get_events_url = toa['getEvents'].format(
            root=ToaFacade.config.get_toa_url(),
            start=start_iso,
            stop=end_iso
        )
        info('[TOA] Getting from "{}"'.format(get_events_url))
        response = requests.get(get_events_url, timeout=60)

        if response.status_code != 200:
            info('[TOA] Result failed. Http code: "{0}". Body: "{1}"'.format(
                get_events_url,
                response.text
            ))
            return None

        data(Config=ToaFacade.config,
             file_name='{start}-{end}'.format(start=start_iso, end=end_iso),
             data_to_log=response.text)

        schema_result = ToaEventsSetSchema().loads(response.text)

        if len(schema_result.errors.keys()) == 0 and schema_result.data['success'] is True:
            get_events_result = GetEventsResult(ts_start, ts_stop, schema_result.data['events'])
            info('[TOA] Returned {count} events for {start} ({ts_start}) - {end} ({ts_end})'.format(
                count=len(get_events_result.data),
                ts_start=ts_start,
                ts_end=ts_stop,
                start=ts_to_iso_8601(ts_start),
                end=ts_to_iso_8601(ts_stop)
            ))
            return get_events_result
        else:
            info('[TOA] ToaEventsSetSchema errors or result is not successfully')
            return None
