import L from 'leaflet';
import EventPopupVue from '../../components/map/EventPopup';
import './EventPopup.css'
import Vue from 'vue';

const EventPopup = L.Popup.extend({
  initialize: function (options, grozaEvent, source) {
    L.setOptions(this, options);
    this.options.closeButton = false;
    this.options.className = 'eventPopup';
    this._source = source;
    this._buildVueContent(grozaEvent);
  },

  _buildVueContent: function (grozaEvent) {
    const EventPopupVueClass = Vue.extend(EventPopupVue);
    const that = this;
    const instance = new EventPopupVueClass({
      propsData: {
        event: grozaEvent,
        closeCallback: () => {
          that._map.closePopup();
        }
      }
    });
    instance.$mount();
    this._content = instance.$el;
  }
});

L.EventPopup = EventPopup;

L.eventPopup = function () {
  return new EventPopup();
};

export default EventPopup;
