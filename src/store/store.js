import Vue from 'vue';
import Vuex from 'vuex';
import homePage from './../components/HomePage.vue'
import * as firebase from 'firebase'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    mojaArray: ['jestemSobieArrayką'],
    currentKeyHolders: [
      {name: 'Paweł',
      surname: "Błasiak",
      keyHoldersNote: 'mam klucze do dwudziestej'},
      {name: 'Filip',
      surname: "Stojanow",
      keyHoldersNote: 'mam klucze do dwudziestej'}
    ],
    backBtnVisible: false,
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload;
    },
    updateCurrentKeyHolders (state, fetchedKeyHolders){
      state.currentKeyHolders = fetchedKeyHolders;
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
            email: user.email,
            name: payload.name,
            surname: payload.surname,
            hasKeys: false,
            keyHoldersNote: ""
          }
          commit('setUser', newUser)
          return newUser;
        }
      )
      .then(
        user => {
          // TODO: make it so that it shows UID in the tree node under usersDB in Firebase instead of some cryptic value
          firebase.database().ref(`/usersDB`).push(user);
          firebase.database().ref(`/activeUsers`).push(user.uid);
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
          console.log("moj payload:");
          console.log(payload);
          console.log("moj user");
          console.log(user);
          const newUser = {
            id: user.uid,
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
    getCurrentKeyHolders({commit}) {
      firebase.database().ref('/usersDB').once('value')
      .then( usersSnapshot => {
        // console.log("I found users in db and here they are:");
        // console.log(usersSnapshot.val());
        let users = usersSnapshot.val();
        var keyHolders = [];
        for (var nodeKey in users) {
          console.log("this is nodeKey");
          console.log(nodeKey);
          console.log(users[nodeKey]);
          if (users[nodeKey].hasKeys == true) {
            let keyHolder =
            {
              name: users[nodeKey].name,
              surname: users[nodeKey].surname,
              keyHoldersNote: users[nodeKey].keyHoldersNote
            };
            console.log("this is my key holder");
            console.log(keyHolder);
            keyHolders.push(keyHolder);
          }
        }
        commit("updateCurrentKeyHolders", keyHolders);
      })
    },
    checkIfLoggedUser({commit}){
      firebase.auth().onAuthStateChanged(function(activeUser) {
        if (activeUser) {
          // User is signed in.
          console.log("jestem tutaj ");
          firebase.database().ref("/usersDB")
          .once("value")
          .then( usersSnapshot=> {
            let user = usersSnapshot.val();
            for (var nodeKey in user) {
              if (user[nodeKey].id === activeUser.uid) {
                return commit('setUser', user[nodeKey]);

              }
            }
          })
          // commit('setUser')
        } else {
          // No user is signed in.
        }
      });
    }
  },
  getters: {
    isUserLogged(state) {
      if (state.user == null) {
        return false;
      }
      else {
        return true;
      }
    },
    isHavingKeys(state){
      if (state.user == null){
        return false;
      }
      else {
        if (state.user.hasKeys === true) {
          return true;
        }
        else {
          return false;
        }
      }
      // TRY THIS AS WELL :)
      // state.user.hasOwnProperty('')
    }
  }
})
