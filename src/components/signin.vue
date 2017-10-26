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
          <v-btn type='submit' primary> Zaloguj się </v-btn>
        </v-flex>
      </v-layout>
    </form>

      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <p class="text-xs-center">Nie masz konta ?</p>
          <p class="text-xs-center">Zarejestruj się, lub zaloguj się jako gość </p>
          <v-layout row>
            <v-flex xs4 offset-xs3 sm6 offset-sm3>
              <v-btn to='/signup'> Zarejestruj się </v-btn>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs4 offset-xs2 sm6 offset-sm3>
              <v-btn to='/homepage'> kontynuuj jako gość </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
  </v-container>

  <v-alert info value="true" class="text-xs-center " style="font-style: italic; margin-bottom:0">
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
      password: ''
    }
  },
  methods: {
    SignInUser() {
      console.log(this.email, this.password);
      this.$store.dispatch('SignInUser', {name:this.name, surname: this.surname, email: this.email, password:this.password})
      // FIXME: make it error-handling (now it always redirects to homepage)
      this.$router.push('/homepage');
    }
  },
  computed: {
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

</style>
