# -*- coding: utf-8 -*-

from last_update import *
from settings import *


def setup_pyramid(comp, config):
    config.add_route(
        'pyramid.control_panel.groza',
        '/control-panel/groza'
    ).add_view(groza_settings, renderer='nextgisweb_groza:template/settings.mako')

    config.add_route(
        'nextgisweb_groza.last_update',
        '/groza/last-update'
    ).add_view(get_last_update, renderer='json')
