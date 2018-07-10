import L from 'leaflet';
import EventBus from '../../event-bus';
import * as Ellipse from 'leaflet-ellipse';

const EllipsesLayer = L.FeatureGroup.extend({
  initialize: function (settings, options) {
    this._layers = {};
    this._listeners = [];
    this._isVisibleEllipses = true;
    this._style = settings.ellipseStyle;
    this._ellipseVisibleZoom = settings.ellipse_z_visible;
    this._sheetEllipsesElement = null;
    this._sheetCloudEllipsesElement = null;
    L.setOptions(this, options);
  },

  addEvent: function (eventItem) {
    const options = {
      className: `ev_el el_ligh_t_${eventItem.ligh_t}`
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
    let listener;

    map.on('zoomend', () => {
      this._updateVisibleEllipses();
    });

    listener = EventBus.$on('HIDE_CLOUD_EVENTS', () => {
      this.hideCloudEllipses();
    });
    this._listeners.push(listener);

    listener = EventBus.$on('SHOW_CLOUD_EVENTS', () => {
      this.showCloudEllipses();
    });
    this._listeners.push(listener);
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
    this._sheetEllipsesElement = document.body.appendChild(sheet);
    this._isVisibleEllipses = false;
  },

  showEllipses() {
    this._removeSheetElement('_sheetEllipsesElement');
    this._isVisibleEllipses = true;
  },

  hideCloudEllipses() {
    const sheet = document.createElement('style');
    sheet.innerHTML = 'path.el_ligh_t_0 { display: none; }';
    this._sheetCloudEllipsesElement = document.body.appendChild(sheet);
  },

  showCloudEllipses() {
    this._removeSheetElement('_sheetCloudEllipsesElement');
  },

  addEvents: function (eventItems) {
    for (let eventItem of eventItems) {
      this.addEvent(eventItem);
    }
  },

  destroy: function () {
    this._unbindEvents();
    this._removeSheetElement('_sheetEllipsesElement');
    this._removeSheetElement('_sheetCloudEllipsesElement');
  },

  _removeSheetElement: function (sheetElementKey) {
    let sheetElement = this[sheetElementKey];
    if (sheetElement && sheetElement.parentElement) {
      document.body.removeChild(sheetElement);
    }
    sheetElement = null;
  },

  _unbindEvents: function () {
    this._listeners.forEach((listener) => {
      listener.$off();
    });
  }
});

L.EllipsesLayer = EllipsesLayer;

L.ellipsesLayer = function () {
  return new EllipsesLayer();
};

export default EllipsesLayer;
