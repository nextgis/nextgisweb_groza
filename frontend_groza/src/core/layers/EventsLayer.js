import L from 'leaflet';
import ShapeMarker from './L.ShapeMarker';
import EventPopup from '../../components/map/EventPopup';
import Vue from 'vue';

const EventsLayer = L.FeatureGroup.extend({
  initialize: function (styles, getEventMarkerOptions, options) {
    this._layers = {};
    this._getEventMarkerOptions = getEventMarkerOptions;
    this._styles = styles;
    this._popup = null;
    L.setOptions(this, options);
  },

  addEvent: function (eventItem) {
    const markerOptions = this._getEventMarkerOptions.call(this, eventItem, this._styles);
    const circleMarker = new ShapeMarker([eventItem.lat, eventItem.lon], markerOptions);
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
      });
      instance.$mount();
      const htmlEl = instance.$el;

      const popup = L.popup({
        maxWidth: 300
      })
        .setLatLng(marker.getLatLng())
        .setContent(htmlEl);

      map.openPopup(popup);
      that._popup = popup;
    });
  },

  hideCloudEvents() {
    const sheet = document.createElement('style');
    sheet.innerHTML = 'path.ligh_t_0 { display: none; }';
    this._sheetElement = document.body.appendChild(sheet);
  },

  showCloudEvents() {
    this._removeSheetElement();
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

L.EventsLayer = EventsLayer;

L.eventsLayer = function () {
  return new EventsLayer();
};

export default EventsLayer;
