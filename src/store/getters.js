/*=========================================================================================
  File Name: getters.js
  Description: Vuex Store - getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Version: 1.1
  Author: Pixinvent
  Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/


const getters = {
  token: state => state.token,
  activeUser: state => state.activeUser,
  soal: state => state.soal,
  ujian: state => state.ujian,
  isDialog: state => state.isDialog,
  msg: state => state.msg,
  soalKe: state => state.soalIndex
}

export default getters
