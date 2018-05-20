<template>
  <ng-map>
    <events-layer></events-layer>
    <ngw-basemap-layer></ngw-basemap-layer>
  </ng-map>
</template>

<script>
  import NgMap from '../map/NgMap.vue'
  import NgwBasemapLayer from '../map/NgwBasemapLayer.vue'
  import EventsLayer from '../map/EventsLayer'

  export default {
    name: 'Monitoring',
    components: { NgMap, EventsLayer, NgwBasemapLayer }
  }
</script>

<style scoped>

</style>
