import {setOptions} from 'leaflet'
import ShapeMarker from '../layers/L.ShapeMarker'
import EventPopup from '../../components/map/EventPopup'
import Vue from 'vue'
import EventBus from '../../event-bus'

const EventsOverlay = L.FeatureGroup.extend({
  initialize: function (eventsSocket, styles, options) {
    this._layers = {};
    this._eventsSocket = eventsSocket;
    this._styles = styles;
    this._popup = null;
    setOptions(this, options);
  },

  addEvent: function (eventItem) {
    const expireStyle = this._styles.expired[eventItem.rule]
    const lightTypeStyle = this._styles.types[eventItem.ligh_t]
    const options = {
      className: `ligh_t_${eventItem.ligh_t}`
    }

    Object.assign(options, lightTypeStyle)
    Object.assign(options, expireStyle)

    const circleMarker = new ShapeMarker([eventItem.lat, eventItem.lon], options)

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

  hideCloudEvents() {
    const sheet = document.createElement('style');
    sheet.innerHTML = 'path.ligh_t_0 { display: none; }';
    this._sheetElement = document.body.appendChild(sheet);
  },

  showCloudEvents() {
    if (this._sheetElement) {
      document.body.removeChild(this._sheetElement);
    }
    this._sheetElement = null;
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

    EventBus.$on('HIDE_CLOUD_EVENTS', () => {
      this.hideCloudEvents();
    });

    EventBus.$on('SHOW_CLOUD_EVENTS', () => {
      this.showCloudEvents();
    });
  }
});

L.EventsOverlay = EventsOverlay;

L.eventsOverlay = function () {
  return new EventsOverlay();
};

export default EventsOverlay;
