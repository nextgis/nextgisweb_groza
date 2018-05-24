<template>
  <div class="date-range-selector">
    <input ref="rangeStart" class="btn normal" type="text" placeholder="От"> -
    <input ref="rangeEnd" class="btn normal" type="text" placeholder="До" data-fp-omit>
  </div>
</template>

<script>
  import Flatpickr from 'flatpickr'
  import RangePlugin from 'flatpickr/dist/plugins/rangePlugin'
  import {Russian} from 'flatpickr/dist/l10n/ru'

  export default {
    name: 'RangeSelector',
    methods: {
      getSelectedDates: function () {
        const selectedDates = this._flatpickr.selectedDates
        if (selectedDates.length !== 2) return false
        return selectedDates
      }
    },
    mounted() {
      this._flatpickr = Flatpickr(this.$refs.rangeStart, {
        altInput: false,
        altFormat: 'Y/m/d',
        locale: Russian,
        enableTime: true,
        minuteIncrement: 1,
        time_24hr: true,
        dateFormat: 'Y-m-d H:i',
        plugins: [
          new RangePlugin({
            input: this.$refs.rangeEnd
          })
        ]
      })
    },
    beforeDestroy() {
      this._flatpickr.destroy();
    }
  }
</script>

<style scoped>
  div.date-range-selector input.btn {
    font-family: Roboto, sans-serif;
    min-width: 200px;
    text-align: center;
  }

  div.date-range-selector input.btn::placeholder {
    color: #494949;
    opacity: 1;
  }

  div.date-range-selector input.btn:-ms-input-placeholder,
  div.date-range-selector input.btn::-ms-input-placeholder {
    color: #494949;
  }
</style>
