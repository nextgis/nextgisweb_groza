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