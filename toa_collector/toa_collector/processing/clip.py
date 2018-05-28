import shapefile
from shapely.geometry import shape


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
