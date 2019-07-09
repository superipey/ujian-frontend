/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Version: 1.1
  Author: Pixinvent
  Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import getters from "./getters"
import state from "./state"
import mutations from "./mutations"

export default new Vuex.Store({
	getters,
	state,
	mutations,
	strict: false
})
