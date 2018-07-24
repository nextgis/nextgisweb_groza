<template>
  <v-card>
    <v-card-title class="toolbar blue white--text">
      Условные обозначения
    </v-card-title>
    <v-card-text>
      <table class="points-table">
        <tr>
          <th class="legend-sub-header" colspan="4">Молнии по времени (минут назад)</th>
        </tr>
        <tr>
          <td class="point-column">
            <svg width="22" height="22">
              <path stroke="#999900" stroke-opacity="1" stroke-width="1" stroke-linecap="round"
                    stroke-linejoin="round" fill="#ffff00" fill-opacity="0.5" fill-rule="evenodd"
                    d="M 1 11 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0" class=""></path>
            </svg>
          </td>
          <td class="legend-item">
            <span>< 1 минуты</span>
          </td>
          <td class="point-column">
            <svg width="22" height="22">
              <path stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="round"
                    stroke-linejoin="round" fill="#000000" fill-opacity="0.5" fill-rule="evenodd"
                    d="M 1 11 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0" class=""></path>
            </svg>
          </td>
          <td class="legend-item">
            <span>21-30 минут</span>
          </td>
        </tr>

        <tr>
          <td class="point-column">
            <svg width="22" height="22">
              <path stroke="#990000" stroke-opacity="1" stroke-width="1" stroke-linecap="round"
                    stroke-linejoin="round" fill="#ff0000" fill-opacity="0.5" fill-rule="evenodd"
                    d="M 1 11 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0" class=""></path>
            </svg>
          </td>
          <td class="legend-item">
            <span>2-5 минут</span>
          </td>

          <td class="point-column">
            <svg width="22" height="22">
              <path stroke="#999999" stroke-opacity="1" stroke-width="1" stroke-linecap="round"
                    stroke-linejoin="round" fill="#cccccc" fill-opacity="0.5" fill-rule="evenodd"
                    d="M 1 11 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0" class=""></path>
            </svg>
          </td>
          <td class="legend-item">
            <span>31-40 минут</span>
          </td>
        </tr>

        <tr>
          <td class="point-column">
            <svg width="22" height="22">
              <path stroke="#cc7a00" stroke-opacity="1" stroke-width="1" stroke-linecap="round"
                    stroke-linejoin="round" fill="#ff9900" fill-opacity="0.5" fill-rule="evenodd"
                    d="M 1 11 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0" class=""></path>
            </svg>
          </td>
          <td class="legend-item">
            <span>6-10 минут</span>
          </td>

          <td class="point-column">
            <svg width="22" height="22">
              <path stroke="#0047b3" stroke-opacity="1" stroke-width="1" stroke-linecap="round"
                    stroke-linejoin="round" fill="#3385ff" fill-opacity="0.5" fill-rule="evenodd"
                    d="M 1 11 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0" class=""></path>
            </svg>
          </td>
          <td class="legend-item">
            <span>41-50 минут</span>
          </td>
        </tr>

        <tr>
          <td class="point-column">
            <svg width="22" height="22">
              <path stroke="#805500" stroke-opacity="1" stroke-width="1" stroke-linecap="round"
                    stroke-linejoin="round" fill="#b37700" fill-opacity="0.5" fill-rule="evenodd"
                    d="M 1 11 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0" class=""></path>
            </svg>
          </td>
          <td class="legend-item">
            <span>11-20 минут</span>
          </td>
          <td class="point-column">
            <svg width="22" height="22">
              <path stroke="#0066cc" stroke-opacity="1" stroke-width="1" stroke-linecap="round"
                    stroke-linejoin="round" fill="#b3d9ff" fill-opacity="0.5" fill-rule="evenodd"
                    d="M 1 11 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0" class=""></path>
            </svg>
          </td>
          <td class="legend-item">
            <span>51-60 минут</span>
          </td>
        </tr>

      </table>

      <table>
        <tr>
          <th class="legend-sub-header" colspan="2">Типы молний</th>
        </tr>
        <tr>
          <td>
            <svg width="22" height="22">
              <path stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="round"
                    stroke-linejoin="round" fill="#ffffff" fill-opacity="0.5" fill-rule="evenodd"
                    d="M 1 11 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0 M 6 11, L 16 11 M 11 6, L 11 16" class=""></path>
            </svg>
          </td>
          <td class="legend-item">
            <span>Молнии &laquo;облако-земля&raquo; положительной амплитуды</span>
          </td>
        </tr>
        <tr>
          <td>
            <svg width="22" height="22">
              <path stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                    fill="#ffffff" fill-opacity="0.5" fill-rule="evenodd"
                    d="M 1 11 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0 M 6 11, L 16 11" class=""></path>
            </svg>
          </td>
          <td class="legend-item">
            <span>Молнии &laquo;облако-земля&raquo; отрицательной амплитуды</span>
          </td>
        </tr>
        <tr>
          <td>
            <svg width="22" height="22">
              <path stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                    fill="#ffffff" fill-opacity="0.5" fill-rule="evenodd"
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
    name: 'NgMonitoringLegend',
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

  table.points-table {
    width: 300px;
  }

  table.points-table td.point-column {
    width: 26px;
  }

  table.points-table td.legend-item {
    width: 120px;
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
