# -*- coding: utf-8 -*-
from nextgisweb.auth.models import User
from pyramid.httpexceptions import HTTPOk, HTTPNotFound
from pyramid.security import remember
from pyramid.response import Response
from sqlalchemy.orm.exc import NoResultFound


def login(request):
    result = {
        'login': False
    }
    try:
        user = User.filter_by(keyname=request.POST['login'].strip()).one()

        if user.password == request.POST['password']:
            headers = remember(request, user.id)
            if user.disabled:
                return result
            result['login'] = True
            return Response(headers=headers, json=result)
        else:
            return result
    except NoResultFound:
        return result
