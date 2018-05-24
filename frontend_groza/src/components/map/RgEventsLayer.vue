<template></template>

<script>
  import EventsSocket from '../../core/socket'
  import RgEventsLayer from '../../core/layers/RgEventsLayer'

  export default {
    name: 'RgEventsLayer',
    data() {
      return {
        rgEventsLayer: null
      }
    },
    mounted() {
      const map = this.$parent.map
      const eventsSocket = new EventsSocket()
      this.rgEventsLayer = new RgEventsLayer(eventsSocket, window.grozaConfig.settings)
      map.addLayer(this.rgEventsLayer)
    },
    beforeDestroy() {
      this.rgEventsLayer.destroy()
    }
  }
</script>

<style scoped>

</style>
