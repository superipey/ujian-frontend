<template>
  <v-layout row pb-2>
    <v-flex sm8 offset-sm2>
      <v-card class="card--flex-toolbar">
        <v-toolbar card prominent color="primary">
          <v-btn flat icon dark @click="$router.go(-1)">
            <v-icon dark>chevron_left</v-icon>
          </v-btn>
          <v-toolbar-title class="body-2 white--text">Konfirmasi Ujian</v-toolbar-title>
        </v-toolbar>

        <v-divider></v-divider>

        <div class="pl-3 pt-3 pb-3" v-if="isLoading">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <v-card-text v-if="!isLoading" class="mb-0 pb-0">
          <p class="mb-2"><strong>NIM</strong><br /><span v-html="user.nim"></span></p>
          <v-divider class="mb-2"></v-divider>

          <p class="mb-2"><strong>Nama Lengkap</strong><br /><span v-html="user.nama_lengkap"></span></p>

          <v-divider class="mb-2"></v-divider>

          <p class="mb-2"><strong>Kelas</strong><br /><span v-html="user.kelas.nama_kelas"></span></p>
          <v-divider class="mb-2"></v-divider>

          <p class="mb-2"><strong>Nama Ujian</strong><br /><span v-html="result.nama_ujian"></span></p>
          <v-divider class="mb-2"></v-divider>

          <p class="mb-2"><strong>Jumlah Soal</strong><br /><span v-html="result.jumlah_soal + ' Soal'"></span></p>
          <v-divider class="mb-2"></v-divider>

          <p class="mb-2"><strong>Waktu</strong><br /><span v-html="result.waktu + ' Menit'"></span></p>
          <v-divider class="mb-2"></v-divider>

          <p class="">
            <strong>Token</strong>
            <v-flex sm4>
              <v-text-field maxlength="5" class="pa-0 pb-0 ma-0 mb-0" v-model="token" placeholder="Masukan Token" required></v-text-field>
            </v-flex>
          </p>
        </v-card-text>
        <v-card-actions v-if="!isLoading" class="pt-0 mt-0">
          <v-layout align-center justify-end pb-3 pr-3>
            <v-btn large color="success" @click="submit()" v-bind:loading="isLoadingSoal" v-bind:disable="isLoadingSoal">Submit</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import {mapGetters} from 'vuex'
  import * as api from '@/api'
  import moment from 'moment'

  export default {
    data: () => ({
      result: {},
      token: '',
      isLoading: true,
      isLoadingSoal: false
    }),
    computed: {
      ...mapGetters({
        user: 'activeUser'
      })
    },
    methods: {
      moment(val) {
        return moment(val).format('DD MMM YYYY HH:m:ss')
      },
      getData() {
        api.get('/ujian/' + this.$route.params.id, {}, res => {
          this.result = res.data
          this.isLoading = false
        })
      },
      submit() {
        this.isLoadingSoal = true
        api.post('/ujian/' + this.$route.params.id, {'token': this.token}, res => {
          if (res.status) {
            this.$store.commit('SOAL_TEMP', res.data.data)
            this.$store.commit('UPDATE_SOAL_KE', 0)
            this.$store.commit('UPDATE_UJIAN', this.result)
            this.$router.push({'name': 'ujian', params: {'id': this.$route.params.id}})
          } else {
            this.$store.commit('ALERT', 'Gagal Konfirmasi Ujian. Token tidak sesuai.')
          }
          this.isLoadingSoal = false
        })
      }
    },
    mounted() {
      if (this.$route.params.id == undefined) this.$router.push('/')
      this.getData()
    }
  }
</script>
