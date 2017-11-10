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

      <v-alert warning transition="scale-transition" :value="errorInForm" class="text-xs-center" >
        {{errorMessage}}
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
      password: '',
      errorInForm: false,
      errorMessage: ''
    }
  },
  methods: {
    SignupUser() {
      console.log(
        this.name, this.surname, this.email, this.password
      );
      if (this.name == '' || this.surname == '' || this.email == '' || this.password == '') {
        this.errorInForm = true;
        this.errorMessage = 'Jedno lub więcej pól nie zostało wypełnionych!';
      } else if (this.password.length < 6) {
        this.errorInForm = true;
        this.errorMessage = 'Hasło musi mieć przynajmniej 6 znaków';
      } else {
        this.errorInForm = false;
        this.errorMessage = '';
        this.$store.dispatch('SignUpUser', {name:this.name, surname: this.surname, email: this.email, password:this.password})
        this.$router.push('/homepage');
      }
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
