<template></template>

<script>
  import MonitoringPanelControl from './MonitoringPanelControl'

  export default {
    name: 'MonitoringPanelControl',
    props: {
      position: {
        type: String,
        default: 'topright'
      },
      options: {
        type: Object,
        default: () => ({}),
      },
    },
    mounted() {
      this.mapObject = new MonitoringPanelControl({position: this.position})
      this.mapObject.addTo(this.$parent.map)
    }
  }
</script>
