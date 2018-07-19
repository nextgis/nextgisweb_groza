<template>
  <v-card>
    <v-card-title class="toolbar blue white--text">
      Условные обозначения
    </v-card-title>
    <v-card-text>
      <table>
        <tr>
          <th class="legend-sub-header" colspan="2">Молнии &laquo;облако-земля&raquo;</th>
        </tr>
        <tr>
          <td>
            <svg width="22" height="22">
              <path stroke="#990000" stroke-opacity="1" stroke-width="1" stroke-linecap="round"
                    stroke-linejoin="round" fill="#ff0000" fill-opacity="0.5" fill-rule="evenodd"
                    d="M 1 11 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0 M 6 11, L 16 11 M 11 6, L 11 16" class=""></path>
            </svg>
          </td>
          <td class="legend-item">
            <span>Положительной амплитуды</span>
          </td>
        </tr>
        <tr>
          <td>
            <svg width="22" height="22">
              <path stroke="#0047b3" stroke-opacity="1" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                    fill="#3385ff" fill-opacity="0.5" fill-rule="evenodd"
                    d="M 1 11 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0 M 6 11, L 16 11" class=""></path>
            </svg>
          </td>
          <td class="legend-item">
            <span>Отрицательной амплитуды</span>
          </td>
        </tr>
        <tr>
          <th class="legend-sub-header" colspan="2">Другие молнии</th>
        </tr>
        <tr>
          <td>
            <svg width="22" height="22">
              <path stroke="#999999" stroke-opacity="1" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                    fill="#cccccc" fill-opacity="0.5" fill-rule="evenodd"
                    d="M 1 11 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0" class=""></path>
            </svg>
          </td>
          <td class="legend-item">
            <span>Облачные молнии</span>
          </td>
        </tr>
      </table>
    </v-card-text>
  </v-card>
</template>

<script>

  export default {
    name: 'NgHistoryLegend',
    data() {
      return {}
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style>

</style>

<style scoped>
  .toolbar {
    font-size: 14px;
  }

  table {
    width: 100%;
  }

  .legend-item {
    padding: 0 3px;
    text-align: left;
  }

  .legend-sub-header {
    font-weight: bold;
    font-size: 13px;
    color: gray;
  }

  .legend-item-margin-bottom {
    margin-bottom: 5px;
  }
</style>
