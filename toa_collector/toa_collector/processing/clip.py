import shapefile
from shapely.geometry import Point, shape
from ..log import info


class Clip():
    config = None
    clip_polygons = []

    @staticmethod
    def init(config):
        Clip.config = config
        Clip.set_clipping_polygons(config.get_clipping_shp_path())

    @staticmethod
    def set_clipping_polygons(path):
        clip_reader = shapefile.Reader(path)
        for shape_instance in clip_reader.shapes():
            shp_geom = shape(shape_instance)
            Clip.clip_polygons.append(shp_geom)

    @staticmethod
    def clip(get_events_result):
        events = get_events_result.get_events()
        events_filtered_by_clip = filter(lambda event: Clip.check_event_into_clip(event), events)
        get_events_result.set_events(events_filtered_by_clip)
        info('[CLIP] Clipping finished: gets - {0}, selected - {1}'.format(len(events), len(events_filtered_by_clip)))

    @staticmethod
    def check_event_into_clip(event):
        point = Point(event['lon'], event['lat'])
        is_points_contains_in_clip = False
        for polygon in Clip.clip_polygons:
            if polygon.contains(point):
                is_points_contains_in_clip = True
                break
        return is_points_contains_in_clip
