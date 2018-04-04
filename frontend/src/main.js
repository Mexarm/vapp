// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import { store } from './store/store'
// import VueResource from 'vue-resource'

import AppAlert from './components/core/AppAlert'

import axios from 'axios'
import Vuelidate from 'vuelidate'
import VueI18n from 'vue-i18n'
import { messages } from './i18n-messages'

// axios.defaults.baseURL = 'http://'
// axios.defaults.headers.common['something'] = 'xxxxxx'
// axios.defaults.headers.get['something'] = 'xxxxxxx'

axios.interceptors.request.use(config => {
  console.log('request interceptor:', config)
  const token = localStorage.getItem('token')
  if (token !== null) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

axios.interceptors.response.use(undefined, err => {
  console.log('response error:', err.response)
  return Promise.reject(err)
})

/*
axios.interceptors.response.use(undefined, err => {
  let res = err.response;
  if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
    return new Promise((resolve, reject) => {
      refreshLogin(getRefreshToken(),
        success => {
          setTokens(success.access_token, success.refresh_token)
          err.config.__isRetryRequest = true
          err.config.headers.Authorization = 'Bearer ' + getAccessToken()
          resolve(axios(err.config))
        },
        error => {
          console.log('Refresh login error: ', error)
          reject(error)
        }
      )
    });
  }
})

 */
Vue.use(Vuetify)
Vue.use(Vuelidate)
Vue.use(VueI18n)
/* {{ $t("message.greeting") }} */

Vue.component('app-alert', AppAlert)

Vue.config.productionTip = false

export const i18n = new VueI18n({
  locale: 'es', // set locale
  fallbackLocale: 'es',
  messages // set locale messages
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
  i18n,
  created() {
    this.$store.dispatch('checkAuth')
  }
})
