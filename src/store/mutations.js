/*=========================================================================================
  File Name: mutations.js
  Description: Vuex Store - mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Version: 1.1
  Author: Pixinvent
  Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/
const mutations = {
  UPDATE_TOKEN(state, val) {
    if (val) {
      localStorage.setItem('token', val)
      state.token = val
    } else {
      localStorage.removeItem('token')
      state.token = val
    }
  },
  ACTIVE_USER(state, val) {
    if (val) {
      localStorage.setItem('user', JSON.stringify(val))
      state.activeUser = val
    } else {
      localStorage.removeItem('user')
      state.activeUser = val
    }
  },
  SOAL_TEMP(state, val) {
    if (val) {
      localStorage.setItem('soal', JSON.stringify(val))
      state.soal = val
    } else {
      localStorage.removeItem('soal')
      state.soal = val
    }
  },
  ALERT(state, message) {
    state.msg = message
    if (message) state.isDialog = true
    else state.isDialog = false
  },
  UPDATE_JAWABAN(state, data) {
    var soal = state.soal
    soal[data.index]['jawaban'] = data.jawaban
    // Vue.set(state.soal, soal, data.index)
    this.commit('SOAL_TEMP', soal)
  },
  UPDATE_SOAL_KE(state, index) {
    state.soalIndex = index
  },
  UPDATE_UJIAN(state, val) {
    localStorage.setItem('ujian', JSON.stringify(val))
    state.ujian = val
  }
}

export default mutations
