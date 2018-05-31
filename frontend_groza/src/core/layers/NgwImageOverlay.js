import L from 'leaflet';
import proj4 from 'proj4';

const prj4326 = new proj4.Proj('EPSG:4326');
const prj3857 = new proj4.Proj('EPSG:3857');

const NgwImageOverlay = L.ImageOverlay.extend({
  _ngwBaseImageUrl: null,
  _resourceId: null,

  initialize: function (url, resourceId, options) {
    this._ngwBaseImageUrl = url;
    this._resourceId = resourceId;
    L.setOptions(this, options);
    this.options.interactive = false;
  },

  onAdd: function () {
    this._imageLoad();
    L.ImageOverlay.prototype.onAdd.call(this);
    this._map.on('zoomend', () => this._imageLoad());
  },

  _getImageNgwUrl: function (bounds) {
    if (!this._map) return null;
    const size = this._map.getSize();
    const [xMin, yMin, xMax, yMax] = this._getBounds3857(bounds);
    console.log(xMin, yMin, xMax, yMax);
    return `${this._ngwBaseImageUrl}?resource=${this._resourceId}&extent=${xMin},${yMin},${xMax},${yMax}8&size=${size.x},${size.y}`;
  },

  _getBounds3857: function (bounds) {
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    const sw3857 = proj4(prj4326, prj3857, [sw.lng, sw.lat]);
    const ne3857 = proj4(prj4326, prj3857, [ne.lng, ne.lat]);
    console.log([...sw3857, ...ne3857]);
    return [...sw3857, ...ne3857];
  },


  _imageLoad: function () {
    const bounds = this._map.getBounds();
    const imageUrl = this._getImageNgwUrl(bounds);
    console.log(imageUrl);
    L.ImageOverlay.prototype.setUrl.call(this, imageUrl);
    if (this._bounds) {
      L.ImageOverlay.prototype.setBounds.call(this, bounds);
    } else {
      this._bounds = bounds;
    }

  }
});

L.ImageOverlay.ImageNgwOverlay = NgwImageOverlay;

L.ImageOverlay.imageNgwOverlay = function () {
  return new NgwImageOverlay();
};

export default NgwImageOverlay;
