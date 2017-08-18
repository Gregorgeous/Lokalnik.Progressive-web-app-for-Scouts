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

    <v-ons-list-title id="MainTitle">
      Chcesz znalezc kogoś kto ma klucze do hufca
    </v-ons-list-title>


    <v-ons-row>
      <v-ons-col>
        <div class="center">
          <v-ons-button @click='testFunction'>
            Kliknij
        </v-ons-button>
      </div>
    </v-ons-col>
  </v-ons-row>

</v-ons-page>
</template>

<script>
export default {
  name: 'keysFinder',
  template: '#keysFinder',
  data () {
    return {
      msg: 'Lokalnik',
    }
  },
  methods: {
    testFunction() {
      console.log("Clicked");
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
