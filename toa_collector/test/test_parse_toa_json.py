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

    def test_should_parse_toa_set_events_json(self):
        result = ToaEventsSetSchema().loads(self.toa_json_string)
        self.assertEqual(len(result.errors.keys()), 0)

    def test_should_parse_toa_events_json(self):
        result = ToaEventsSetSchema().loads(self.toa_json_string)
        parsed_data = result.data
        self.assertEqual(parsed_data['count'], len(parsed_data['events']))

    def tearDown(self):
        pass
