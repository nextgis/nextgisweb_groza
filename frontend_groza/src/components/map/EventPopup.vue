<template>
  <v-container fluid grid-list-md>
    <v-flex xs12>
      <v-card>
        <v-card-title><h4>{{ event.ampl != 0 ? 'Молния &laquo;облако-земля&raquo;' : 'Облачная молния '}}</h4></v-card-title>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-tile>
            <v-list-tile-content>Дата</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ moment(new Date(event.ev_ts*1000)).format('YYYY/MM/DD') }}
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
    props: ['event']
  }
</script>

<style scoped>
.container {
  width: 500px;
}
</style>
