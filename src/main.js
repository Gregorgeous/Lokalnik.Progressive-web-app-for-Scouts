// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ('./../node_modules/vuetify/dist/vuetify.min.css')

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import {store} from './store/store'
import Vuetify from 'vuetify'
import router from './router'


Vue.config.productionTip = false


Vue.use(Vuetify)
Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  store: store,
  router,
  el: '#app',
  render:h => h(App)
  // template: '<App/>',
  // components: { App }
})
