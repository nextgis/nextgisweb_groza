# -*- coding: utf-8 -*-
import transaction
from last_update import LAST_UPDATE_KEY
from nextgisweb.models import DBSession
from nextgisweb_groza.models import Meta, EventsSetSchema
from response import *
from pyramid.exceptions import HTTPBadRequest


def receive_events(request):
    json_body = request.json_body
    parsed_events_set = EventsSetSchema().load(json_body)
    if parsed_events_set.errors.keys() > 0:
        raise HTTPBadRequest()
    last_update_ts = parsed_events_set.data['stop']
    events = parsed_events_set.data['events']
    with transaction.manager:
        Meta.filter_by(key=LAST_UPDATE_KEY).update({
            'value': last_update_ts
        })
        for event in events:
            DBSession.add(event)
    return response_ok(dict(
        count=len(events),
        lastUpdateTs=last_update_ts
    ))
