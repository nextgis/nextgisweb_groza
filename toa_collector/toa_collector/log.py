from time import strftime
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def info(message):
    logger.info(strftime('%Y-%m-%d %H:%M:%S - {}'.format(message)))


def warning(message):
    logger.warning(strftime('%Y-%m-%d %H:%M:%S - {}'.format(message)))


def error(message):
    logger.error(strftime('%Y-%m-%d %H:%M:%S - {}'.format(message)))
