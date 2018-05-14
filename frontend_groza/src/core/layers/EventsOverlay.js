import {setOptions} from 'leaflet';

const EventsOverlay = L.LayerGroup.extend({
  initialize: function (eventsSocket, styles, options) {
    this._layers = {};
    this._eventsSocket = eventsSocket;
    this._styles = styles;
    setOptions(this, options);
  },

  addEvent: function (eventItem) {
    const style = this._styles[eventItem.rule];
    const circleMarker = new L.CircleMarker([eventItem.lat, eventItem.lon], style);
    circleMarker._event = eventItem;
    this.addLayer(circleMarker);
  },

  addEvents: function (eventItems) {
    for (let eventItem of eventItems) {
      this.addEvent(eventItem);
    }
  },

  getLayerId: function (layer) {
    return layer._event.id;
  },

  onAdd: function (map) {
    const that = this;
    this._eventsSocket.getEvents().then((eventsItems) => {
      that.addEvents(eventsItems);
    });
  }
});

L.EventsOverlay = EventsOverlay;

L.EventsOverlay.eventsOverlay = function () {
  return new EventsOverlay();
};

export default EventsOverlay;
