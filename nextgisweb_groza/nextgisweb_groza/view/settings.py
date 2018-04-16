# -*- coding: utf-8 -*-
from nextgisweb.env import env
from nextgisweb_groza.util import _
from pyramid.httpexceptions import HTTPBadRequest


def groza_settings(request):
    request.require_administrator()
    return dict(
        title=_("Groza settings"),
        dynmenu=request.env.pyramid.control_panel)