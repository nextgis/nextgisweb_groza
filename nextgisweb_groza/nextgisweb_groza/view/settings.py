# -*- coding: utf-8 -*-
from nextgisweb import dynmenu as dm
from nextgisweb.env import env
from nextgisweb_groza.util import _
from response import *
from pyramid.httpexceptions import HTTPBadRequest

SETTINGS_MODULE_KEY = 'groza'
ELLIPSE_ZOOM_VISIBLE = 'ellipse_z_visible'
GROZA_WEB_MAP = 'web_map'


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
