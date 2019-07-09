<template>
  <v-container>
    <v-layout>
      <v-flex sm12>
        <v-data-table :loading="isLoadingData" :headers="headers" :items="rows" class="elevation-1">
          <template v-slot:items="props">
            <td>{{ i }}</td>
            <td class="">{{ props.item.nama_ujian }}</td>
            <td class="">{{ moment(props.item.tanggal_mulai) }} - {{ moment(props.item.tanggal_selesai) }}</td>
            <td>
              <v-chip v-if="props.item.status == 1" color="green" text-color="white">Aktif</v-chip>
              <v-chip v-else color="red" text-color="white">Tidak Aktif</v-chip>
            </td>
            <td>{{ props.item.score }}</td>
            <td>
              <v-btn @click="ujian(props.item.id)" v-bind:disabled="props.item.status == 0" outline color="primary">Ujian
                <v-icon right dark>input</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
        <br />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import * as api from '@/api'
  import moment from 'moment'

  export default {
    data: () => ({
      i: 1,
      headers: [
        {text: 'No', value: 'no'},
        {text: 'Nama Ujian', value: 'nama_ujian'},
        {text: 'Tanggal', value: 'tanggal'},
        {text: 'Status', value: 'status'},
        {text: 'Last Score', value: 'score'},
        {text: 'Aksi', value: 'aksi'},
      ],
      rows: [],
      user: {
        nama_lengkap: '',
        kelas: {
          nama_kelas: ''
        }
      },
      token: '',
      isLoadingUser: true,
      isLoadingData: true
    }),
    methods: {
      getData() {
        api.get('/ujian', {}, res => {
          if (res.status) {
            this.rows = res.data
            this.isLoadingData = false
          } else {
            this.$store.commit('ALERT', 'Terjadi kesalahan pada server')
          }
        })

        api.get('/user', {}, res => {
          if (res.status) {
            this.user = res.data
            this.isLoadingUser = false
            this.$store.commit('ACTIVE_USER', res.data)
          } else {
            this.$store.commit('ALERT', 'Terjadi kesalahan pada server')
          }
        })
      },
      moment(val) {
        return moment(val).format('DD MMM YYYY HH:m:ss')
      },
      ujian(id) {
        this.$router.push({'name': 'confirm', params: {'id': id}})
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>