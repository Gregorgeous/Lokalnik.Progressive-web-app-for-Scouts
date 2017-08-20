<template>
  <div>
  <v-container>
    <h4 class="text-sm-center">Zarejestruj się :)</h4>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-text-field
            name="Imię"
            label="Imię"
            id="Imię"
          ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-text-field
            name="Nazwisko"
            label="Nazwisko"
            id="Nazwisko"
          ></v-text-field>
      </v-flex>
    </v-layout>
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
        <v-flex xs4 offset-xs2 sm6 offset-sm3>
          <v-btn to='/homepage'> Rejestruję się ! ^^ </v-btn>
        </v-flex>
      </v-layout>
  </v-container>

  <v-alert info value="true" class="text-xs-center " style="font-style: italic; margin-bottom:0">
    Jako gośc nie możesz umówic sie z komendantem, rezerwowac lokalu, dołączac do wydarzeń i oznaczac się że masz klucze
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
