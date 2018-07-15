<template>
  <v-container fluid class="ng-date-range-selector">
    <v-layout row>
      <v-flex xs6>
        <v-card tile flat>
          <v-card-text>
            <input ref="inputStart" class="btn normal" type="text" placeholder="От"></v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card tile flat>
          <v-card-text><input ref="inputEnd" class="btn normal" type="text" placeholder="До"></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Flatpickr from 'flatpickr'
  import {Russian} from 'flatpickr/dist/l10n/ru'

  export default {
    name: 'RangeSelector',
    methods: {
      getSelectedDates: function () {
        if (this._flatpickrFrom.selectedDates.length != 1 && this._flatpickrTo.selectedDates.length != 1) return false
        const selectedDatesFrom = this._flatpickrFrom.selectedDates[0]
        const selectedDatesTo = this._flatpickrTo.selectedDates[0]
        const selectedDates = [selectedDatesFrom, selectedDatesTo]
        if (selectedDatesFrom > selectedDatesTo) selectedDates.reverse()
        return selectedDates
      }
    },
    mounted() {
      const options = {
        altInput: false,
        altFormat: 'Y/m/d',
        locale: Russian,
        enableTime: true,
        inline: true,
        minuteIncrement: 1,
        time_24hr: true,
        dateFormat: 'Y-m-d H:i'
      }
      this._flatpickrFrom = Flatpickr(this.$refs.inputStart, options)
      this._flatpickrTo = Flatpickr(this.$refs.inputEnd, options)

      const currentDate = new Date()
      this._flatpickrTo.setDate(currentDate)
      this._flatpickrFrom.setDate(currentDate.setHours(currentDate.getHours() - 1))
    },
    beforeDestroy() {
      this._flatpickrFrom.destroy()
      this._flatpickrTo.destroy()
    }
  }
</script>

<style scoped>
  .ng-date-range-selector {
    display: inline-block;
  }

  .ng-date-range-selector input.btn {
    font-family: Roboto, sans-serif;
    width: 307px;
    text-align: center;
    margin: 5px 0;
    padding: 0;
  }

  .ng-date-range-selector input.btn::placeholder {
    color: #494949;
    opacity: 1;
  }

  .ng-date-range-selector input.btn:-ms-input-placeholder,
  .ng-date-range-selector input.btn::-ms-input-placeholder {
    color: #494949;
  }
</style>
