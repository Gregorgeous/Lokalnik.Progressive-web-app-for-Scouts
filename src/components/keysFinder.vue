<template id="keysFinder">
  <div>
    <h3 class="text-xs-center title mt-2" >
      Skontaktuj się z osobami które mają klucz do hufca.
      Obecnie są to:
    </h3>
    <div v-if="loadingState" >
      <v-flex class="text-xs-center">

        <div v-if="isUserAGuest">
          <h4>
            dostępne tylko dla zalogowanych ...
          </h4>
          <v-icon x-large>mood_bad</v-icon>
        </div>
        <v-progress-circular class="amber--text" indeterminate size="100" v-else
        ></v-progress-circular>
      </v-flex>
    </div>
    <div v-else>
      <div v-if="keyHolders <= 0">
        <v-flex class="text-xs-center">
          <h3> Wygląda na to że na razie nikt ma kluczy ....</h3>
          <v-icon x-large>vpn_key</v-icon>
          <v-icon x-large>arrow_forward</v-icon>
          <v-icon x-large>no_encryption</v-icon>
        </v-flex>
      </div>
      <currentKeyHolders v-else v-for="keyHolder in keyHolders"
      :key="keyHolder.name"
      :keyHolderName = 'keyHolder.name'
      :keyHolderSurname = 'keyHolder.surname'
      :keyHolderNote =  'keyHolder.keyHoldersNote'>
    </currentKeyHolders>
  </div>


  <v-bottom-nav absolute  v-model="showBottomNav" class="transparent">
    <v-btn v-if="userHasKeys" @click ='changeKeyHoldingState(false, "----")'>
      <span class="body-2">Już nie mam kluczy </span>
    </v-btn>
    <v-btn v-else @click="dialog = true">
      <span class="body-2">Ja też mam klucze </span>
    </v-btn>
  </v-bottom-nav>

  <!-- AFTER CLICKING ONE OF NAVBAR BUTTONS ...-->
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Napisz informację dla innych..</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field
              label='np. "mam klucze do 20 dnia 20.10"'
              v-model="newKeyHoldersNote"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" flat @click.native="dialog = false">anuluj</v-btn>
        <v-btn color="blue darken-1"
        flat
        @click ='changeKeyHoldingState(true,newKeyHoldersNote)'>
        zapisz!
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
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
      show: false, // TODO: now it's hard-coded, but we want it true when user's logged in and currently system indicates user has the keys ('currentKeyHolders' state in Store.js)
      dialog: false,
      newKeyHoldersNote: ''
    }
  },
  methods: {
    changeKeyHoldingState(boolean,message) {
      let boolStatus = {boolean,message};
      this.$store.dispatch('changeKeyHoldingState', boolStatus);
      if (boolean == true) {
        this.dialog = false;
        this.newKeyHoldersNote = '';
      }
    }
  },
  computed: {
    keyHolders () {return this.$store.state.currentKeyHolders;},
    userHasKeys (){return this.$store.getters.isHavingKeys;},
    showBottomNav(){return this.$store.getters.isUserLogged;},
    loadingState(){return this.$store.state.loadingState;},
    isUserAGuest(){return this.$store.state.isUserAGuest;}
  },
  created() {
    this.$store.dispatch("checkIfLoggedUser", 'getCurrentKeyHolders');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
