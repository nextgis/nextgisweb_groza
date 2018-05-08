import json


def response_ok(data):
    result = dict(success=True)
    if data:
        result['data'] = json.dumps(data)
    return result


def response_fail(data):
    result = dict(success=False)
    if data:
        result['data'] = json.dumps(data)
    return result
