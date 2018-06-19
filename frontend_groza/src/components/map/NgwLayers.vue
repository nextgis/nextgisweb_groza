<template></template>

<script>
  import store from '../../store/index'
  import {GET_NGW_TILE_ADAPTER_URL} from '../../store/actions/ngw'
  import NgwTileLayer from '../../core/layers/NgwTileLayer'

  export default {
    name: 'NgwLayers',
    mounted() {
      const map = this.$parent.map
      const webMapInfo = this.$parent.webMapInfo
      const layersInfo = webMapInfo.layers

      store.dispatch(GET_NGW_TILE_ADAPTER_URL).then((url) => {
        if (layersInfo) {
          const stylesId = [];
          for(let i = layersInfo.length; i--;) {
            const layerInfo = layersInfo[i]
            if (layerInfo.adapter !== 'ngw-webmap/TileAdapter') continue
            stylesId.push(layerInfo.styleId);
          }
          if (stylesId.length > 0) {
            const ngwImageLayer = new NgwTileLayer(url, stylesId)
            map.addLayer(ngwImageLayer)
          }
        }
      })
    }
  }
</script>

<style scoped></style>
