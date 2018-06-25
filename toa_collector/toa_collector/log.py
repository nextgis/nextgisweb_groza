import gzip
import logging
from time import strftime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def info(message):
    logger.info(strftime('%Y-%m-%d %H:%M:%S - {}'.format(message)))


def warning(message):
    logger.warning(strftime('%Y-%m-%d %H:%M:%S - {}'.format(message)))


def error(message):
    logger.error(strftime('%Y-%m-%d %H:%M:%S - {}'.format(message)))


def data(Config, file_name, data_to_log):
    data_logs_path = Config.get_data_config_path()
    if not data_logs_path:
        return False

    if data_logs_path[-1] == '/':
        data_logs_path = data_logs_path[0:-1]

    with gzip.open('{dir}/{file_name}.json.gz'.format(
            file_name=file_name,
            dir=data_logs_path
    ), 'wb') as f:
        f.write(data_to_log)

    return True
