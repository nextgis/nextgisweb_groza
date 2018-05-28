import unittest
from toa_collector.processing.clip import Clip

class TestLoadClipPolygon(unittest.TestCase):
    def setUp(self):
        Clip.clip_polygons = []

    def test_it_is_not_crached_while_load_clip(self):
        path_to_shp = '../shp/clip.shp'
        Clip.set_clipping_polygons(path_to_shp)

    def test_read_correct_count_features(self):
        path_to_shp = '../shp/clip.shp'
        Clip.set_clipping_polygons(path_to_shp)
        self.assertEqual(len(Clip.clip_polygons), 14)
