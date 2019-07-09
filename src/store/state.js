/*=========================================================================================
  File Name: state.js
  Description: Vuex Store - state
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Version: 1.1
  Author: Pixinvent
  Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/

const state = {
  token: localStorage.getItem('token'),
  activeUser: JSON.parse(localStorage.getItem('user')) || {},
  soal: JSON.parse(localStorage.getItem('soal')) || {},
  ujian: localStorage.getItem('ujian'),
  isDialog: false,
  msg: '',
  soalIndex: 0
}

export default state
