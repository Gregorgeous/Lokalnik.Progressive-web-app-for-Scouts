<template>
  <div>
  <v-container>
    <h4 class="text-sm-center">Zaloguj się do aplikacji</h4>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field
              name="Email"
              label="Email"
              id="Email"
            ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field
              name="Hasło"
              label="Hasło"
              id="Hasło"
            ></v-text-field>
        </v-flex>
      </v-layout>
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

    }
  }
}
</script>

<style scoped>

</style>
