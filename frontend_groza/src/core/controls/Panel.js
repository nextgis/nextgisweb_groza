import Panel from '../../components/map/Panel'
import Vue from 'vue'

const PanelControl = L.Control.extend({
  onAdd: function (map) {
    const ComponentClass = Vue.extend(Panel)
    const instance = new ComponentClass({})
    instance.$mount()
    return instance.$el
  },

  onRemove: function (map) {}
});

export default PanelControl;
