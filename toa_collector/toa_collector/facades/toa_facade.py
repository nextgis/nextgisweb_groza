import requests
import time
from ..endpoints import toa
from ..model import GetEventsResult
from ..utils import ts_to_iso_8601
from ..log import info
from ..schemas.toa import ToaEventsSetSchema


class ToaFacade():
    config = None

    @staticmethod
    def init(config):
        ToaFacade.config = config

    @staticmethod
    def collect(ts_start, ts_stop=int(time.time())):
        get_events_url = toa['getEvents'].format(
            root=ToaFacade.config.get_toa_url(),
            start=ts_to_iso_8601(ts_start),
            stop=ts_to_iso_8601(ts_stop)
        )
        info('[TOA] Getting from "{}"'.format(get_events_url))
        response = requests.get(get_events_url)

        if response.status_code != 200:
            info('[TOA] Result failed. Http code: "{0}". Body: "{1}"'.format(
                get_events_url,
                response.text
            ))
            return None

        schema_result = ToaEventsSetSchema().loads(response.text)

        if schema_result.errors.keys() == 0 and schema_result.data['success'] is True:
            return GetEventsResult(ts_start, ts_stop, schema_result.data['events'])
        else:
            return None
