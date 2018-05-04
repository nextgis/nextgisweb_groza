from marshmallow import Schema, fields


class EventSchema(Schema):
    id = fields.Str()
    ligh_t = fields.Int()
    ampl = fields.Int
    lm_ts = fields.Number()
    ev_ts = fields.Number()
    lat = fields.Float()
    lon = fields.Float()
    alt = fields.Float()
    ell_maj = fields.Float()
    ell_min = fields.Float()
    ell_az = fields.Float()
