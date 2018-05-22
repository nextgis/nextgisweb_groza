import {setOptions} from 'leaflet'
import ShapeMarker from '../layers/L.ShapeMarker'
import EventPopup from '../../components/map/EventPopup'
import Vue from 'vue'
import EventBus from '../../event-bus'
import store from '../../store/index'
import {NGW_GET_EVENTS} from '../../store/actions/ngw'

const NgwEventsOverlay = L.FeatureGroup.extend({
  initialize: function (styles, options) {
    this._layers = {};
    this._styles = styles;
    this._popup = null;
    setOptions(this, options);
  },

  addEvent: function (eventItem) {
    const lightTypeStyle = this._styles.types[eventItem.ligh_t]
    const circleMarker = new ShapeMarker([eventItem.lat, eventItem.lon], lightTypeStyle)
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
    EventBus.$on('UPDATE_HISTORY_EVENTS', function (startEndInfo) {
      store.dispatch(NGW_GET_EVENTS, startEndInfo).then((httpAnswer) => {
        const result = httpAnswer.data
        if (result.success) {
          that.addEvents(result.data);
        } else {
          // todo: handle unsuccessful result
        }
      })
    });
  }
});

L.NgwEventsOverlay = NgwEventsOverlay;

L.ngwEventsOverlay = function () {
  return new NgwEventsOverlay();
};

export default NgwEventsOverlay;
