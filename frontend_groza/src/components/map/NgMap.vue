<template>
  <div class="ng-map">
    <slot v-if="ready"></slot>
  </div>
</template>

<script>
  import {NGW_WEB_MAP} from '../../store/actions/ngw'
  import L from 'leaflet'
  import * as lg from 'leaflet-graphicscale'

  export default {
    name: 'NgMap',
    data() {
      return {
        ready: false
      }
    },
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        const that = this;
        this.$store.dispatch(NGW_WEB_MAP)
          .then((httpAnswer) => {
            const result = httpAnswer.data
            if (result.success) {
              this.webMapInfo = result.data
              this.map = L.map(this.$el, {
                crs: L.CRS.EPSG3857
              })
              this.map.fitBounds(this.webMapInfo.extent)
              const graphicScale = L.control.graphicScale({
                showSubunits: true,
                doubleLine: true,
                fill: 'fill'
              }).addTo(this.map)

              // const layers = webMapInfo.layers
              // const imageAdapterUrl = this.$store.dispatch(IMAGE_ADAPTER_URL)
              // for (let layer of layers) {
              // const imageNgwLayer = new L.ImageOverlay.ImageNgwOverlay(imageAdapterUrl)
              // this.map.addLayer(imageNgwLayer)
              // }
            } else {
              // todo: handle unsuccessful result
            }

            this.ready = true
          })
      }
    }
  }
</script>

<style>
  .ng-map .leaflet-top,
  .ng-map .leaflet-bottom {
    z-index: 800;
  }
</style>

<style scoped>
  .ng-map {
    width: 100%;
    height: 100%;
  }
</style>
