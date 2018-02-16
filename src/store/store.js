import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentKeyHolders: [{
        name: 'Paweł',
        surname: "Błasiak",
        keyHoldersNote: 'mam klucze do dwudziestej'
      },
      {
        name: 'Filip',
        surname: "Stojanow",
        keyHoldersNote: 'mam klucze do dwudziestej'
      }
    ],
    generalEventsDB: [],
    cubScoutsEventsDB: [],
    scoutsEventsDB: [],
    explorersEventsDB: [],
    roversEventsDB: [],
    loadingState: false,
    backBtnVisible: false,
    user: {
      // email: "admin123@admin.pl",
      // eventsEditable: [
      //   "-KxsV-YCZ5eHt4RzV4o1",
      //   "-Kxz8USdjSLNlXRcCChm"
      // ],
      // eventsUserParticipates: [
      //   "-KxsV-YCZ5eHt4RzV4o1",
      //   "-Kxz8USdjSLNlXRcCChm"
      // ],
      // hasKeys: false,
      // id: "Tma5ke5qyQOKmnpiQt0jI5KBo1F2",
      // keyHoldersNote: "",
      // name: "admin123",
      // surname: "admin123",
      // usersDbKey: "-KxoxVYECEBpX6Ssen2c",
    },
    isUserAGuest: false,
    explicitLoginState: false
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      state.isUserAGuest = false;
    },
    setGuestUser(state) {
      // state.user = null;
      state.isUserAGuest = true;
    },
    updateCurrentKeyHolders(state, fetchedKeyHolders) {
      state.currentKeyHolders = fetchedKeyHolders;
    },
    changeLoadingState(state, boolStatus) {
      state.loadingState = boolStatus;
    },
    changeKeyHoldingStateLocally(state, boolStatus) {
      // TODO: comment briefly the function
      if (boolStatus.boolean === false) {
        for (var i = 0; i < state.currentKeyHolders.length; i++) {
          if (state.user.name !== null && state.currentKeyHolders[i].name === state.user.name) {
            state.currentKeyHolders.splice(i, 1);
          }
        };
        if (state.user !== null && state.user.hasKeys !== undefined && state.user.keyHoldersNote !== undefined) {
          state.user.hasKeys = false;
          state.user.keyHoldersNote = boolStatus.message;
        } else {
          console.error("state doesn't have the right fields! ");
        }
      } else {
        if (state.user !== null && state.user.hasKeys !== undefined && state.user.keyHoldersNote !== undefined) {
          state.user.hasKeys = true;
          state.user.keyHoldersNote = boolStatus.message;
          const myobject = {
            name: state.user.name,
            surname: state.user.surname,
            keyHoldersNote: state.user.keyHoldersNote
          };
          state.currentKeyHolders.push(myobject);
          console.log("works fine locally in vuex store");
        } else {
          console.error("state doesn't have the right fields! ");
        }
      }
    },
    createNewEventLocally(state, payload) {
      let ourDesiredSectionDB = state[payload.sectionDBName];
      ourDesiredSectionDB.push(payload.theEvent);
    },
    updateEventLocally(state, payload) {
      let theSection = state[payload.sectionDBName];
      theSection.forEach((object) => {
        if (object.ID === payload.theEvent.ID) {
          object = payload.theEvent;
        }
      })
    },
    fetchEventsLocally(state, payload) {
      function storeData(vuexState, object) {
        vuexState = null; // do I need it ?
        console.log(object);
        if (object.length == 0) {
          return vuexState = null;
        } else {
          return object;
        }
      }
      switch (payload.index) {
        case 0:
          state.generalEventsDB = payload.myObject;
          // storeData (state.generalEventsDB, payload.myObject);
          break;
        case 1:
          state.cubScoutsEventsDB = payload.myObject;
          // storeData (state.cubScoutsEventsDB, payload.myObject);
          break;
        case 2:
          state.scoutsEventsDB = payload.myObject;
          // storeData (state.scoutsEventsDB, payload.myObject);
          break;
        case 3:
          state.explorersEventsDB = payload.myObject;
          // storeData (state.explorersEventsDB, payload.myObject);
          break;
        case 4:
          state.roversEventsDB = payload.myObject;
          // storeData (state.roversEventsDB, payload.myObject);
          break;
        default:
          console.log("there was an error storing Event locally");
      }
    },
    assignEventToUser(state, eventID) {
      if (state.user.eventsEditable) {
        state.user.eventsEditable.push(eventID);
      } else {
        state.user = {
          ...state.user,
          eventsEditable: [eventID]
        }
      }
      console.log("lets check if spread op. worked: ", state.user);
    },
    setUserAsAttendingTheEvent(state, eventID) {
      if (state.user.eventsUserParticipates) {
        state.user.eventsUserParticipates.push(eventID);
      } else {
        state.user = {
          ...state.user,
          eventsUserParticipates: [eventID]
        }
      }
    },
    addEventUserParticipatesLocally(state, theEvent) {
      if (!state.user.eventsUserParticipates) {
        state.user['eventsUserParticipates'] = [];
      }
      state.user.eventsUserParticipates.push(theEvent.ID);
    },
    deleteEventUserParticipatesLocally(state, theEvent) {
      if (!state.user.eventsUserParticipates) {
        return;
      } else {
        for (var i = 0; i < state.user.eventsUserParticipates.length; i++) {
          if (state.user.eventsUserParticipates[i] === theEvent.ID) {
            state.user.eventsUserParticipates.splice(i, 1);
          }
        }
      }
    },
    signOutUserLocally(state) {
      state.user = null;
    },
    booleanLoginState(state, payload) {
      console.log("my payload", payload);
      state.explicitLoginState = payload;
      console.log("state ", state.explicitLoginState);
    }
  },
  actions: {
    SignUpUser({
      commit
    }, payload) {
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
            };
            commit('setUser', newUser);
            return newUser;
          }
        )
        .then(
          user => {
            // TODO: make it so that it shows UID in the tree node under usersDB in Firebase instead of some cryptic value
            var newUserKey = firebase.database().ref('usersDB').push().key;
            // TODO: check if that works ! If not, return to push(user) instead of update
            const newFullUser = {
              id: user.id,
              email: user.email,
              isInNZ: false,
              isInNH: false,
              isInNSTH: false,
              isInNW: false,
              name: payload.name,
              surname: payload.surname,
              hasKeys: false,
              keyHoldersNote: "",
              usersDbKey: newUserKey,
            };
            var updates = {};
            updates["usersDB/" + newUserKey] = newFullUser;
            firebase.database().ref().update(updates);

            commit('setUser', newFullUser);
          }
        )
        .catch(
          error => {
            console.log(error);
          }
        )
    },
    SignInUser({
      commit,
      state
    }, payload) {
      commit('changeLoadingState', true);
      return firebase.auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
            }
            commit('setUser', newUser);
            commit('changeLoadingState', false);
            return true;
          }
        )
        .catch(
          error => {
            console.log(error);
            commit('changeLoadingState', false);
            return false;
          }
        )
    },
    checkIfLoggedUser({
      commit,
      dispatch
    }, anotherAction) {
      commit('changeLoadingState', true);
      firebase.auth().onAuthStateChanged(function (activeUser) {
        if (activeUser) {
          // User is signed in.
          getTheUser(activeUser.uid).then(
            (theUser) => {
              commit('setUser', theUser);

            })

          if (anotherAction === '' || anotherAction === null) {
            commit('changeLoadingState', false);
            return;
          } else if (anotherAction === "getCurrentKeyHolders") {
            store.dispatch("getCurrentKeyHolders");
          } else if (anotherAction === "fetchCurrentEvents") {
            for (var i = 0; i < 5; i++) {
              store.dispatch('fetchCurrentEvents', i);
            }
          } else {
            store.dispatch(anotherAction);
            commit('changeLoadingState', false);
          }
        } else {
          // No user is signed in.
          commit('setGuestUser');
          return false;
        }
      });
    },
    getCurrentKeyHolders({
      commit
    }) {
      firebase.database().ref('/usersDB').once('value')
        .then(usersSnapshot => {
          // console.log("I found users in db and here they are:");
          // console.log(usersSnapshot.val());
          let users = usersSnapshot.val();
          var keyHolders = [];
          for (var nodeKey in users) {
            console.log("this is nodeKey");
            console.log(nodeKey);
            console.log(users[nodeKey]);
            if (users[nodeKey].hasKeys == true) {
              let keyHolder = {
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
          commit('changeLoadingState', false);
        })
    },
    changeKeyHoldingState({
      commit,
      state
    }, boolStatus) {
      commit('changeKeyHoldingStateLocally', boolStatus);
      firebase.database().
      ref("/usersDB/" + state.user.usersDbKey).once('value')
        .then(node => {
          let usersObj = node.val();
          if (boolStatus.boolean === false) {
            usersObj.hasKeys = false;
            usersObj.keyHoldersNote = '----';
          } else {
            usersObj.hasKeys = true;
            usersObj.keyHoldersNote = boolStatus.message;
          }
          firebase.database().ref("/usersDB/" + state.user.usersDbKey).update(usersObj);
        })
    },
    uploadNewEventToFB({
      commit,
      state
    }, theEvent) {
      var sectionDBName;
      switch (theEvent.organizer) {
        case "Wydarzenia ogólne":
          sectionDBName = 'generalEventsDB'
          break;
        case "Nam. zuchowe":
          sectionDBName = 'cubScoutsEventsDB'
          break;
        case "Nam. harcerskie":
          sectionDBName = 'scoutsEventsDB'
          break;
        case "Nam. starszoharcerskie":
          sectionDBName = 'explorersEventsDB'
          break;
        case "Nam. wędrownicze":
          sectionDBName = 'roversEventsDB'
          break;
        default:
          sectionDBName = 'generalEventsDB'
      }
      var newKey = firebase.database().ref(sectionDBName).push().key;
      theEvent['ID'] = newKey;
      theEvent['IDOfWhoCreatedEvent'] = state.user.id;
      theEvent['nameOfWhoCreatedEvent'] = `${state.user.name}_${state.user.surname}`;

      commit('createNewEventLocally', {
        theEvent,
        sectionDBName
      });

      // --------------------------------------
      // SECTION WHERE we assign newly-created event to the user in db (make a quasi-relation)
      commit('assignEventToUser', theEvent.ID);
      // IDEA: THIS IS A NEW APPROACH: if we don't do the below, we can show separately the events user is an editor in the eventsUserParticipates.vue with less hassle.
      // commit('setUserAsAttendingTheEvent', theEvent.ID);
      // ---------------------------------------
      var pushEvent = {};
      pushEvent[`${sectionDBName}/${newKey}`] = theEvent;
      pushEvent[`usersDB/${state.user.usersDbKey}`] = state.user;
      firebase.database().ref().update(pushEvent);
    },
    updateEventOnFB({
      commit,
      state
    }, theEvent) {
      var sectionDBName;
      switch (theEvent.organizer) {
        case "Wydarzenia ogólne":
          sectionDBName = 'generalEventsDB'
          break;
        case "Nam. zuchowe":
          sectionDBName = 'cubScoutsEventsDB'
          break;
        case "Nam. harcerskie":
          sectionDBName = 'scoutsEventsDB'
          break;
        case "Nam. starszoharcerskie":
          sectionDBName = 'explorersEventsDB'
          break;
        case "Nam. wędrownicze":
          sectionDBName = 'roversEventsDB'
          break;
        default:
          sectionDBName = 'generalEventsDB'
      }
      commit('updateEventLocally', {
        theEvent,
        sectionDBName
      });
      firebase.database().ref(`${sectionDBName}/${theEvent.ID}`).set(theEvent);
    },
    fetchCurrentEvents({
      commit
    }, index) {
      var nodeName = null;
      switch (index) {
        case 0:
          nodeName = 'generalEventsDB';
          break;
        case 1:
          nodeName = 'cubScoutsEventsDB';
          break;
        case 2:
          nodeName = 'scoutsEventsDB';
          break;
        case 3:
          nodeName = 'explorersEventsDB';
          break;
        case 4:
          nodeName = 'roversEventsDB';
          break;
        default:
          nodeName = 'generalEventsDB';
      }
      firebase.database().ref(nodeName).once('value')
        .then((snap) => {
          let allPosts = snap.val();
          let myObject = []
          for (var post in allPosts) {
            myObject.push(allPosts[post]);
          }
          commit('fetchEventsLocally', {
            myObject,
            index
          });
          // IDEA: once we stop fetching data (which is on the 4th index coz that's the last, roversEventsDB, we can change the loading state to false  )
          if (index == 4) {
            commit('changeLoadingState', false);
          }
        })
    },
    fetchIndividualEvent(eventID) {
      // TODO: fetch the ind. event from FB if user lands on "eventDetails" page with an empty vuex store (basically, when user refreshed page)
    },
    deleteEventUserParticipates({
      commit,
      state
    }, theEvent) {
      commit('deleteEventUserParticipatesLocally', theEvent);
      if (state.user.usersDbKey) {
        firebase.database().ref(`/usersDB/${state.user.usersDbKey}/eventsUserParticipates`).once('value').then((snap) => {
          let allIDs = snap.val();
          console.log("AllIDs", allIDs);
          for (var i = 0; i < allIDs.length; i++) {
            if (allIDs[i] == theEvent.ID) {
              allIDs.splice(i, 1);
            }
          }
          firebase.database().ref(`/usersDB/${state.user.usersDbKey}/eventsUserParticipates`).set(allIDs);
        })
      } else {
        console.log("Something went wrong, try again");
      }
    },
    addEventUserParticipates({
      commit,
      state
    }, theEvent) {
      commit('addEventUserParticipatesLocally', theEvent);
      if (state.user.usersDbKey) {
        firebase.database().ref(`/usersDB/${state.user.usersDbKey}/eventsUserParticipates`).once('value').then((snap) => {
          let allIDs = snap.val();
          if (allIDs === null) {
            allIDs = [];
          }
          allIDs.push(theEvent.ID);
          firebase.database().ref(`/usersDB/${state.user.usersDbKey}/eventsUserParticipates`).set(allIDs);
        })
      } else {
        console.log("Something went wrong, try again");
      }
    },
    signOutUser({
      commit
    }) {
      commit('signOutUserLocally');
      firebase.auth().signOut().then(function () {
        // Sign-out successful.
      }).catch(function (error) {
        // An error happened.
      });
    },
    booleanLoginState({
      commit
    }) {
      // let user = firebase.auth().currentUser;
      firebase.auth().onAuthStateChanged(
        function (user) {
          if (user) {
            commit('booleanLoginState', true);
          } else {
            commit('booleanLoginState', false);
          }
        })
    },
    emailDCS({
      commit,
      dispatch,
      state
    }, email) {
      if (!state.user.email){
        firebase.auth().onAuthStateChanged(function (activeUser) {
          if (activeUser) {
            // User is signed in.
            getTheUser(activeUser.uid).then(
              (theUser) => {
                commit('setUser', theUser);
                sendEmail();
              })
            }
        });
      } else{
        sendEmail();
      }

      function sendEmail(){
        return axios.post('https://us-central1-lokalnik-app.cloudfunctions.net/sendMailToDCS', {
          sendersName: state.user.name,
          sendersSurname: state.user.surname,
          sendersEmail: state.user.email,
          appointImportancy: email.appointmentImportancy,
          appointTime: email.appointmentTime, appointDate: email.appointmentDate,
          appointDuration: email.appointmentDuration,
          appointMessage: email.appointmentMessage
        }).then((execStatus)=>{
          console.log("the exec status:");
          console.log(execStatus);
          if (execStatus.status == 200 && execStatus.data.didItWork) {
            axios.post('https://us-central1-lokalnik-app.cloudfunctions.net/sendConfirmationMail', {
            sendersName: state.user.name,
            sendersEmail: state.user.email,
            message: execStatus.data.message
            })
          }
          return execStatus.data.didItWork;           
        }).catch((err)=> {
          console.log("there was an error");
          console.log(err);
          return false;
        })
      }
    }
  },
  getters: {
    isUserLogged(state) {
      if (state.user === null) {
        console.log("zwracam fałsz");
        return false;
      } else {
        console.log("zwracam prawdę");
        return true;
      }
    },
    isHavingKeys(state) {
      if (state.user == null) {
        return false;
      } else {
        if (state.user.hasKeys === true) {
          return true;
        } else {
          return false;
        }
      }
      // TRY THIS AS WELL :)
      // state.user.hasOwnProperty('')
    },
    filterEventsUserParticipates(state) {
      if (state.user === null){
        return;
      }
      let filteredEvents = [];

      function filterEvents(sectionDB) {
        sectionDB.forEach((obj) => {
          state.user.eventsUserParticipates.forEach((id) => {
            if (obj.ID === id) {
              filteredEvents.push(obj);
            }
          })
        })
      }
      if (state.user.eventsUserParticipates) {
        filterEvents(state.generalEventsDB);
        filterEvents(state.cubScoutsEventsDB);
        filterEvents(state.scoutsEventsDB);
        filterEvents(state.explorersEventsDB);
        filterEvents(state.roversEventsDB);
      }
      console.log("these are all events user participates:", filteredEvents);
      return filteredEvents;
    },
    filterEventsUserIsAnEditor(state) {
      if (state.user === null) {
        return;
      }
      var filteredEditableEvents = [];

      function filterEvents(sectionDB) {
        sectionDB.forEach((obj) => {
          state.user.eventsEditable.forEach((id) => {
            if (obj.ID === id) {
              filteredEditableEvents.push(obj);
            }
          })
        })
      }
      if (state.user.eventsEditable) {
        filterEvents(state.generalEventsDB);
        filterEvents(state.cubScoutsEventsDB);
        filterEvents(state.scoutsEventsDB);
        filterEvents(state.explorersEventsDB);
        filterEvents(state.roversEventsDB);
      }
      console.log("these are all editable events:", filteredEditableEvents);
      return filteredEditableEvents;
    },
    decideWhetherToPromptForLoginFAB(state) {
      // var user = firebase.auth().currentUser;
      // console.log("moj user:", user);
      // if (user) {
      //   return true;
      // }
      // else {
      //   console.log("fałsz!");
      //   return false;
      // }
    }
  }
})

// HELPER FUNCTION
function getTheUser(userID) {
  return firebase.database().ref("usersDB").once('value')
    .then(allUsSnapshot => {
      let allUsers = allUsSnapshot.val();
      for (var nodeKey in allUsers) {
        if (allUsers[nodeKey].id === userID) {
          return allUsers[nodeKey];
        }
      }
    })
}
