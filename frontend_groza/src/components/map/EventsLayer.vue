<template></template>

<script>
  import EventsSocket from '../../core/socket'
  import EventsOverlay from '../../core/layers/EventsOverlay'

  export default {
    name: 'EventsLayer',
    mounted() {
      const map = this.$parent.map
      const eventsSocket = new EventsSocket();
      const eventsOveray = new EventsOverlay(eventsSocket, window.grozaConfig.settings.eventsStyles);
      map.addLayer(eventsOveray);
    }
  }
</script>

<style scoped>

</style>
