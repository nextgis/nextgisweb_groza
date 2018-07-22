<template></template>

<script>
  import EventsSocket from '../../core/socket'
  import ZonesLayer from '../../core/layers/ZonesLayer'

  export default {
    name: 'ZonesLayer',
    data() {
      return {
        zonesLayer: null
      }
    },
    mounted() {
      const map = this.$parent.map
      const grozaZonesResult = map.grozaZones

      const zones = []
      for (const index of grozaZonesResult.keys()) {
        const zoneInfo = grozaZonesResult[index]
        zones[index] = zoneInfo.map(zoneInfoItem => zoneInfoItem.geom)
      }

      delete map.grozaZones

      this.zonesLayer = new ZonesLayer(zones, window.grozaConfig.settings)
      map.addLayer(this.zonesLayer)
    },
    beforeDestroy() {
      this.zonesLayer.destroy()
    }
  }
</script>

<style scoped>

</style>
