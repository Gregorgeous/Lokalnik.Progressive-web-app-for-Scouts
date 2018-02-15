// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import {store} from './store/store'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false


Vue.use(Vuetify)

/* eslint-disable no-new */
let app;

firebase.initializeApp({
apiKey: "AIzaSyALvp9YWh-VIIWlxB2w37QYtsl4vfoKlnk",
authDomain: "lokalnik-app.firebaseapp.com",
databaseURL: "https://lokalnik-app.firebaseio.com",
projectId: "lokalnik-app",
storageBucket: "lokalnik-app.appspot.com"
})

firebase.auth().onAuthStateChanged(function(user){
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    })
  }
})
