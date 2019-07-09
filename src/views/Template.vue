<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
              fixed
              v-model="drawer"
              app
      >
        <v-list dense>
          <v-list-tile @click="$router.push('/')">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="$router.push('/logout')">
            <v-list-tile-action>
              <v-icon>contact_mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-layout row wrap style="position: absolute; bottom: 10px" v-if="isUjian">
          <v-flex>
            <v-btn @click="updateSoalKe(index)" v-for="(item, index) in listSoal" :key="index" style="min-width: 40px;" v-bind:color="color(item, index)">{{ (index+1) }}</v-btn>
          </v-flex>
        </v-layout>
      </v-navigation-drawer>
      <v-toolbar color="indigo" dark fixed app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>UjianApp</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <router-view></router-view>
      </v-content>

      <v-snackbar
              v-model="isDialog"
              :bottom="y === 'bottom'"
              :left="x === 'left'"
              :multi-line="mode === 'multi-line'"
              :right="x === 'right'"
              :timeout="timeout"
              :top="y === 'top'"
              :vertical="mode === 'vertical'"
      >
        {{ msg }}
        <v-btn
                color="pink"
                flat
                @click="$store.commit('ALERT', null)"
        >
          Close
        </v-btn>
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data: () => ({
      drawer: false,
      y: 'top',
      x: 'right',
      mode: '',
      timeout: 6000,
    }),
    computed: {
      ...mapGetters({
        isDialog: 'isDialog',
        msg: 'msg',
        listSoal: 'soal',
        soalKe: 'soalKe',
      }),
      isUjian: function() {
        return this.$route.name == 'ujian'
      }
    },
    methods: {
      color: function (obj, index) {
        if (index == this.soalKe) return 'info'
        if (obj.jawaban != undefined) return 'success'
        return ''
      },
      updateSoalKe(index) {
        this.$store.commit('UPDATE_SOAL_KE', index)
      }
    }
  }
</script>
