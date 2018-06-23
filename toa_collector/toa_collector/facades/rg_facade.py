import requests

from ..endpoints import rg
from ..log import info
from ..utils import ts_to_iso_8601


class RgFacade():
    config = None

    @staticmethod
    def init(config):
        RgFacade.config = config

    @staticmethod
    def init_events(get_events_result):
        url = rg['init'].format(root=RgFacade.config.get_rg_url())
        response = requests.post(url, json=get_events_result.to_dict(), timeout=60)

        if response.status_code != 201:
            info('[RG] Init events failed')
            return False

        response_json = response.json()

        if not response_json['success']:
            info('[RG] Init events failed')
            return False

        ts_start = response_json['data']['start']
        ts_end = response_json['data']['stop']
        info('[RG] Init events {ts_start} ({iso_start}) - {ts_end} ({iso_end}) - ok'.format(
            ts_start=ts_start,
            iso_start=ts_to_iso_8601(ts_start),
            ts_end=ts_end,
            iso_end=ts_to_iso_8601(ts_end)
        ))

        return response_json

    @staticmethod
    def send_events(get_events_result):
        url = rg['events'].format(root=RgFacade.config.get_rg_url())
        response = requests.post(url, json=get_events_result.to_dict(), timeout=60)

        if response.status_code != 201:
            info('[RG] Send events failed')
            return False

        response_json = response.json()

        if not response_json['success']:
            info('[RG] Send events failed')
            return False

        ts_start = response_json['data']['start']
        ts_end = response_json['data']['stop']
        info('[RG] Send events {ts_start} ({iso_start}) - {ts_end} ({iso_end}) - ok'.format(
            ts_start=ts_start,
            iso_start=ts_to_iso_8601(ts_start),
            ts_end=ts_end,
            iso_end=ts_to_iso_8601(ts_end)
        ))

        return response_json
