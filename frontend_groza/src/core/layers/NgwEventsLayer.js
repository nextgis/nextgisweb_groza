import L from 'leaflet';
import EventBus from '../../event-bus';
import EventsLayer from './EventsLayer';
import store from '../../store/index';
import {NGW_GET_EVENTS} from '../../store/actions/ngw';

const NgwEventsLayer = L.LayerGroup.extend({
  initialize: function (styles, options) {
    this._layers = {};
    this._styles = styles;
    this._listeners = [];
    L.setOptions(this, options);
    this._buildEventsLayer();
  },

  _buildEventsLayer: function () {
    this._eventsLayer = new EventsLayer(this._styles, this.getEventMarkerOptions);
    this.addLayer(this._eventsLayer);
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
  }
});

L.NgwEventsLayer = NgwEventsLayer;

L.ngwEventsLayer = function () {
  return new NgwEventsLayer();
};

export default NgwEventsLayer;
