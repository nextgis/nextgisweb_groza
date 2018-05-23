<template>
  <div>
    <v-btn v-if="closed"
           title="Открыть панель"
           @click.native="onChangeClosed()"
           color="info">
      <v-icon dark>menu</v-icon>
    </v-btn>
    <div v-else="closed" style="min-width: 300px;"
         class="grey lighten-3">
      <v-toolbar color="blue">
        <v-toolbar-side-icon
          title="Свернуть панель"
          @click.native="onChangeClosed()"></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">Архив данных</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="info" icon
               title="В режим Диспетчера"
               @click.native="goToMonitoring()">
          <v-icon>track_changes</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card>

        <v-list two-line>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>cloud_circle</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Облачные молнии</v-list-tile-title>
              <v-list-tile-sub-title>Отображение облачных молний</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-switch
                :title="'Облачные молнии'"
                v-model="switchCloud"
                v-on:change="onSwitchCloud()"
              ></v-switch>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider inset></v-divider>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>date_range</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Период времени</v-list-tile-title>
              <v-list-tile-sub-title>{{ dateSubTitle }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn class="info" flat icon
                     @click.stop="timeRangeDialog = true">
                <v-icon>date_range</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
      <v-dialog v-model="timeRangeDialog" max-width="500px">
        <v-card>
          <v-card-title>
            Настройка периода времени
          </v-card-title>
          <v-card-text>
            <range-selector
              ref="rangeSelector"
            ></range-selector>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" flat @click.stop="applyTimeRange()">Применить</v-btn>
            <v-btn color="info" flat @click.stop="timeRangeDialog=false">Отмена</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>

</template>

<script>
  import RangeSelector from '../../../controls/RangeSelector.vue'
  import 'flatpickr/dist/flatpickr.css'
  import router from '../../../../router/index'
  import moment from 'moment'
  import EventBus from '../../../../event-bus'

  export default {
    name: 'HistoryPanelContent',
    components: {RangeSelector},
    props: {
      formatDate: {
        default: 'YYYY.MM.DD hh:mm',
        type: String
      }
    },
    map: null,
    data() {
      return {
        timeRangeDialog: false,
        date: null,
        dateSubTitle: 'Настройка периода времени',
        closed: false,
        switchCloud: true
      }
    },
    methods: {
      onChangeClosed() {
        this.closed = !this.closed
      },
      goToMonitoring() {
        router.push('/')
      },
      onSwitchCloud() {
        if (this.switchCloud) {
          EventBus.$emit('SHOW_CLOUD_EVENTS');
        } else {
          EventBus.$emit('HIDE_CLOUD_EVENTS');
        }
      },
      applyTimeRange() {
        this.timeRangeDialog = false
        const selectedDates = this.$refs.rangeSelector.getSelectedDates()
        if (!selectedDates) return false
        const start = moment(selectedDates[0]).format(this.formatDate)
        const end = moment(selectedDates[1]).format(this.formatDate)
        this.dateSubTitle = `${start} - ${end}`
        const startUtc = moment.utc(selectedDates[0]).format()
        const endUtc = moment.utc(selectedDates[1]).format()
        EventBus.$emit('UPDATE_HISTORY_EVENTS', {
          start: startUtc,
          end: endUtc
        });
      }
    }
  }
</script>

<style>
  div.date-range-selector input.form-control.flatpickr-input {
    font-family: Roboto, sans-serif;
    min-width: 200px;
    text-align: center;
  }

  div.date-range-selector input.form-control.flatpickr-input::placeholder {
    color: white;
    opacity: 1; /* Firefox */
  }

  div.date-range-selector input.form-control.flatpickr-input:-ms-input-placeholder,
  div.date-range-selector input.form-control.flatpickr-input::-ms-input-placeholder {
    color: white;
  }
</style>
