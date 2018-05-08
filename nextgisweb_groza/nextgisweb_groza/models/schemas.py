from marshmallow import Schema, fields, post_load
import geoalchemy2 as ga
from model import Event


class EventSchema(Schema):
    id = fields.Str()
    ligh_t = fields.Int()
    ev_t = fields.Int()
    ampl = fields.Int
    lm_ts = fields.Number()
    ev_ts = fields.Number()
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
        return Event(
            event_id=item['id'],
            event_type=item['ev_t'],
            lighting_type=item['ligh_t'],
            amplitude=item['ampl'],
            last_modified_ts=item['lm_ts'],
            event_ts=item['ev_ts'],
            location=location,
            ellipse_major_ax=item['ell_maj'],
            ellipse_minor_ax=item['ell_min'],
            ellipse_azimuth=item['ell_az']
        )


class EventsSetSchema(Schema):
    start = fields.Number()
    stop = fields.Number()
    data = fields.Nested(EventSchema, many=True, required=True)
