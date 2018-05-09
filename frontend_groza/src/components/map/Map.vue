<template>
  <div id="map"></div>
</template>

<script>
  import Map from 'leaflet'
  import {NGW_WEB_MAP} from '../../store/actions/ngw'

  export default {
    name: 'Map',
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        this.$store.dispatch(NGW_WEB_MAP)
          .then((httpAnswer) => {
            const result = httpAnswer.data;
            if (result.success) {
              const webMapInfo = result.data;
              this.map = L.map('map');
              this.map.fitBounds(webMapInfo.extent);
            } else {
              // todo: handle unsuccessful result
            }
          })
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
