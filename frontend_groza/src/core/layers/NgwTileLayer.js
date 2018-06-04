import L from 'leaflet';
import proj4 from 'proj4';

const prj4326 = new proj4.Proj('EPSG:4326');
const prj3857 = new proj4.Proj('EPSG:3857');

const NgwTileLayer = L.TileLayer.extend({
  _ngwBaseImageUrl: null,
  _resourceId: null,

  initialize: function (url, styleIdId, options) {
    this._url = url;
    options = options || {};
    options.resourceId = styleIdId;
    L.TileLayer.prototype.initialize.call(this, url, options);
  }
});

L.TileLayer.NgwTileLayer = NgwTileLayer;

L.TileLayer.ngwTileLayer = function () {
  return new NgwTileLayer();
};

export default NgwTileLayer;
