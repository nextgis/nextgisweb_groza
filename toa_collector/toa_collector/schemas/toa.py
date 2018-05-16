import time
from marshmallow import Schema, fields, post_load
from ..utils import datetime_to_utc_ts


class ToaErrorEllipse(Schema):
    semiMajorAxis = fields.Float()
    semiMinorAxis = fields.Float()
    azimuth = fields.Float()

    @post_load
    def post_load(self, item):
        return dict(
            ell_maj=item['semiMajorAxis'],
            ell_min=item['semiMinorAxis'],
            ell_az=item['azimuth']
        )


class ToaLocationSchema(Schema):
    lat = fields.Float()
    lon = fields.Float()
    alt = fields.Float()


class ToaEventSchema(Schema):
    eventId = fields.Str()
    eventType = fields.Str()
    lastModifiedDateTime = fields.DateTime()
    eventDateTime = fields.DateTime()
    eventNanoSec = fields.Number()
    algorithmId = fields.String()
    amplitude = fields.Number()
    location = fields.Nested(ToaLocationSchema)
    locationErrorEllipse = fields.Nested(ToaErrorEllipse)

    @post_load
    def post_load(self, item):
        amplitude = item['amplitude']

        if amplitude == 0:
            ligh_t = 0
        elif amplitude > 0:
            ligh_t = 1
        elif amplitude < 0:
            ligh_t = 2
        else:
            ligh_t = None

        if item['eventType'] == 'Lightning':
            ev_t = 0
        elif item['eventType'] == 'Other':
            ev_t = 1
        else:
            raise ValueError('"%" event type is not defined'.format(item['eventType']))

        event = dict(
            id=item['eventId'],
            ligh_t=ligh_t,
            ev_t=ev_t,
            lm_ts=datetime_to_utc_ts(item['lastModifiedDateTime']),
            ev_ts=datetime_to_utc_ts(item['eventDateTime']),
            ampl=item['amplitude']
        )

        result = event.copy()
        result.update(item['location'])
        result.update(item['locationErrorEllipse'])

        return result


class ToaEventsSetSchema(Schema):
    success = fields.Bool()
    msg = fields.String()
    count = fields.Int(required=False)
    events = fields.Nested(ToaEventSchema, many=True, required=False)
