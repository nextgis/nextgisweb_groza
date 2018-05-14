<template>
  <div id="map"></div>
</template>

<script>
  import Map from 'leaflet'
  import {IMAGE_ADAPTER_URL, NGW_WEB_MAP} from '../../store/actions/ngw'
  import EventsOverlay from '../../core/layers/EventsOverlay'
  import EventsSocket from '../../core/socket'

  export default {
    name: 'Map',
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        this.$store.dispatch(NGW_WEB_MAP)
          .then((httpAnswer) => {
            const result = httpAnswer.data
            if (result.success) {
              const webMapInfo = result.data
              this.map = L.map('map', {
                crs: L.CRS.EPSG3857
              })
              this.map.fitBounds(webMapInfo.extent)
              const basemapInfo = webMapInfo.basemap
              const basemapLayer = L.tileLayer(basemapInfo.url, {id: basemapInfo.resource_id})
              this.map.addLayer(basemapLayer)

              const layers = webMapInfo.layers
              const imageAdapterUrl = this.$store.dispatch(IMAGE_ADAPTER_URL)
              for (let layer of layers) {
                // const imageNgwLayer = new L.ImageOverlay.ImageNgwOverlay(imageAdapterUrl)
                // this.map.addLayer(imageNgwLayer)
              }
            } else {
              // todo: handle unsuccessful result
            }

            const eventsSocket = new EventsSocket();
            const eventsOveray = new EventsOverlay(eventsSocket, window.grozaConfig.eventsStyles);
            this.map.addLayer(eventsOveray);
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
