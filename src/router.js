import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'template',
      component: () => import('./views/Template.vue'),
      children: [
        { path: '/', name: 'home', component: () => import('./components/Home.vue') },
        { path: '/confirm', name: 'confirm', component: () => import('./components/Confirm.vue'), 'props': true },
        { path: '/ujian', name: 'ujian', component: () => import('./components/Ujian.vue'), 'props': true },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: {
        auth: false
      }
    },
    {
      path: '/logout',
      name: 'logout'
    },
    {
      path: '*',
      name: '404',
      redirect: '/'
    },

  ]
})

router.beforeEach(async (to, from, next) => {
  const path = to.path
  const loggedIn = localStorage.getItem('token')

  if (to.meta.auth != false && !loggedIn) return next('/login')

  if (path === '/login') {
    if (loggedIn) {
      return next('/')
    }
  }

  if (path == '/logout') {
    store.commit('UPDATE_TOKEN', null)
    return next('/login')
  }

  next()
})

export default router