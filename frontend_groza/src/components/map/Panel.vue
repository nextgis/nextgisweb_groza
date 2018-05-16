<template>
  <div
    style=""
    class="grey lighten-3">
    <v-toolbar color="blue">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">Панель управления</v-toolbar-title>
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
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'Panel',
    data() {
      return {
        switchCloud: true
      }
    },
    methods: {
      onChange() {
        console.log()
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
