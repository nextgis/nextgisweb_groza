import requests
from endpoints import ngw


class NgwFacade():
    config = None

    @staticmethod
    def init(config):
        NgwFacade.config = config

    @staticmethod
    def get_last_update_ts():
        url = ngw['lastUpdate'].format(root=NgwFacade.config.get_ngw_url())

        response = requests.get(url)
        return int(response.text)

    @staticmethod
    def send_events_to_ngw(get_events_result):
        url = ngw['receiveEvents'].format(root=NgwFacade.config.get_ngw_url())

        response = requests.post(url, None, get_events_result.to_json())

        if response.status_code == 200:
            return True
        else:
            return False
