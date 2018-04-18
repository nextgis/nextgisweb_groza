import json


class GetEventsResult:
    def __init__(self, start, stop, json_data):
        self.start = start
        self.stop = stop
        self.data = json_data

    def to_json(self):
        return json.dumps({
            'start': self.start,
            'stop': self.stop,
            'data': self.data
        })
