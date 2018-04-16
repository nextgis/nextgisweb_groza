import sys
from apscheduler.schedulers.blocking import BlockingScheduler
from config import Config
from ngw_facade import NgwFacade


def collect():
    print 'collect...'


def get_last_update():
    last_update_ts = NgwFacade.get_last_update_ts()


def run():
    get_last_update()
    scheduler = BlockingScheduler()
    scheduler.add_job(collect, 'interval', id='collect', seconds=Config.get_query_interval())
    scheduler.start()


def main():
    Config.init()
    NgwFacade.init(Config)
    run()


if __name__ == '__main__':
    main()
