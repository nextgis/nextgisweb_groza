import calendar
import datetime

import geoalchemy2 as ga
from marshmallow import Schema, fields, post_load, pre_dump
from model import Event
from shapely import wkb


class EventSchema(Schema):
    id = fields.Str()
    ligh_t = fields.Int()
    ev_t = fields.Int()
    ampl = fields.Int()
    lm_ts = fields.Int()
    ev_ts = fields.Int()
    lat = fields.Float()
    lon = fields.Float()
    alt = fields.Float()
    ell_maj = fields.Float()
    ell_min = fields.Float()
    ell_az = fields.Float()

    @post_load
    def post_load(self, item):
        location = ga.elements.WKTElement('POINTZ({0} {1} {2})'.format(
            item['lon'], item['lat'], item['alt']
        ), srid=4326)

        last_modified_ts = datetime.datetime.utcfromtimestamp(item['lm_ts'])
        event_ts = datetime.datetime.utcfromtimestamp(item['ev_ts'])

        return Event(
            event_id=item['id'],
            event_type=item['ev_t'],
            lighting_type=item['ligh_t'],
            amplitude=item['ampl'],
            last_modified_ts=last_modified_ts,
            event_ts=event_ts,
            location=location,
            ellipse_major_ax=item['ell_maj'],
            ellipse_minor_ax=item['ell_min'],
            ellipse_azimuth=item['ell_az']
        )

    @pre_dump
    def pre_dump(self, event_item):
        location = wkb.loads(bytes(event_item.location.data))
        return dict(
            id=event_item.event_id,
            ligh_t=event_item.lighting_type,
            ev_t=event_item.event_type,
            ampl=event_item.amplitude,
            lm_ts=calendar.timegm(event_item.last_modified_ts.utctimetuple()),
            ev_ts=calendar.timegm(event_item.event_ts.utctimetuple()),
            lat=location.y,
            lon=location.x,
            alt=location.z,
            ell_maj=event_item.ellipse_major_ax,
            ell_min=event_item.ellipse_minor_ax,
            ell_az=event_item.ellipse_azimuth
        )


class EventsSetSchema(Schema):
    start = fields.Int()
    stop = fields.Int()
    data = fields.Nested(EventSchema, many=True, required=True)
