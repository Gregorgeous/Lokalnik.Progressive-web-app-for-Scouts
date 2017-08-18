<template id="bookVenue">
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
      Wybierz co chcesz zrobic
    </v-ons-list-title>

    <v-ons-list-item class="switcher">
      <label for="switch1">
        Chcę zarezerwowac lokal hufca
      </label>
      <div class="right">
          <v-ons-switch input-id="switch1" @change="showIframe('1',$event)">
          </v-ons-switch>
      </div>
    </v-ons-list-item>

    <iframe  v-show="switcher1" src="https://docs.google.com/forms/d/1LlSxGIdxIRxrU6CVlKe2qIz3Fn8iq6Z-NBVTqg322M4/viewform?embedded=true" width="350" height="1320" frameborder="2" marginheight="0" marginwidth="0">Ładowanie...</iframe>

    <v-ons-list-item class="switcher">
      <label for="switch2">
        Chcę zarezerwowac rzutnik
      </label>
      <div class="right">
          <v-ons-switch input-id="switch2" @change="showIframe('2',$event)">
          </v-ons-switch>
      </div>
    </v-ons-list-item>

    <iframe v-show="switcher2" src="https://docs.google.com/forms/d/1Ik9fA8FpX8MMTbYdvT5RB0tEkwC84_hn-V14pH6nlQc/viewform?embedded=true" width="350" height="1320" frameborder="2" marginheight="0" marginwidth="0">Ładowanie...</iframe>
  </v-ons-page>
</template>

<script>
export default {
  name: 'bookVenue',
  template: '#bookVenue',
  data () {
    return {
      msg: 'Lokalnik',
      switcher1: false,
      switcher2: false
    }
  },
  methods: {
    showIframe(index,event) {
      if (index == '1') {
        this.switcher1 = event.value;
      }
      if (index == '2') {
        this.switcher2 = event.value;
      }
    }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
}
.switcher{
  width: 90%;
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
