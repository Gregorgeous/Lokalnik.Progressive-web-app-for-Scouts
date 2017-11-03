// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueRouter from 'vue-router'
import App from './App'
import * as firebase from 'firebase'
import {store} from './store/store'
import router from './router'

Vue.config.productionTip = false


Vue.use(Vuetify)
Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  store: store,
  router,
  el: '#app',
  render:h => h(App),
  created() {
    //do something after creating vue instance
    firebase.initializeApp({
    apiKey: "AIzaSyALvp9YWh-VIIWlxB2w37QYtsl4vfoKlnk",
    authDomain: "lokalnik-app.firebaseapp.com",
    databaseURL: "https://lokalnik-app.firebaseio.com",
    projectId: "lokalnik-app",
    storageBucket: "lokalnik-app.appspot.com"
    })
  }
  // template: '<App/>',
  // components: { App }
})
