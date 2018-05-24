import L from 'leaflet';
import EventBus from '../../event-bus';
import store from '../../store/index';
import {NGW_GET_EVENTS} from '../../store/actions/ngw';

import EventsLayer from './EventsLayer';
import EllipsesLayer from './EllipsesLayer';

const NgwEventsLayer = L.LayerGroup.extend({
  initialize: function (grozaSettings, options) {
    this._layers = {};
    this._grozaSettings = grozaSettings;
    this._listeners = [];
    L.setOptions(this, options);
    this._buildEventsLayer();
    this._buildEllipsesLayer();
    this._ellipsesLayer.bringToFront();
    this._eventsLayer.bringToFront();
  },

  _buildEventsLayer: function () {
    this._eventsLayer = new EventsLayer(this._grozaSettings.eventsStyles, this.getEventMarkerOptions);
    this.addLayer(this._eventsLayer);
  },

  _buildEllipsesLayer: function () {
    this._ellipsesLayer = new EllipsesLayer(this._grozaSettings);
    this.addLayer(this._ellipsesLayer);
  },

  getEventMarkerOptions: function (eventItem, styles) {
    const lightTypeStyle = styles.types[eventItem.ligh_t];
    const options = {
      className: `ligh_t_${eventItem.ligh_t}`
    };
    Object.assign(options, lightTypeStyle);
    return options;
  },

  onAdd: function (map) {
    this._bindEvents();
    L.LayerGroup.prototype.onAdd.call(this, map);
  },

  clearLayer: function (layer) {
    layer.clearLayers();
    return this;
  },

  clearLayers: function () {
    return this.eachLayer(this.clearLayer, this);
  },

  _bindEvents: function () {
    const that = this;
    let listener;

    listener = EventBus.$on('UPDATE_HISTORY_EVENTS', function (startEndInfo) {
      store.dispatch(NGW_GET_EVENTS, startEndInfo).then((httpAnswer) => {
        const result = httpAnswer.data;
        if (result.success) {
          that.clearLayers();
          that._eventsLayer.addEvents(result.data);
          that._ellipsesLayer.addEvents(result.data);
        } else {
          // todo: handle unsuccessful result
        }
      })
    });
    this._listeners.push(listener);

    listener = EventBus.$on('HIDE_CLOUD_EVENTS', () => {
      this._eventsLayer.hideCloudEvents();
    });
    this._listeners.push(listener);

    listener = EventBus.$on('SHOW_CLOUD_EVENTS', () => {
      this._eventsLayer.showCloudEvents();
    });
    this._listeners.push(listener);
  },

  destroy: function () {
    this._unbindEvents();
  },

  _unbindEvents: function () {
    this._listeners.forEach((listener) => {
      listener.$off();
    });
    this._eventsLayer.destroy();
    this._ellipsesLayer.destroy();
  }
});

L.NgwEventsLayer = NgwEventsLayer;

L.ngwEventsLayer = function () {
  return new NgwEventsLayer();
};

export default NgwEventsLayer;
