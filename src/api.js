import axios from 'axios'
import router from './router'
import store from './store/store'
import qs from 'qs'


const api = axios.create({
  baseURL: 'http://192.168.11.111/ujian-admin/public/api',
  timeout: 60000,
})

const headers = () => {
  return {
    'Cache-Control': 'no-cache',
    'Authorization': 'Bearer ' + store.state.token
  }
}

export const get = (url, params = {}, callback) => {
  api.get(url, {params: params, headers: headers()}).then(res => {
    callback({
      status: true,
      data: res.data.data
    })
  }).catch(err => {
    if (err.response) {
      if (err.response.status == 401) {
        store.commit('UPDATE_TOKEN', null)
        router.push('/login')
      }
      callback({
        status: false,
        message: err.response.data.error,
        data: err.response.data.data,
      })
    } else {
      callback({
        status: false,
        message: 'Connection Timed Out'
      })
    }
  })
}

export const post = async (url, body, callback) => {
  await api.post(url, qs.stringify(body), {headers: headers()}).then(res => {
    callback(res)
    return 0
  }).catch(err => {
    if (err.response && err.response.status && err.response.status == 401) {
      store.commit('UPDATE_TOKEN', null)
      router.push('/login')
    } else if (err.response) {
      callback({
        status: false,
        message: err.response.data.error || 'Whoops!',
        data: err.response.data.data,
      })
      return 0
    }
  })
}
