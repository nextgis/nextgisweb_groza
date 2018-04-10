import json

import geoalchemy2 as ga
from sqlalchemy import event
from sqlalchemy.ext.declarative import DeclarativeMeta
from sqlalchemy.orm import object_session

from nextgisweb import db
from nextgisweb.models import declarative_base
from nextgisweb.resource import (
    Resource,
    DataScope,
    ResourceGroup,
    Serializer,
    SerializedProperty)
from util import _

Base = declarative_base()
