import json


def response_ok(data=None):
    result = dict(success=True)
    if data or isinstance(data, list):
        result['data'] = data
    return result


def response_fail(data=None):
    result = dict(success=False)
    if data or isinstance(data, list):
        result['data'] = data
    return result
