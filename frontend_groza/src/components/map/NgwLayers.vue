<template></template>

<script>
  import store from '../../store/index'
  import {IMAGE_ADAPTER_URL} from '../../store/actions/ngw'
  import NgwImageOverlay from '../../core/layers/NgwImageOverlay'

  export default {
    name: 'NgwLayers',
    mounted() {
      const map = this.$parent.map
      const webMapInfo = this.$parent.webMapInfo
      const layersInfo = webMapInfo.layers

      store.dispatch(IMAGE_ADAPTER_URL).then((url) => {
        if (layersInfo) {
          for (const layerInfo of layersInfo) {
            if (layerInfo.adapter !== 'ngw-webmap/ImageAdapter') continue
            const ngwImageLayer = new NgwImageOverlay(url, layerInfo.styleId)
            map.addLayer(ngwImageLayer)
          }
        }
      })
    }
  }
</script>

<style scoped></style>
