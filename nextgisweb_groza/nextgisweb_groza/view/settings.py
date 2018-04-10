# -*- coding: utf-8 -*-
from nextgisweb.env import env
from nextgisweb_groza.util import _
from pyramid.httpexceptions import HTTPBadRequest


def tracker_settings(request):
    request.require_administrator()
    return dict(
        title=_("Trackers settings"),
        dynmenu=request.env.pyramid.control_panel)