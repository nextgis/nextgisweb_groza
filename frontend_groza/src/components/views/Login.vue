<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Авторизация</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form v-model="valid" @submit="submit">
                <v-text-field
                  v-model="login"
                  :rules="loginRules"
                  prepend-icon="person"
                  name="login"
                  label="Логин"
                  type="text">
                </v-text-field>
                <v-text-field
                  v-model="password"
                  :rules="pswRules"
                  prepend-icon="lock"
                  name="password"
                  label="Пароль"
                  id="password"
                  type="password">
                </v-text-field>
              </v-form>
              <div>
                <v-alert type="error" dismissible v-model="authFail">
                  Вход не выполнен
                </v-alert>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn v-on:click.native="submit" :disabled="!valid" color="primary">Войти</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import {AUTH_REQUEST} from '../../store/actions/auth'

  export default {
    name: 'Login',
    data: () => ({
      valid: false,
      authFail: false,
      login: '',
      loginRules: [
        v => !!v || 'Логин обязателен'
      ],
      password: '',
      pswRules: [
        v => !!v || 'Пароль обязателен'
      ]
    }),
    methods: {
      submit() {
        const {login, password} = this
        this.$store.dispatch(AUTH_REQUEST, {login, password})
          .then((authResult) => {
            if (authResult) {
              this.authFail = false;
              this.$router.push('/')
            } else {
              this.authFail = true;
            }
          })
      }
    }
  }
</script>

<style scoped>

</style>
