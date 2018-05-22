<template></template>

<script>
  import NgwEventsOverlay from '../../core/layers/NgwEventsOverlay'

  export default {
    name: 'NgwEventsLayer',
    mounted() {
      const map = this.$parent.map
      const ngwEventsOverlay = new NgwEventsOverlay(window.grozaConfig.settings.eventsStyles)
      map.addLayer(ngwEventsOverlay)
    }
  }
</script>

<style scoped>

</style>
