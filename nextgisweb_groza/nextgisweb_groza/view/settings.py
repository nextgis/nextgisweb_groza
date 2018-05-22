# -*- coding: utf-8 -*-
import json
from nextgisweb import dynmenu as dm
from nextgisweb.env import env
from nextgisweb_groza.util import _
from response import *
from pyramid.httpexceptions import HTTPBadRequest
from nextgisweb_groza.default_settings import default_events_styles, default_types_styles

SETTINGS_MODULE_KEY = 'groza'
ELLIPSE_ZOOM_VISIBLE = 'ellipse_z_visible'
GROZA_WEB_MAP = 'web_map'
EVENTS_STYLES = 'eventsStyles'
TYPES_STYLES = 'types'
EXPIRE_STYLES = 'expired'


def groza_settings(request):
    request.require_administrator()
    return dict(
        title=_("Groza settings"),
        dynmenu=request.env.pyramid.control_panel)


def get_settings():
    settings = dict()
    try:
        settings[ELLIPSE_ZOOM_VISIBLE] = env.core.settings_get(SETTINGS_MODULE_KEY, ELLIPSE_ZOOM_VISIBLE)
    except KeyError:
        env.core.settings_set(SETTINGS_MODULE_KEY, ELLIPSE_ZOOM_VISIBLE, 18)
        settings[ELLIPSE_ZOOM_VISIBLE] = 18

    try:
        settings[GROZA_WEB_MAP] = env.core.settings_get(SETTINGS_MODULE_KEY, GROZA_WEB_MAP)
    except KeyError:
        env.core.settings_set(SETTINGS_MODULE_KEY, GROZA_WEB_MAP, None)
        settings[GROZA_WEB_MAP] = None

    settings[EVENTS_STYLES] = dict()

    try:
        events_styles_str = env.core.settings_get(SETTINGS_MODULE_KEY, EVENTS_STYLES)
        settings[EVENTS_STYLES][EXPIRE_STYLES] = json.loads(events_styles_str)
    except KeyError:
        events_styles_str = json.dumps(default_events_styles)
        env.core.settings_set(SETTINGS_MODULE_KEY, EVENTS_STYLES, events_styles_str)
        settings[EVENTS_STYLES][EXPIRE_STYLES] = default_events_styles

    settings[EVENTS_STYLES][TYPES_STYLES] = default_types_styles

    return settings


def groza_settings_get(request):
    result = get_settings()
    return response_ok(result)


def groza_settings_put(request):
    request.require_administrator()

    body = request.json_body
    for k, v in body.iteritems():
        if k == ELLIPSE_ZOOM_VISIBLE:
            env.core.settings_set(SETTINGS_MODULE_KEY, ELLIPSE_ZOOM_VISIBLE, v)
        elif k == GROZA_WEB_MAP:
            env.core.settings_set(SETTINGS_MODULE_KEY, GROZA_WEB_MAP, v)
        else:
            raise HTTPBadRequest("Invalid key '%s' value!" % k)

    return response_ok()


def add_to_menu(comp):
    comp.env.pyramid.control_panel.add(
        dm.Link('settings/groza', _("Groza"), lambda args: (
            args.request.route_url('pyramid.control_panel.groza')))
    )
