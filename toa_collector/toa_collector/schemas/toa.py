from datetime import date
from marshmallow import Schema, fields, pprint


class ToaErrorEllipse(Schema):
    semiMajorAxis = fields.Float()
    semiMinorAxis = fields.Float()
    azimuth = fields.Float()


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


class ToaEventsSetSchema(Schema):
    success = fields.Bool()
    msg = fields.String()
    count = fields.Int(required=False)
    events = fields.Nested(ToaEventSchema, many=True, required=True)
