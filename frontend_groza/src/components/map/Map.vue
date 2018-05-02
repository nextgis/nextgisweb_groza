<template>
  <div id="map"></div>
</template>

<script>
  import Map from 'leaflet'
  export default {
    name: 'Map',
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        this.map = L.map('map').setView([38.63, -90.23], 12);
      }
    }
  }
</script>

<style scoped>
  #map {
    width: 100%;
    height: 100%;
  }
</style>
