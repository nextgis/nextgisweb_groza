<template>
  <ng-map>
    <rg-events-layer></rg-events-layer>
    <ngw-basemap-layer></ngw-basemap-layer>
  </ng-map>
</template>

<script>
  import NgMap from '../map/NgMap.vue'
  import NgwBasemapLayer from '../map/NgwBasemapLayer.vue'
  import RgEventsLayer from '../map/RgEventsLayer'

  export default {
    name: 'Monitoring',
    components: { NgMap, RgEventsLayer, NgwBasemapLayer }
  }
</script>

<style scoped>

</style>
