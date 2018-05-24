<template>
  <v-container fluid grid-list-md>
    <v-flex xs12>
      <v-toolbar color="blue">
        <v-toolbar-title class="body-2 white--text">
          {{ event.ampl != 0 ? 'Молния &laquo;облако-земля&raquo;' : 'Облачная молния '}}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="info" icon
               title="В режим Диспетчера"
               v-on:click.native="closeCallback()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card>
        <v-list dense>
          <v-list-tile>
            <v-list-tile-content>Дата</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ moment(new Date(event.ev_ts*1000)).format('YYYY.MM.DD') }}
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Время</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ moment(new Date(event.ev_ts*1000)).format('HH:mm:ss') }}
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Широта:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ event.lat }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Долгота:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ event.lon }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Аплитуда, кВ:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ event.ampl }}</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
  export default {
    name: 'EventPopup',
    props: ['event', 'closeCallback'],
    beforeDestroy() {
      console.log(this);
    }
  }
</script>

<style scoped>
  .container {
    width: 500px;
  }
</style>
