import ConfigParser

section_name = 'toa_collector'


class Config():
    config = None
    toa_url = None
    ngw_url = None

    @staticmethod
    def init():
        config = ConfigParser.RawConfigParser()
        config.read('../config.ini')
        Config.config = config

    @staticmethod
    def get_meta_db_name():
        return Config.config.get(section_name, 'meta_db_name')

    @staticmethod
    def get_query_interval():
        return Config.config.getint(section_name, 'query_interval')

    @staticmethod
    def get_toa_url():
        if Config.toa_url:
            return Config.toa_url
        url = Config.config.get(section_name, 'toa_url')
        if url[-1] == '/':
            url = url[:-1]
        Config.toa_url = url
        return Config.toa_url
    
    @staticmethod
    def get_ngw_url():
        if Config.ngw_url:
            return Config.ngw_url
        url = Config.config.get(section_name, 'ngw_url')
        if url[-1] == '/':
            url = url[:-1]
        Config.ngw_url = url
        return Config.ngw_url