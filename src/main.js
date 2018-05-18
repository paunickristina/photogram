import Vue from 'vue'
import App from './App.vue'

import router from './routes'
import axios from 'axios'
import store from './store/store.js'
import Vuelidate from 'vuelidate'

import 'vue-awesome/icons/envelope-o'
import 'vue-awesome/icons/lock'
import 'vue-awesome/icons/user-o'
import 'vue-awesome/icons/times'
import 'vue-awesome/icons/check'
import Icon from 'vue-awesome/components/Icon'

Vue.use(Vuelidate)
Vue.component('icon', Icon)

axios.defaults.baseURL = 'http://54.37.227.57/api'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
