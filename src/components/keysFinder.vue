<template id="keysFinder">
  <div>
    <h3 class="text-xs-center title mt-2" >
      Skontaktuj się z osobami które mają klucz do hufca.
      Obecnie są to:
    </h3>
    <currentKeyHolders v-for="keyHolder in keyHolders"
    :key="keyHolder.name"
    :keyHolderName = 'keyHolder.name'
    :keyHolderSurname = 'keyHolder.surname' >
    </currentKeyHolders>


    <v-bottom-nav absolute value="true" class="transparent">
          <v-btn  >
            <span class="body-2">Ja też mam klucze </span>
          </v-btn>
          <v-btn  >
            <span class="body-2">Już nie mam kluczy </span>
          </v-btn>
        </v-bottom-nav>

  <!-- <v-ons-bottom-toolbar>
    <v-ons-row>
      <v-ons-col>
        <v-ons-button modifier="quiet">Ja też mam klucze</v-ons-button>
      </v-ons-col>
      <v-ons-col v-if="show">
        <v-ons-button>Nie mam już kluczy</v-ons-button>
      </v-ons-col>
    </v-ons-row>
  </v-ons-bottom-toolbar> -->
</div>
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
