# -*- coding: utf-8 -*-
from nextgisweb.webmap.adapter import WebMapAdapter
from nextgisweb.webmap.model import WebMap
from response import *


def get_webmap_layers(webmap_item, layers):
    if webmap_item.item_type == 'layer' and webmap_item.layer_enabled:
        style = webmap_item.style
        data = dict(
            id=webmap_item.id,
            type=webmap_item.item_type,
            label=webmap_item.display_name,
            layerId=style.parent_id,
            styleId=style.id,
            visibility=bool(webmap_item.layer_enabled),
            transparency=webmap_item.layer_transparency,
            minScaleDenom=webmap_item.layer_min_scale_denom,
            maxScaleDenom=webmap_item.layer_max_scale_denom,
            drawOrderPosition=webmap_item.draw_order_position,
            adapter=WebMapAdapter.registry.get(webmap_item.layer_adapter, 'image').mid
        )
        layers.append(data)
        # display.mid.adapter.add(data['adapter'])
    elif webmap_item.item_type in ('root', 'group'):
        if webmap_item.children:
            for child_item in webmap_item.children:
                get_webmap_layers(child_item, layers)


def get_webmap_info(webmap, request):
    request.resource_permission(WebMap.scope.webmap.display)

    layers = []
    get_webmap_layers(webmap.root_item, layers)

    basemap = webmap.basemaps[0]
    basemap = dict(url=basemap.resource.url,
                   qms=basemap.resource.qms,
                   **basemap.to_dict())

    return response_ok(dict(
        extent=[
            [webmap.extent_bottom, webmap.extent_left],
            [webmap.extent_top, webmap.extent_right]
        ],
        layers=layers,
        basemap=basemap
    ))
