# -*- coding: utf-8 -*-
import transaction
from nextgisweb.models import DBSession
from nextgisweb_groza.models import Meta
from sqlalchemy.orm.exc import NoResultFound

LAST_UPDATE_KEY = 'LAST_UPDATE'


def get_last_update(request):
    try:
        last_update = Meta.filter_by(key=LAST_UPDATE_KEY).one()
    except NoResultFound:
        from datetime import datetime, timedelta
        import calendar
        prevent_date = datetime.utcnow() - timedelta(days=1)
        prevent_date_utc_ts = calendar.timegm(prevent_date.utctimetuple())
        with transaction.manager:
            last_update = Meta(
                key=LAST_UPDATE_KEY,
                value=prevent_date_utc_ts
            )
            DBSession.add(last_update)
        last_update = Meta.filter_by(key=LAST_UPDATE_KEY).one()
    return int(last_update.value)
