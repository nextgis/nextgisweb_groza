import json


class GetEventsResult:
    def __init__(self, start, stop, json_data):
        self.start = start
        self.stop = stop
        self.data = json_data

    def to_json(self):
        return json.dumps(self.to_dict())

    def to_dict(self):
        return {
            'start': self.start,
            'stop': self.stop,
            'data': self.data
        }
