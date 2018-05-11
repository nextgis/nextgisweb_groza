# -*- coding: utf-8 -*-
import transaction
from last_update import LAST_UPDATE_KEY
from nextgisweb.models import DBSession
from nextgisweb_groza.models import Meta, EventsSetSchema
from response import *
from pyramid.exceptions import HTTPBadRequest


def receive_events(request):
    json_body = request.json_body
    parsed_events_set = EventsSetSchema().loads(json_body)
    if len(parsed_events_set.errors.keys()) > 0:
        raise HTTPBadRequest()
    last_update_ts = int(parsed_events_set.data['stop'])

    events = []
    if 'data' in parsed_events_set.data:
        events = parsed_events_set.data['data']

    with transaction.manager:
        Meta.filter_by(key=LAST_UPDATE_KEY).update({
            'value': last_update_ts
        })
        for event in events:
            DBSession.add(event)
    return response_ok(dict(
        count=len(events),
        start=parsed_events_set.data['start'],
        stop=parsed_events_set.data['stop'],
        lastUpdateTs=last_update_ts
    ))
