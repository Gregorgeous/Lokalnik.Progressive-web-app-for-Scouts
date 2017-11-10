<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-toolbar-button @click="$emit('toggleMenu')">
          <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">{{ msg }}</div>
    </v-ons-toolbar>

    <div class="header">
      <img src="../assets/zoliborz_logo.png" alt="vue-logo">
    </div>

    <v-ons-list-title id="MainTitle">Wybierz co chcesz zrobic :) </v-ons-list-title>
    <v-ons-row>
      <v-ons-col>
        <v-ons-card>
          <div class="title">
            Znajdz kto ma klucze do hufca
          </div>
          <div class="content">
            <i class="fa fa-key fa-5x" aria-hidden="true"></i>
          </div>
        </v-ons-card>
      </v-ons-col>
      <v-ons-col>
        <v-ons-card>
        <div class="title">
          Wydarzenia w hufcu
        </div>
        <div class="content">
          <i class="fa fa-comments-o fa-5x" aria-hidden="true"></i>
        </div>
        </v-ons-card>
      </v-ons-col>
    </v-ons-row>
    <v-ons-row>
      <v-ons-col>
        <v-ons-card>
          <div class="title">
            Zarezerwuj lokal
          </div>
          <div class="content">
            <i class="fa fa-calendar-plus-o fa-5x" aria-hidden="true"></i>
          </div>
        </v-ons-card>
      </v-ons-col>
      <v-ons-col>
        <v-ons-card>
          <div class="title">
            Kalendarz lokalu
          </div>
          <div class="content">
            <i class="fa fa-calendar fa-5x" aria-hidden="true"></i>
          </div>
        </v-ons-card>
      </v-ons-col>
    </v-ons-row>
    <v-ons-row>
      <v-ons-col>
      <v-ons-card>
        <div class="title">
          Mam sprawę do komendanta
        </div>
        <div class="content">
          <i class="fa fa-address-card-o fa-5x" aria-hidden="true"></i>
        </div>
      </v-ons-card>
    </v-ons-col>
    </v-ons-row>
  </v-ons-page>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Lokalnik',
    }
  },
  methods: {
    goTo (url) {
      const newWindow = window.open(url, '_blank')
      newWindow.opener = null
      newWindow.location = url
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
