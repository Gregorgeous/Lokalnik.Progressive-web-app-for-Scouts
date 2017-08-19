import Vue from 'vue';
import Vuex from 'vuex';
import homePage from './../components/HomePage.vue'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    mojaArray: ['jestemSobieArrayką'],
    pageStack: [homePage],
    currentKeyHolders: [
      {'name': 'Paweł', 'surname': "Błasiak"},
      {'name': 'Filip', 'surname': "Stojanow"}
    ],
    backBtnVisible: false
  }
})
