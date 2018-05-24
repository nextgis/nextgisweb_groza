import L from 'leaflet';
import * as Ellipse from 'leaflet-ellipse';

const EllipsesLayer = L.FeatureGroup.extend({
  initialize: function (settings, options) {
    this._layers = {};
    this._isVisibleEllipses = true;
    this._style = settings.ellipseStyle;
    this._ellipseVisibleZoom = settings.ellipse_z_visible;
    L.setOptions(this, options);
  },

  addEvent: function (eventItem) {
    const options = {
      className: 'ev_el'
    };
    Object.assign(options, this._style);

    const ellipse = new L.Ellipse([eventItem.lat, eventItem.lon], [
      eventItem.ell_maj,
      eventItem.ell_min
    ], eventItem.ell_az, options);

    ellipse._grozaId = eventItem.id;
    this.addLayer(ellipse);
  },

  onAdd: function (map) {
    this._bindEvents(map);
    L.FeatureGroup.prototype.onAdd.call(this, map);
    this._updateVisibleEllipses();
  },

  _bindEvents: function (map) {
    map.on('zoomend', () => {
      this._updateVisibleEllipses();
    });
  },

  _updateVisibleEllipses: function () {
    const shouldDisplay = this._map.getZoom() >= this._ellipseVisibleZoom;

    if ((this._isVisibleEllipses && shouldDisplay) || (!this._isVisibleEllipses && !shouldDisplay)) {
      return false;
    } else if (this._isVisibleEllipses && !shouldDisplay) {
      this.hideEllipses();
      return true;
    } else if (!this._isVisibleEllipses && shouldDisplay) {
      this.showEllipses();
      return true;
    }
  },

  hideEllipses() {
    const sheet = document.createElement('style');
    sheet.innerHTML = 'path.ev_el { display: none; }';
    this._sheetElement = document.body.appendChild(sheet);
    this._isVisibleEllipses = false;
  },

  showEllipses() {
    this._removeSheetElement();
    this._isVisibleEllipses = true;
  },

  addEvents: function (eventItems) {
    for (let eventItem of eventItems) {
      this.addEvent(eventItem);
    }
  },

  destroy: function () {
    this._removeSheetElement();
  },

  _removeSheetElement: function () {
    if (this._sheetElement) {
      document.body.removeChild(this._sheetElement);
    }
    this._sheetElement = null;
  }
});

L.EllipsesLayer = EllipsesLayer;

L.ellipsesLayer = function () {
  return new EllipsesLayer();
};

export default EllipsesLayer;
