import L from 'leaflet'
import MonitoringPanelContent from './MonitoringPanelContent.vue'
import Vue from 'vue'

export default L.Control.extend({
  onAdd: function (map) {
    const ComponentClass = Vue.extend(MonitoringPanelContent)
    const instance = new ComponentClass({})
    instance.$mount()
    return instance.$el
  },

  addTo(map) {
    L.Control.prototype.addTo.call(this, map);

    const container = this._container;
    if (!L.Browser.touch) {
      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.on(container, 'mousewheel touchstart', L.DomEvent.stopPropagation);
    } else {
      L.DomEvent.on(container, 'click dblclick mousewheel mousedown touchstart', L.DomEvent.stopPropagation);
    }

    return this;
  },

  onRemove: function (map) {
  }
});
