import json

import geoalchemy2 as ga
from sqlalchemy.ext.declarative import DeclarativeMeta
from sqlalchemy.dialects.postgresql import ENUM

from nextgisweb import db
from nextgisweb.models import declarative_base

Base = declarative_base()


class Events(Base):
    __tablename__ = 'groza_events'

    event_id = db.Column(db.Unicode, unique=True, primary_key=True)
    event_type = db.Column(ENUM('Lighting', 'Other', name='groza_event_types'), nullable=False)
    lighting_type = db.Column(db.Integer)  # 0 - cloud, 1 - positive ground, 2 - negative ground
    amplitude = db.Column(db.Integer)
    last_modified_ts = db.Column(db.TIMESTAMP, nullable=False)
    event_ts = db.Column(db.TIMESTAMP, nullable=False)
    location = db.Column(ga.Geometry('Point', srid=4326, dimension=3))
    ellipse_major_ax = db.Column(db.DECIMAL)
    ellipse_minor_ax = db.Column(db.DECIMAL)
    ellipse_azimuth = db.Column(db.DECIMAL)
