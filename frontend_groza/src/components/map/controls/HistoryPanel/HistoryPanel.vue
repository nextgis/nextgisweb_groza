<template></template>

<script>
  import HistoryPanelControl from './HistoryPanelControl'

  export default {
    name: 'HistoryPanel',
    props: {
      position: {
        type: String,
        default: 'topright'
      },
      options: {
        type: Object,
        default: () => ({}),
      },
    },
    mounted() {
      this.mapObject = new HistoryPanelControl({position: this.position})
      this.mapObject.addTo(this.$parent.map)
    }
  }
</script>
