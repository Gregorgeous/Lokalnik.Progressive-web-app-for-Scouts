<template>
  <div id="signupComp">
    <v-container>
      <h4 class="text-sm-center">Zarejestruj się :)</h4>

      <form @submit.prevent='SignupUser'>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-text-field
            name="Imię"
            label="Imię"
            id="Imię"
            v-model="name"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-text-field
            name="Nazwisko"
            label="Nazwisko"
            id="Nazwisko"
            v-model="surname"

            ></v-text-field>
          </v-flex>
        </v-layout>

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
            type='password'
            v-model="password"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex class="text-xs-center">
            <v-btn type='submit'> Rejestruję się ! ^^ </v-btn>
          </v-flex>
        </v-layout>

      </form>

    </v-container>

      <v-alert info value="true" class="text-xs-center" >
        Jako gość nie możesz umówić się z komendantem, rezerwować lokalu, dołączać do wydarzeń i oznaczać się że masz klucze
      </v-alert>
  </div>
</template>

<script>
export default {
  name: "signupComp",
  data () {
    return {
      name: '',
      surname: '',
      email: '',
      password: ''
    }
  },
  methods: {
    SignupUser() {
      console.log(
        this.name, this.surname, this.email, this.password
      );
      this.$store.dispatch('SignUpUser', {name:this.name, surname: this.surname, email: this.email, password:this.password})
    }
  },
  computed: {
    user(){
      return this.$store.getters.user;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/homepage');
      }
    }
  }
}
</script>

<style scoped>
  .alert{
    border-radius: 5px;
    font-style: italic;
    margin-bottom: 0px;
    padding-bottom: auto;
    left: 0;
    right: 0;
  }
</style>
