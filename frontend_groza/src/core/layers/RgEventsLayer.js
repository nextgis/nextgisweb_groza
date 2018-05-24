import L from 'leaflet'
import EventBus from '../../event-bus'
import EventsLayer from './EventsLayer'

const RgEventsLayer = L.LayerGroup.extend({
  initialize: function (eventsSocket, styles, options) {
    this._layers = {};
    this._eventsSocket = eventsSocket;
    this._styles = styles;
    this._listeners = [];
    L.setOptions(this, options);
    this._buildEventsLayer();
  },

  _buildEventsLayer: function () {
    this._eventsLayer = new EventsLayer(this._styles, this.getEventMarkerOptions);
    this.addLayer(this._eventsLayer);
  },

  getEventMarkerOptions: function (eventItem) {
    const expireStyle = this._styles.expired[eventItem.rule];
    const lightTypeStyle = this._styles.types[eventItem.ligh_t];
    const options = {
      className: `ligh_t_${eventItem.ligh_t}`
    };
    Object.assign(options, lightTypeStyle);
    Object.assign(options, expireStyle);
    return options;
  },

  onAdd: function (map) {
    this._bindEvents();
    L.LayerGroup.prototype.onAdd.call(this, map);
  },

  _bindEvents: function () {
    const that = this;
    this._eventsSocket.getEvents().then((eventsItems) => {
      that._eventsLayer.addEvents(eventsItems);
    });

    let listener;

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

L.RgEventsLayer = RgEventsLayer;

L.rgEventsLayer = function () {
  return new RgEventsLayer();
};

export default RgEventsLayer;
