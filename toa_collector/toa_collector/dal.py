import sqlite3


class DAL():
    config = None

    @staticmethod
    def init(config):
        DAL.config = config


    @staticmethod
    def get_last_update_time():
        conn = sqlite3.connect(DAL.config.getMetaDbName())
        c = conn.cursor()
        conn.close()