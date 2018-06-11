import requests

from ..endpoints import ngw
from ..log import info
from ..utils import ts_to_iso_8601


class NgwFacade():
    config = None
    last_update_cached = None

    @staticmethod
    def init(config):
        NgwFacade.config = config

    @staticmethod
    def get_last_update_ts():
        url = ngw['lastUpdate'].format(root=NgwFacade.config.get_ngw_url())
        response = requests.get(url)
        last_update_ts = int(response.text)
        info('[NGW] Last update ts from NGW is {ts} ({iso})'.format(
            ts=last_update_ts,
            iso=ts_to_iso_8601(last_update_ts)
        ))
        NgwFacade.last_update_cached = last_update_ts
        return last_update_ts

    @staticmethod
    def get_last_update_cached():
        last_update_cached = NgwFacade.last_update_cached
        info('[NGW] Last update ts cached is {ts} ({iso})'.format(
            ts=last_update_cached,
            iso=ts_to_iso_8601(last_update_cached)
        ))
        return last_update_cached

    @staticmethod
    def send_events_to_ngw(get_events_result):
        url = ngw['receiveEvents'].format(root=NgwFacade.config.get_ngw_url())
        response = requests.post(url, None, json=get_events_result.to_json())
        if response.status_code != 200:
            info('[NGW] ERROR - Data was not sent!')
            return False
        response_json = response.json()
        if not response_json['success']:
            return False
        ngw_last_update_ts = response_json['data']['lastUpdateTs']
        NgwFacade.last_update_cached = ngw_last_update_ts
        info('[NGW] Data was sent. Last update ts from NGW is {ts} ({iso})'.format(
            ts=ngw_last_update_ts,
            iso=ts_to_iso_8601(ngw_last_update_ts)
        ))
        return response_json['data']
