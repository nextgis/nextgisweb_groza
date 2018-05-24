<template></template>

<script>
  import NgwEventsLayer from '../../core/layers/NgwEventsLayer'

  export default {
    name: 'NgwEventsLayer',
    data() {
      return {
        ngwEventsLayer: null
      }
    },
    mounted() {
      const map = this.$parent.map
      this.ngwEventsLayer = new NgwEventsLayer(window.grozaConfig.settings.eventsStyles)
      map.addLayer(this.ngwEventsLayer)
    },
    beforeDestroy() {
      this.ngwEventsLayer.destroy()
    }
  }
</script>

<style scoped>

</style>
