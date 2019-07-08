# -*- coding: utf-8 -*-
import dateutil.parser
import datetime
import transaction
from sqlalchemy import exists
from last_update import LAST_UPDATE_KEY
from nextgisweb.models import DBSession
from nextgisweb_groza.models import Meta, EventsSetSchema, EventSchema, Event
from pyramid.exceptions import HTTPBadRequest
from response import *


def receive_events(request):
    json_body = request.json_body
    parsed_events_set = EventsSetSchema().loads(json_body)
    if len(parsed_events_set.errors.keys()) > 0:
        raise HTTPBadRequest()
    last_update_ts = int(parsed_events_set.data['stop'])

    events = []
    if 'data' in parsed_events_set.data:
        events = parsed_events_set.data['data']

    events_to_insert = []
    for event in events:
        existed = DBSession.query(exists().where(Event.event_id==event.event_id)).scalar()
        exists_in_inserted_list = any(ev.event_id == event.event_id for ev in events_to_insert)
        if not existed and not exists_in_inserted_list:
            events_to_insert.append(event)

    with transaction.manager:
        Meta.filter_by(key=LAST_UPDATE_KEY).update({
            'value': last_update_ts
        })
        for event in events_to_insert:
            DBSession.add(event)
    return response_ok(dict(
        count=len(events),
        start=parsed_events_set.data['start'],
        stop=parsed_events_set.data['stop'],
        lastUpdateTs=last_update_ts
    ))


def get_events(request):
    params = request.params
    start = params['start']
    end = params['end']

    start = dateutil.parser.parse(start).replace(tzinfo=None)
    end = dateutil.parser.parse(end).replace(tzinfo=None)

    with transaction.manager:
        events = Event \
            .filter(Event.event_ts <= end) \
            .filter(Event.event_ts >= start) \
            .all()

        schema = EventSchema(many=True)
        data, errors = schema.dump(events)

    return response_ok(data)


def get_rg_events(request):
    params = request.params
    start = int(params['start'])
    end = int(params['end'])

    start_dt = datetime.datetime.utcfromtimestamp(start)
    end_dt = datetime.datetime.utcfromtimestamp(end)

    with transaction.manager:
        events = Event \
            .filter(Event.event_ts <= end_dt) \
            .filter(Event.event_ts >= start_dt) \
            .all()

        schema = EventSchema(many=True)
        data, errors = schema.dump(events)

    return data
