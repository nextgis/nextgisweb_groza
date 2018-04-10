# -*- coding: utf-8 -*-
from nextgisweb.webmap.plugin import WebmapPlugin


@WebmapPlugin.registry.register
class GrozaPlugin(WebmapPlugin):

    @classmethod
    def is_supported(cls, webmap):
        return (
            'ngw-tracker/webmap/plugin/GrozaWebMap',
            dict()
        )
