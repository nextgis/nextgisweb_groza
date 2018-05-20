<template>
  <ng-map>
    <ngw-basemap-layer></ngw-basemap-layer>
  </ng-map>
</template>

<script>
  import NgMap from '../map/NgMap.vue'
  import NgwBasemapLayer from '../map/NgwBasemapLayer.vue'

  export default {
    name: 'Monitoring',
    components: { NgMap, NgwBasemapLayer }
  }
</script>

<style scoped>

</style>
