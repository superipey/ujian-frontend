<template>
  <v-layout row pb-2>
    <v-flex sm8 offset-sm2>
      <v-card class="card--flex-toolbar" v-if="!isSelesai">
        <v-toolbar card prominent color="primary">
          <v-toolbar-title class="body-2 white--text">Soal No-{{ soalIndex+1 }}</v-toolbar-title>
          <v-layout align-center justify-end>
            <v-btn dark v-if="soalIndex != 0" flat icon color="white" @click="prev()">
              <v-icon dark>arrow_left</v-icon>
            </v-btn>
            <v-btn v-if="soalIndex != listSoal.length -1" flat icon color="white" @click="next()">
              <v-icon dark>arrow_right</v-icon>
            </v-btn>
            <v-btn v-else color="success" @click="selesai()">Selesai</v-btn>
          </v-layout>
        </v-toolbar>

        <v-divider></v-divider>

        <v-card-text class="mb-0 pb-0" v-if="!isLoading">
          <div v-html="listSoal[soalIndex].pertanyaan"></div>
          <v-radio-group v-model="jawaban[soalIndex]" :mandatory="false">
            <v-radio value="a">
              <template v-slot:label>
                <div v-html="'A. ' + listSoal[soalIndex].jawaban_a"></div>
              </template>
            </v-radio>

            <v-radio value="b">
              <template v-slot:label>
                <div v-html="'B. ' + listSoal[soalIndex].jawaban_b"></div>
              </template>
            </v-radio>

            <v-radio value="c">
              <template v-slot:label>
                <div v-html="'C. ' + listSoal[soalIndex].jawaban_c"></div>
              </template>
            </v-radio>

            <v-radio value="d">
              <template v-slot:label>
                <div v-html="'D. ' + listSoal[soalIndex].jawaban_d"></div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-card-text>
      </v-card>

      <v-card class="card--flex-toolbar" v-else-if="isSelesai && !showScore">
        <v-toolbar card prominent color="warning">
          <v-toolbar-title class="body-2 white--text">Konfirmasi</v-toolbar-title>
        </v-toolbar>

        <v-divider></v-divider>

        <v-card-text class="mb-0 pb-0">
          <p>Apakah anda sudah yakin akan menyelesaikan ujian ini?</p>
          <p>Mohon diperiksa kembali hasil jawaban anda sampai benar-benar yakin untuk menyelesaikan ujian ini.</p>
        </v-card-text>
        <v-card-actions class="pt-0 mt-0">
          <v-layout align-center justify-end pb-3 pr-3>
            <v-btn color="error" @click="isSelesai = false">Tidak</v-btn>
            <v-btn color="success" @click="kirim()" v-bind:loading="isLoadingSend" v-bind:disabled="isLoadingSend">Ya</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>

      <v-card class="card--flex-toolbar" v-else-if="isSelesai && showScore">
        <v-toolbar card prominent color="info">
          <v-toolbar-title class="body-2 white--text">Selesai</v-toolbar-title>
        </v-toolbar>

        <v-divider></v-divider>

        <v-card-text class="mb-0 pb-0">
          <p class="mb-2"><strong>NIM</strong><br /><span v-html="user.nim"></span></p>
          <v-divider class="mb-2"></v-divider>

          <p class="mb-2"><strong>Nama Lengkap</strong><br /><span v-html="user.nama_lengkap"></span></p>

          <v-divider class="mb-2"></v-divider>

          <p class="mb-2"><strong>Kelas</strong><br /><span v-html="user.kelas.nama_kelas"></span></p>
          <v-divider class="mb-2"></v-divider>

          <p class="mb-2"><strong>Nama Ujian</strong><br /><span v-html="ujian.nama_ujian"></span></p>
          <v-divider class="mb-2"></v-divider>

          <p class="mb-2"><strong>Jumlah Soal</strong><br /><span v-html="ujian.jumlah_soal"></span></p>
          <v-divider class="mb-2"></v-divider>

          <p class="mb-2"><strong>Benar</strong><br /><span v-html="score.benar"></span></p>
          <v-divider class="mb-2"></v-divider>

          <p class="mb-2"><strong>Salah</strong><br /><span v-html="score.salah"></span></p>
          <v-divider class="mb-2"></v-divider>

          <p class="mb-2 display-1"><strong>Score</strong><br /><span v-html="score.score"></span></p>
          <v-divider class="mb-4"></v-divider>
        </v-card-text>
        <v-card-actions class="pt-0 mt-0">
          <v-layout align-center justify-end pb-3 pr-3>
            <v-btn color="info" dark @click="$router.push('/')">Kembali ke Home</v-btn>
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
      soal: {},
      jawaban: [],
      isLoading: true,
      isLoadingSend: false,
      isSelesai: false,
      showScore: false,
      score: {},
      focus: true,
    }),
    watch: {
      jawaban: {
        deep: true,
        handler: function (val) {
          this.$store.commit('UPDATE_JAWABAN', {'index': this.soalIndex, 'jawaban': val[this.soalIndex]})
        }
      }
    },
    computed: {
      ...mapGetters({
        user: 'activeUser',
        listSoal: 'soal',
        soalIndex: 'soalKe',
        ujian: 'ujian'
      }),
    },
    methods: {
      moment(val) {
        return moment(val).format('DD MMM YYYY HH:m:ss')
      },
      prev() {
        if (this.soalIndex != 0) this.$store.commit('UPDATE_SOAL_KE', this.soalIndex - 1)
      },
      next() {
        if (this.soalIndex != this.listSoal.length - 1) this.$store.commit('UPDATE_SOAL_KE', this.soalIndex + 1)
      },
      leaving: function () {
        alert('Weoi')
      },
      selesai() {
        for (let i = 0; i < this.listSoal.length; i++) {
          if (this.listSoal[i].jawaban == undefined) {
            this.$store.commit('ALERT', 'Mohon untuk menjawab semua pertanyaan')
            return;
          }
        }

        this.isSelesai = true
      },
      kirim() {
        this.isLoadingSend = true
        let dataToSend = []
        this.listSoal.map(res => {
          dataToSend.push({
            'id': res.id,
            'jawaban': res.jawaban,
            'token': res.token,
          })
        })
        api.post('/ujian/submit/' + this.$store.state.ujian.id, { 'answer': dataToSend }, res => {
          if (res.status) {
            this.$store.commit('SOAL_TEMP', null)
            this.$store.commit('UPDATE_SOAL_KE', 0)
            this.score = res.data
            this.showScore = true
          } else {
            this.$store.commit('ALERT', 'Gagal mengirim data, silakan coba kembali.')
          }
          this.isLoadingSend = false
        })
      }
    },
    mounted() {
      let count = this.listSoal.length
      for (let i = 0; i < count; i++) {
        this.jawaban[i] = this.listSoal[i].jawaban
      }
      this.isLoading = false
    },
    created: function () {
      setInterval(function () {
        var focus = document.hasFocus();
        if (!focus) this.focus = false
      }, 1000)
    }
  }
</script>
