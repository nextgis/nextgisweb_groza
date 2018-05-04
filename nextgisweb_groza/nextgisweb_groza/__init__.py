# -*- coding: utf-8 -*-
import view
from nextgisweb.component import Component, require
from nextgisweb.models import DBSession

from .models import Base
from .util import COMP_ID


class GrozaComponent(Component):
    identity = COMP_ID
    metadata = Base.metadata

    def initialize(self):
        super(GrozaComponent, self).initialize()
        from . import plugin

    @require('auth')
    def initialize_db(self):
        result = DBSession.execute('''
            -- change column type from POINT to POINTZ
            ALTER TABLE groza_events
              ALTER COLUMN location TYPE geometry(PointZ)
                USING ST_Force_3D(location);

            -- set SRID for geometry column
            SELECT UpdateGeometrySRID('groza_events','location', 4326);
        ''')

    @require('resource', 'webmap')
    def setup_pyramid(self, config):
        super(GrozaComponent, self).setup_pyramid(config)
        view.setup_pyramid(self, config)

    def client_settings(self, request):
        return dict()

    settings_info = ()


def pkginfo():
    return dict(components=dict(
        groza='nextgisweb_groza')
    )


def amd_packages():
    return (
        ('ngw-groza', 'nextgisweb_groza:amd/ngw-groza'),
    )
