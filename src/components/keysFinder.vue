<template id="keysFinder">
  <div>
    <h3 class="text-xs-center title mt-2" >
      Skontaktuj się z osobami które mają klucz do hufca.
      Obecnie są to:
    </h3>
    <currentKeyHolders v-for="keyHolder in keyHolders"
    :key="keyHolder.name"
    :keyHolderName = 'keyHolder.name'
    :keyHolderSurname = 'keyHolder.surname'
    :keyHolderNote =  'keyHolder.keyHoldersNote'>
  </currentKeyHolders>

  <v-bottom-nav absolute :value="showBottomNav" class="transparent">
    <v-btn v-if="userHasKeys">
      <span class="body-2">Już nie mam kluczy </span>
    </v-btn>
    <v-btn v-else>
      <span class="body-2">Ja też mam klucze </span>
    </v-btn>

  </v-bottom-nav>

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
      show: false // TODO: now it's hard-coded, but we want it true when user's logged in and currently system indicates user has the keys ('currentKeyHolders' state in Store.js)
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
    },
    userHasKeys (){
      return this.$store.getters.isHavingKeys;
    },
    showBottomNav(){
      return this.$store.getters.isUserLogged;
    }
  },
  created() {
    //do something after mounting vue instance
    console.log("At created ...");
    this.$store.dispatch("checkIfLoggedUser"); this.$store.dispatch("getCurrentKeyHolders");

    // this.$store.dispatch("fetchTheFinishedTest");

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
