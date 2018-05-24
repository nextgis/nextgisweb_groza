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
        <v-toolbar-title class="white--text">Диспетчер</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon
               title="Открыть архив данных"
               @click.native="goToHistory()">
          <v-icon>history</v-icon>
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
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script>
  import router from '../../../../router/index'
  import EventBus from '../../../../event-bus'

  export default {
    name: 'MonitoringPanelContent',
    data() {
      return {
        closed: false,
        switchCloud: true
      }
    },
    methods: {
      onChangeClosed() {
        this.closed = !this.closed
      },
      goToHistory() {
        router.push('/history')
      },
      onSwitchCloud() {
        if (this.switchCloud) {
          EventBus.$emit('SHOW_CLOUD_EVENTS');
        } else {
          EventBus.$emit('HIDE_CLOUD_EVENTS');
        }
      }
    }
  }
</script>

<style scoped>
  div.panel-control {
    background: white;
    border: gray 1px solid;
    width: 150px;
  }
</style>
