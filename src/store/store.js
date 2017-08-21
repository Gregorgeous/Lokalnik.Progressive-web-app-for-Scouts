import Vue from 'vue';
import Vuex from 'vuex';
import homePage from './../components/HomePage.vue'
import * as firebase from 'firebase'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    mojaArray: ['jestemSobieArrayką'],
    pageStack: [homePage],
    currentKeyHolders: [
      {'name': 'Paweł', 'surname': "Błasiak"},
      {'name': 'Filip', 'surname': "Stojanow"}
    ],
    backBtnVisible: false,
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload;
    }
  },
  actions: {
    SignUpUser ({commit}, payload) {
      firebase.auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.uid,
            name: payload.name,
            surname: payload.surname
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      )
    },
    SignInUser ({commit}, payload) {
      firebase.auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.uid,
            name: payload.name,
            surname: payload.surname
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      )
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  }
})
