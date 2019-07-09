<template>
  <v-app id="inspire">
    <v-content>
      <v-snackbar
              v-model="snackbar"
              :bottom="y === 'bottom'"
              :left="x === 'left'"
              :multi-line="mode === 'multi-line'"
              :right="x === 'right'"
              :timeout="timeout"
              :top="y === 'top'"
              :vertical="mode === 'vertical'"
      >
        {{ text }}
        <v-btn
                color="pink"
                flat
                @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>

      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Log In</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form @submit="login()">
                  <v-text-field prepend-icon="person" name="nim" v-model="data.nim" label="NIM" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" v-model="data.password" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login()" v-bind:loading="isLoading" v-bind:disabled="isLoading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import * as api from '@/api'

  export default {
    data: () => ({
      isLoading: false,
      snackbar: false,
      y: 'top',
      x: 'right',
      mode: '',
      timeout: 6000,
      text: '',
      drawer: null,
      data: {
        nim: null,
        password: null
      },
    }),
    props: {
      source: String
    },
    methods: {
      async login() {
        this.isLoading = true
        await api.post('/login', this.data, (result) => {
          if (!result.status) {
            this.snackbar = true
            this.text = 'Username atau password salah'
          } else {
            this.$store.commit('UPDATE_TOKEN', result.data.token)
            this.$router.push('/')
          }
        })
        this.isLoading = false
      },
    }
  }
</script>