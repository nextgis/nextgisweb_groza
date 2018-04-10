# -*- coding: utf-8 -*-

from settings import *


def setup_pyramid(comp, config):
    config.add_route(
        'pyramid.control_panel.groza',
        '/control-panel/groza'
    ).add_view(tracker_settings, renderer='nextgisweb_tracker:template/settings.mako')
