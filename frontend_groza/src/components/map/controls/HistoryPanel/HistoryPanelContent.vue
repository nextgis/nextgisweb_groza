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
        <v-btn icon
               title="В режим Диспетчера"
               @click.native="goToMonitoring()">
          <v-icon>track_changes</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card>
        <v-container
          fluid
          style="min-height: 0;"
          grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12>
              <v-switch
                :label="'Облачные молнии'"
                v-model="switchCloud"
                v-on:change="onChange()"
              ></v-switch>
            </v-flex>
            <v-flex xs12 class="date-range-selector">
              <flat-pickr
                value=""
                v-model="date"
                @on-change="onRangeChanged"
                :config="config">
              </flat-pickr>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </div>
  </div>

</template>

<script>
  import flatPickr from '../../../controls/VueFlatpickr'
  import 'flatpickr/dist/flatpickr.css'
  import {Russian} from 'flatpickr/dist/l10n/ru'
  import moment from 'moment'
  import router from '../../../../router/index'
  import EventBus from '../../../../event-bus'

  export default {
    name: 'HistoryPanelContent',
    components: {flatPickr},
    map: null,
    data() {
      return {
        date: null,
        closed: false,
        config: {
          mode: 'range',
          altFormat: 'Y/m/d',
          altInput: true,
          dateFormat: 'Y-m-d',
          locale: Russian,
          enableTime: false,
          defaultHour: 0
        },
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
      onChange() {
        console.log()
      },
      onRangeChanged(dates) {
        if (dates.length !== 2) return false
        console.log(dates)
        const start = moment.utc(dates[0]).format()
        const end = moment.utc(dates[1]).add(1, 'days').format()
        EventBus.$emit('UPDATE_HISTORY_EVENTS', {
          start: start,
          end: end
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
