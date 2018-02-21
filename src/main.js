// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import {
  store
} from './store/store'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// NOTE: Create this file on your own, if pulling from github.
import fbConfig from './fbConfig'

Vue.config.productionTip = false


Vue.use(Vuetify)

/* eslint-disable no-new */
let app;

firebase.initializeApp(fbConfig)

firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      components: {
        App
      },
      template: '<App/>'
    })
  }
})

