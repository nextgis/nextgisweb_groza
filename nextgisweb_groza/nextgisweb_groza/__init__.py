# -*- coding: utf-8 -*-
import view
from nextgisweb.component import Component, require
from .model import Base
from .util import COMP_ID


class GrozaComponent(Component):
    identity = COMP_ID
    metadata = Base.metadata

    def initialize(self):
        super(GrozaComponent, self).initialize()
        from . import plugin

    @require('resource', 'webmap')
    def setup_pyramid(self, config):
        super(GrozaComponent, self).setup_pyramid(config)
        view.setup_pyramid(self, config)

    def client_settings(self, request):
        return dict()

    settings_info = ()


def pkginfo():
    return dict(components=dict(
        tracker='nextgisweb_groza')
    )


def amd_packages():
    return (
        ('ngw-groza', 'nextgisweb_groza:amd/ngw-groza'),
    )

