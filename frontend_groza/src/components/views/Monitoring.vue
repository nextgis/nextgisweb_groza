<template>
  <ng-map>
    <rg-events-layer></rg-events-layer>
    <ngw-basemap-layer></ngw-basemap-layer>
    <ngw-layers></ngw-layers>
    <monitoring-panel></monitoring-panel>
  </ng-map>
</template>

<script>
  import NgMap from '../map/NgMap.vue'
  import NgwBasemapLayer from '../map/NgwBasemapLayer.vue'
  import RgEventsLayer from '../map/RgEventsLayer'
  import NgwLayers from '../map/NgwLayers'
  import MonitoringPanel from '../map/controls/MonitoringPanel/MonitoringPanel.vue'

  export default {
    name: 'Monitoring',
    components: { NgMap, RgEventsLayer, NgwLayers, NgwBasemapLayer, MonitoringPanel }
  }
</script>

<style scoped>

</style>
