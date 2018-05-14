import requests
from ..endpoints import rg


class RgFacade():
    config = None

    @staticmethod
    def init(config):
        RgFacade.config = config

    @staticmethod
    def init_events(get_events_result):
        url = rg['events'].format(root=RgFacade.config.get_rg_url())
        response = requests.post(url, json=get_events_result.to_dict())
        return response.status_code == 200
