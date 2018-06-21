# -*- coding: utf-8 -*-

from nextgisweb.resource import resource_factory
from nextgisweb.webmap.model import WebMap

from auth import *
from last_update import *
from settings import *
from events import *
from webmap import *
from frontend import *


def setup_pyramid(comp, config):
    config.add_route(
        'pyramid.control_panel.groza',
        '/control-panel/groza'
    ).add_view(groza_settings, renderer='nextgisweb_groza:template/settings.mako')

    config.add_route('groza.settings', '/api/component/groza/settings') \
        .add_view(groza_settings_get, request_method='GET', renderer='json') \
        .add_view(groza_settings_put, request_method='PUT', renderer='json')

    config.add_route(
        'nextgisweb_groza.frontend',
        '/groza/'
    ).add_view(frontend, renderer='nextgisweb_groza:template/frontend.mako')

    config.add_route(
        'nextgisweb_groza.last_update',
        '/api/groza/last-update'
    ).add_view(get_last_update, renderer='json')

    config.add_route(
        'nextgisweb_groza.api.login',
        '/api/groza/login'
    ).add_view(login, request_method='POST', renderer='json')

    config.add_route('nextgisweb_groza.api.events', '/api/groza/events/') \
        .add_view(get_events, request_method='GET', renderer='json') \
        .add_view(receive_events, request_method='POST', renderer='json')

    config.add_route('nextgisweb_groza.api.rg.events', '/api/groza/rg/events') \
        .add_view(get_rg_events, request_method='GET', renderer='json')

    config.add_route(
        'nextgisweb_groza.api.webmap',
        '/api/groza/webmap/{id:\d+}/',
        factory=resource_factory,
        client=('id',)
    ).add_view(get_webmap_info, context=WebMap, request_method='GET', renderer='json')

    add_to_menu(comp)
