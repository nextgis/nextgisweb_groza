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
GROZA_ZONE_1_CLASS = 'zone_1_class'
GROZA_ZONE_2_CLASS = 'zone_2_class'
GROZA_ZONE_3_CLASS = 'zone_3_class'


def groza_settings(request):
    request.require_administrator()
    return dict(
        title=_("Groza settings"),
        dynmenu=request.env.pyramid.control_panel)


def get_settings():
    settings = dict()
    
    process_setting_item(settings, ELLIPSE_ZOOM_VISIBLE, default_value=18)
    process_setting_item(settings, GROZA_WEB_MAP, default_value=None)
    process_setting_item(settings, GROZA_ZONE_1_CLASS, default_value=None)
    process_setting_item(settings, GROZA_ZONE_2_CLASS, default_value=None)
    process_setting_item(settings, GROZA_ZONE_3_CLASS, default_value=None)

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


def process_setting_item(settings, key_setting_item, key_module_settings=SETTINGS_MODULE_KEY, default_value=None):
    try:
        settings[key_setting_item] = env.core.settings_get(key_module_settings, key_setting_item)
    except KeyError:
        env.core.settings_set(key_module_settings, key_setting_item, None)
        settings[key_setting_item] = None


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
        elif k == GROZA_ZONE_1_CLASS:
            env.core.settings_set(SETTINGS_MODULE_KEY, GROZA_ZONE_1_CLASS, v)
        elif k == GROZA_ZONE_2_CLASS:
            env.core.settings_set(SETTINGS_MODULE_KEY, GROZA_ZONE_2_CLASS, v)
        elif k == GROZA_ZONE_3_CLASS:
            env.core.settings_set(SETTINGS_MODULE_KEY, GROZA_ZONE_3_CLASS, v)
        else:
            raise HTTPBadRequest("Invalid key '%s' value!" % k)

    return response_ok()


def add_to_menu(comp):
    comp.env.pyramid.control_panel.add(
        dm.Link('settings/groza', _("Groza"), lambda args: (
            args.request.route_url('pyramid.control_panel.groza')))
    )
