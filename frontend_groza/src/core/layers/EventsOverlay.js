import {setOptions} from 'leaflet'
import EventPopup from '../../components/map/EventPopup'
import Vue from 'vue'

const EventsOverlay = L.FeatureGroup.extend({
  initialize: function (eventsSocket, styles, options) {
    this._layers = {};
    this._eventsSocket = eventsSocket;
    this._styles = styles;
    this._popup = null;
    setOptions(this, options);
  },

  addEvent: function (eventItem) {
    const style = this._styles[eventItem.rule];
    const circleMarker = new L.CircleMarker([eventItem.lat, eventItem.lon], style);
    circleMarker._grozaEvent = eventItem;
    circleMarker._grozaId = eventItem.id;
    this.addLayer(circleMarker);

    const that = this;
    circleMarker.on('click', function () {
      const marker = this;
      const map = marker._map;

      const EventPopupClass = Vue.extend(EventPopup)
      const instance = new EventPopupClass({
        propsData: {
          event: this._grozaEvent
        }
      })
      instance.$mount()
      const htmlEl = instance.$el

      const popup = L.popup({
        maxWidth: 300
      })
        .setLatLng(marker.getLatLng())
        .setContent(htmlEl)

      map.openPopup(popup);
      that._popup = popup;

      console.log(marker);
    });
  },

  addEvents: function (eventItems) {
    for (let eventItem of eventItems) {
      this.addEvent(eventItem);
    }
  },

  getLayerId: function (layer) {
    return layer._grozaId;
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
