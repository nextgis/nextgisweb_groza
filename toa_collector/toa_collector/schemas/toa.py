import time
from marshmallow import Schema, fields, post_load


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

        event = dict(
            id=item['eventId'],
            ligh_t=ligh_t,
            lm_ts=int(time.mktime(item['lastModifiedDateTime'].timetuple())),
            ev_ts=int(time.mktime(item['eventDateTime'].timetuple())),
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
    events = fields.Nested(ToaEventSchema, many=True, required=True)
