import unittest
from toa_collector.schemas import ToaEventsSetSchema
from zipfile import ZipFile
import fnmatch


class TestParseToaJson(unittest.TestCase):
    def setUp(self):
        toa_example_file_zip = ZipFile('toa_example.json.zip', 'r')
        for name in toa_example_file_zip.namelist():
            if fnmatch.fnmatch(name, 'toa_example.json'):
                ex_file = toa_example_file_zip.open(name)
                self.toa_json_string = ex_file.read()

        toa_example_file_zip = ZipFile('toa_example_2.json.zip', 'r')
        for name in toa_example_file_zip.namelist():
            if fnmatch.fnmatch(name, 'toa_example_2.json'):
                ex_file = toa_example_file_zip.open(name)
                self.toa_json_string_2 = ex_file.read()

    def test_should_parse_toa_set_events_json(self):
        result = ToaEventsSetSchema().loads(self.toa_json_string)
        self.assertEqual(len(result.errors.keys()), 0)

    def test_should_parse_toa_events_json(self):
        result = ToaEventsSetSchema().loads(self.toa_json_string)
        parsed_data = result.data
        self.assertEqual(parsed_data['count'], len(parsed_data['events']))

    def test_should_parse_datetime(self):
        result = ToaEventsSetSchema().loads(self.toa_json_string_2)
        parsed_data = result.data
        event_item = parsed_data['events'][0]
        self.assertEqual(event_item['lm_ts'], 1526441472)

    def tearDown(self):
        pass
