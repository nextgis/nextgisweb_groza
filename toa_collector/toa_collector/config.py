import ConfigParser

section_name = 'toa_collector'
redis_section_name = 'redis'


class Config():
    config = None
    toa_url = None
    ngw_url = None
    rg_url = None
    repeat_delay = None
    chunk_pulling_period = None
    active_monitoring_period = None
    clipping_shp_path = None

    @staticmethod
    def init():
        config = ConfigParser.RawConfigParser()
        config.read('../config.ini')
        Config.config = config

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

    @staticmethod
    def get_rg_url():
        if Config.rg_url:
            return Config.rg_url
        url = Config.config.get(section_name, 'rg_url')
        if url[-1] == '/':
            url = url[:-1]
        Config.rg_url = url
        return Config.rg_url

    @staticmethod
    def get_repeat_delay():
        if Config.repeat_delay:
            return Config.repeat_delay
        repeat_delay = Config.config.get(section_name, 'repeat_delay_sec')
        Config.repeat_delay = int(repeat_delay)
        return Config.repeat_delay

    @staticmethod
    def get_chunk_pulling_period():
        if Config.chunk_pulling_period:
            return Config.chunk_pulling_period
        chunk_pulling_period = Config.config.get(section_name, 'chunk_pulling_period_sec')
        Config.chunk_pulling_period = int(chunk_pulling_period)
        return Config.chunk_pulling_period

    @staticmethod
    def get_active_monitoring_period():
        if Config.active_monitoring_period:
            return Config.active_monitoring_period
        active_monitoring_period = Config.config.get(section_name, 'active_monitoring_period_sec')
        Config.active_monitoring_period = int(active_monitoring_period)
        return Config.active_monitoring_period

    @staticmethod
    def get_clipping_shp_path():
        if Config.clipping_shp_path:
            return Config.clipping_shp_path
        clipping_shp_path = Config.config.get(section_name, 'clipping_shp_path')
        Config.clipping_shp_path = clipping_shp_path
        return Config.clipping_shp_path
