<template>
  <div>
    <v-container>
      <h4 class="text-sm-center">Zaloguj się do aplikacji</h4>
      <form @submit.prevent='SignInUser'>

        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-text-field
            name="Email"
            label="Email"
            id="Email"
            v-model="email"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-text-field
            name="Hasło"
            label="Hasło"
            id="Hasło"
            type="password"
            v-model="password"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex class="text-xs-center">
            <v-btn type='submit' primary > Zaloguj się </v-btn>
          </v-flex>
        </v-layout>
      </form>

      <v-layout v-if="isLoading" transition="scale-transition" row>
        <v-flex class="text-xs-center">
          <v-progress-circular class="amber--text" indeterminate size="40"
          ></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex>
          <p class="text-xs-center">Nie masz konta ?</p>
          <p class="text-xs-center">Zarejestruj się, lub zaloguj się jako gość </p>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex class="text-xs-center">
          <v-btn to='/signup'> Zarejestruj się </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex class="text-xs-center">
          <v-btn @click="loginAsGuest"> kontynuuj jako gość </v-btn>
        </v-flex>
      </v-layout>
    </v-container>

    <v-alert warning transition="scale-transition" :value="errorInForm" class="text-xs-center" >
      {{errorMessage}}
    </v-alert>
    <v-alert info value="true" v-if="!errorInForm" transition="scale-transition" class="text-xs-center ">
      Jako gość nie możesz umówić sie z komendantem, rezerwować lokalu, dołączać do wydarzeń i oznaczać się że masz klucze
    </v-alert>


  </div>
</template>

<script>
export default {
  name: "signup",
  data () {
    return {
      email: '',
      password: '',
      errorInForm: false,
      errorMessage: ''
    }
  },
  methods: {
    SignInUser() {
      // console.log(this.email, this.password);
      if (this.email == '' || this.password == '') {
        this.errorInForm = true;
        this.errorMessage = 'Jedno lub więcej pól nie zostało wypełnionych!';
      } else if (this.password.length < 6) {
        this.errorInForm = true;
        this.errorMessage = 'Twoje hasło ma przynajmniej 6 znaków..';
      } else {
        this.$store.dispatch('SignInUser', {email: this.email, password:this.password})
        .then((result) => {
          console.log("result of promise", result);
          if (result === false) {
            this.errorInForm = true;
            this.errorMessage = 'Hasło lub email się nie zgadzają';
          }
          else {
            this.errorInForm = false;
            this.errorMessage = '';
            this.$router.push('/');
          }
        })
      }
    },
    loginAsGuest(){
      this.$store.commit('setGuestUser');
      this.$router.push('/');
    }
  },
  computed: {
    isLoading(){
      return this.$store.state.loadingState;
    }
    // IDEA: This was previous idea .. I dunno how is that any better approach but basically getter used via watch odwoluje sie do wartosci usera wzietego z getters and somehow uses it in watch ..
    // user(){
    //   return this.$getters.user;
    // }
  },
  watch: {
    // IDEA: connected with one above
    // user(value) {
    //   if (value !== null && value !== undefined) {
    //     this.$router.push('/homepage');
    //   }
    // }
  }
}
</script>

<style scoped>
.alert{
  border-radius: 5px;
  font-style: italic;
  margin-bottom: 0px;
  left: 0;
  right: 0;
  margin-left: 0;
}

</style>
