<template id="userProfile">
  <div class="mainContainer">
    <v-container class="pt-1">
      <v-layout justify-center>
        <v-flex>
          <v-card>
            <v-card-media height='200' contain src="./static/harcerzposzukiwanie.jpg">
            </v-card-media>
            <v-divider></v-divider>
            <v-card-title primary-title class="display-1 text-xs-center">
              Twój profil
            </v-card-title>
            <v-card-text class="pt-0">
              <v-layout row wrap justify-center>
                <v-flex xs5 class="dashboardBox">
                  <p class="dashboardBox__header text-xs-center">Wydarzenia w których bierzesz udział</p>
                  <div class="dashboardBox__hero">
                    <div v-if="initialFetchOfUserData">
                      <v-progress-circular class="amber--text" indeterminate size="40"></v-progress-circular>
                    </div>
                    <div v-else>
                      <h1 class="display-3">
                        {{compEventsUserParticipates}}
                      </h1>
                    </div>
                  </div>
                </v-flex>
                <v-flex xs5 class="dashboardBox">
                  <p class="dashboardBox__header text-xs-center">Wydarzenia które prowadzisz</p>
                  <div class="dashboardBox__hero">
                    <div v-if="initialFetchOfUserData">
                      <v-progress-circular class="amber--text" indeterminate size="40"></v-progress-circular>
                    </div>
                    <div v-else>
                      <h1 class="display-3">
                        {{compEventsUserIsAdmin}}
                      </h1>
                    </div>
                  </div>
                </v-flex>
                <v-flex xs5 class="dashboardBox">
                  <p class="dashboardBox__header text-xs-center">status kluczy:</p>
                  <div class="dashboardBox__hero">
                    <div v-if="initialFetchOfUserData">
                      <v-progress-circular class="amber--text" indeterminate size="40"></v-progress-circular>
                    </div>
                    <div v-else>
                      <h1 class="display-3">
                        {{compUserHasKeysStatus}}
                      </h1>
                    </div>
                  </div>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <h1 class="text-xs-center">Ustawienia</h1>
              <v-btn block @click="startPasswordResetProcedure">Zmień hasło</v-btn>
              <!-- CONDITIONAL RENDERING -->
              <div v-if="userReLogged">
                <v-layout wrap justify-center transition="scale-transition">
                  <v-flex xs12>
                    <v-text-field name="newPassword" label="Nowe hasło" type="password" id="newPassword" v-model="newPassword"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field name="newPasswordAgain" label="Wpisz nowe hasło ponownie" id="newPasswordAgain" type="password" v-model="newPasswordAgain"></v-text-field>
                  </v-flex>
                  <v-btn round @click="resetUsersPassword" class="info">Zmień hasło!</v-btn>
                </v-layout>
                <v-layout class="mb-5">
                  <v-alert warning transition="scale-transition" :value="errorInForm" class="text-xs-center">
                    {{errorMessage}}
                  </v-alert>
                  <v-flex v-if="isLoading" transition="scale-transition" class="text-xs-center">
                    <v-progress-circular class="amber--text" indeterminate size="40"></v-progress-circular>
                  </v-flex>
                </v-layout>

              </div>

              <!-- ////////////////////////// -->
              <v-btn block @click.stop="startUsersAccountDeletionProcedure" class="error">Usuń konto</v-btn>
            </v-card-text>
          </v-card>

        </v-flex>
      </v-layout>
    </v-container>

    <!-- =========================== -->
    <!-- DIALOG -->
    <v-dialog v-model="reLoginDialog" persistent max-width="500px">
      <v-card>
        <form @submit.prevent='reSignInUser'>

          <v-card-title>
            <span class="headline">Najpierw musisz się ponownie zalogować!</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field name="Email" label="Email" id="Email" v-model="email"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field name="Hasło" label="Hasło" id="Hasło" type="password" v-model="password"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="abortReLoggingIn">Anuluj</v-btn>
            <v-btn color="blue darken-1" type='submit' flat>Zaloguj się</v-btn>
          </v-card-actions>
          <v-layout v-if="isLoading" transition="scale-transition" row>
            <v-flex class="text-xs-center">
              <v-progress-circular class="amber--text" indeterminate size="40"></v-progress-circular>
            </v-flex>
          </v-layout>
          <v-alert warning transition="scale-transition" :value="errorInForm" class="text-xs-center">
            {{errorMessage}}
          </v-alert>
        </form>
      </v-card>
    </v-dialog>

    <v-snackbar top vertical v-model='passwordChangedSnackBarVisibility'>
      Zmiana hasła przebiegła pomyślnie!
      <v-btn flat class='amber--text' @click="passwordChangedSnackBarVisibility = false">Zamknij wiadomość</v-btn>
    </v-snackbar>

    <v-dialog v-model="userAccountDeletionDialog" max-width="500">
      <v-card class="">
        <v-card-title class="headline">ZONK!</v-card-title>
        <v-card-text>Aplikacja w fazie testów: na razie jeśli chcesz usunąć konto, musisz napisać w tej sprawie do g.r.fisher.pl@gmail.com
          :^) </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="userAccountDeletionDialog = false"> Eh, co za trol!</v-btn>
          <v-btn color="red darken-1" flat="flat" @click.native="userAccountDeletionDialog = false"> Hańba, oczekuj maila!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
  import {
    auth
  } from 'firebase';

  export default {
    name: 'userProfile',
    template: '#userProfile',
    data() {
      return {
        eventsUserParticipates: 0,
        eventsUserIsAdmin: 0,
        keyHoldingState: false,
        reLoginDialog: false,
        email: '',
        password: '',
        errorInForm: false,
        errorMessage: '',
        userReLogged: false,
        newPassword: '',
        newPasswordAgain: '',
        passwordChangedSnackBarVisibility: false,
        userAccountDeletionDialog: false
      }
    },
    computed: {},
    methods: {
      showBackButtonNow() {
        this.$store.state.backBtnVisible = true;
      },
      startPasswordResetProcedure() {
        if (this.userReLogged === false) {
          this.reLoginDialog = true;
        } else {
          this.userReLogged = false;
          this.errorInForm = false;
          this.errorMessage = '';
        }
      },
      reSignInUser() {
        // console.log(this.email, this.password);
        if (this.email == '' || this.password == '') {
          this.errorInForm = true;
          this.errorMessage = 'Jedno lub więcej pól nie zostało wypełnionych!';
        } else if (this.password.length < 6) {
          this.errorInForm = true;
          this.errorMessage = 'Twoje hasło ma przynajmniej 6 znaków..';
        } else {
          this.errorInForm = false;
          this.$store.dispatch('reSignInUser', {
              email: this.email,
              password: this.password
            })
            .then((result) => {
              console.log("result of promise", result);
              if (result === false) {
                this.errorInForm = true;
                this.errorMessage = 'Hasło lub email się nie zgadzają';
              } else {
                this.errorInForm = false;
                this.errorMessage = '';
                this.reLoginDialog = false;
                this.userReLogged = true;
              }
            })
        }
      },
      abortReLoggingIn() {
        this.reLoginDialog = false;
        this.email = '';
        this.password = '';
        this.errorInForm = false;
        this.errorMessage = '';
      },
      resetUsersPassword() {
        // Firstly, call fb auth function to check if user's logged recently (fb's requirement).
        if (this.newPassword !== this.newPasswordAgain) {
          this.errorInForm = true;
          this.errorMessage = 'Hasła się nie zgadzają';
        } else if (this.newPassword.length < 6) {
          this.errorInForm = true;
          this.errorMessage = 'Nowe hasło nie może mieć mniej, niż 6 znaków !';
        } else {
          this.$store.dispatch('resetUsersPassword', this.newPassword)
            .then((successStatus) => {
              this.errorInForm = false;
              this.errorMessage = '';
              this.userReLogged = false;
              this.passwordChangedSnackBarVisibility = true;
            })
            .catch(function (error) {
              this.errorInForm = false;
              this.errorMessage = 'Niestety, wystąpił błąd przy zmianie hasła :( ';
            });

        }
        // user.updatePassword()
        // console.log(user);
      },
      startUsersAccountDeletionProcedure() {
        if (this.userReLogged !== true) {
          this.reLoginDialog = true;
        } else {
          this.userAccountDeletionDialog = true;
        }
      }
    },
    computed: {
      isLoading() {
        return this.$store.state.loadingState;
      },
      initialFetchOfUserData() {
        if (!this.$store.state.user.email) {
          return true;
        } else {
          return false;
        }
      },
      compEventsUserParticipates() {
        let user = this.$store.state.user;
        if (user && user.eventsUserParticipates) {
          return user.eventsUserParticipates.length;
        } else{
          return 0;
        }
      },
      compEventsUserIsAdmin() {
        let user = this.$store.state.user;
        if (user && user.eventsEditable) {
          return user.eventsEditable.length;
        } else{
          return 0;
        }
      },
      compUserHasKeysStatus() {
        let user = this.$store.state.user;
        if (user && user.hasKeys) {
          if (user.hasKeys){
            return "Posiadasz!";
          } else{
            return "Nie masz";
          }
        } else{
          return "Nie masz";
        }
      }

    },
    created() {
      if (!this.$store.state.user.email) {
        this.$store.dispatch('checkIfLoggedUser', null);
      }
    }
  }

</script>


<style scoped>
  .card__title {
    margin: 0 auto;
    display: block;
  }

  .dashboardBox {
    /* margin: 1px; */
    /* border: 2px solid black; */
    border-radius: 15px;
    background-color: rgba(211, 211, 211, 0.452);
    min-height: 200px;
    margin: 5px auto;
    /* display: flex;
    flex-direction: column;
    align-items: center; */
    /* justify-content: space-between; */
  }

  .dashboardBox__header {
    /* justify-self: flex-start; */
  }

  .dashboardBox__hero {
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media only screen and (max-width:600px) {
    .display-3 {
      font-size: 25px !important;
    }
  }

  @media only screen and (max-width:400px) {
    .display-3 {
      font-size: 15px !important;
    }
  }

</style>
