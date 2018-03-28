// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import { store } from './store/store'
import VueResource from 'vue-resource'

import AppAlert from './components/core/AppAlert'

import axios from 'axios'

// axios.defaults.baseURL = 'http://'
// axios.defaults.headers.common['something'] = 'xxxxxx'
// axios.defaults.headers.get['something'] = 'xxxxxxx'

axios.interceptors.request.use(config => {
  console.log('request interceptor:', config)
  return config
})

axios.interceptors.response.use(res => {
  console.log('response interceptors:', res)
  return res
})

Vue.use(Vuetify)
Vue.use(VueResource)

Vue.component('app-alert', AppAlert)

Vue.config.productionTip = false

Vue.http.interceptors.push(function (request) {
  // modify headers
  if (store.getters.userIsAuthenticated) {
    request.headers.set('Authorization', 'Bearer ' + this.$store.getters.getAuthHeader)
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
  created() {
    this.$store.dispatch('checkAuth')
  }
})
