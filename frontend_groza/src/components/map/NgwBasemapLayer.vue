<template></template>

<script>
  export default {
    name: 'NgwBasemapLayer',
    mounted() {
      const map = this.$parent.map
      const webMapInfo = this.$parent.webMapInfo

      const basemapInfo = webMapInfo.basemap
      const basemapLayer = L.tileLayer(basemapInfo.url, {id: basemapInfo.resource_id})
      map.addLayer(basemapLayer)
    }
  }
</script>

<style scoped></style>
