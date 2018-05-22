<template>
  <ng-map>
    <ngw-basemap-layer></ngw-basemap-layer>
    <ngw-events-layer></ngw-events-layer>
    <history-panel></history-panel>
  </ng-map>
</template>

<script>
  import NgMap from '../map/NgMap.vue'
  import NgwBasemapLayer from '../map/NgwBasemapLayer.vue'
  import HistoryPanel from '../map/controls/HistoryPanel/HistoryPanel.vue'
  import NgwEventsLayer from '../map/NgwEventsLayer.vue'

  export default {
    name: 'History',
    components: { NgMap, NgwBasemapLayer, HistoryPanel, NgwEventsLayer }
  }
</script>

<style scoped>

</style>
