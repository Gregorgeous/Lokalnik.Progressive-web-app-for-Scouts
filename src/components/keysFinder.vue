<template id="keysFinder">
  <v-ons-page>

    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-back-button>homePage</v-ons-back-button>
      </div>
      <div class="center">{{ msg }}</div>
    </v-ons-toolbar>

    <div class="header">
      <img src="../assets/zoliborz_logo.png" alt="vue-logo">
    </div>

    <v-ons-list>
    <v-ons-list-title id="MainTitle">
      Skontaktuj się z osobami które mają klucz do hufca.
      Obecnie są to:
    </v-ons-list-title>
    <currentKeyHolders v-for="keyHolder in keyHolders"
    :key="keyHolder.name"
    :keyHolderName = 'keyHolder.name'
    :keyHolderSurname = 'keyHolder.surname' >
    </currentKeyHolders>



  </v-ons-list>
  <v-ons-bottom-toolbar>
    <v-ons-row>
      <v-ons-col>
        <v-ons-button modifier="quiet">Ja też mam klucze</v-ons-button>
      </v-ons-col>
      <v-ons-col v-if="show">
        <v-ons-button>Nie mam już kluczy</v-ons-button>
      </v-ons-col>
    </v-ons-row>
  </v-ons-bottom-toolbar>
</v-ons-page>
</template>

<script>
import currentKeyHolders from './currentKeyHolders.vue'

export default {
  name: 'keysFinder',
  template: '#keysFinder',
  components: {
    'currentKeyHolders': currentKeyHolders
  },
  data () {
    return {
      msg: 'Lokalnik',
      show: true // TODO: now is hard-coded, but we want it true when user's logged in and currently system indicates user has the keys ('currentKeyHolders' state in Store.js)
    }
  },
  methods: {
    testFunction() {
      console.log("Clicked");

    }
  },
  computed: {
    keyHolders () {
      return this.$store.state.currentKeyHolders;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
}

img {
  max-width: 300px;
}

ons-list-title:not(:first-of-type) {
  margin-top: 30px;
}

ons-card {
  text-align: center;
}

ons-list-item, ons-card {
  cursor: pointer;
}

#MainTitle{
  text-align: center;
}
</style>
