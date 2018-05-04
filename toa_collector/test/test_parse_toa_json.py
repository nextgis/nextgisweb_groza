import unittest
from toa_collector.schemas import ToaEventsSetSchema


class TestParseToaJson(unittest.TestCase):
    def setUp(self):
        with open('toa_example.json', 'r') as toa_example_file:
            self.toa_json_string=toa_example_file.read().replace('\n', '')

    def test_should_parse_toa_set_events_json(self):
        result = ToaEventsSetSchema().loads(self.toa_json_string)
        self.assertEqual(len(result.errors.keys()), 0)

    def test_should_parse_toa_events_json(self):
        result = ToaEventsSetSchema().loads(self.toa_json_string)
        parsed_data = result.data
        self.assertEqual(parsed_data['count'], len(parsed_data['events']))

    def tearDown(self):
        pass
