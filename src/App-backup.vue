<template id="main">
  <v-app :class='tempBackground'>

    <div v-if="splashScreenOpen">
      <v-container>
        <h3 class="text-xs-center mb-0" style="text-decoration:underline">"Lokalnik"</h3>
        <h5 class="text-xs-center">Aplikacja do zarządzania lokalem hufca </h5>
        <img src="./assets/zoliborz_logo.png" alt="app-logo" style="width:100%; margin: 40% 0% 15% 0%">
        <v-layout row>
          <v-flex class="text-xs-center" v-if="showSpinner">
            <v-progress-circular indeterminate v-bind:size="50" class="amber--text"></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-container>
    </div>


    <div v-else>
      <v-toolbar class="home-toolbar">
        <router-link to='/homepage' tag='span' class="ml-0" v-if="showBackBtn">
          <v-toolbar-side-icon @click="hideBackBtn" >
            <i class="fa fa-arrow-left fa-lg" aria-hidden="true" ></i>
          </v-toolbar-side-icon>
        </router-link>
        <v-toolbar-title class="ml-2">{{ msg }}</v-toolbar-title>
        <img class="ml-3 "style="max-height:80%" src="./assets/zoliborz_logo.png" alt="app-logo">
      </v-toolbar>
      <main>
        <router-view ></router-view>
      </main>
    </div>

  </v-app>
</template>

<script>
import HomePage from './components/HomePage'

export default {
  template: '#main',
  computed:{
  },
  components: {
    'home-page': HomePage
  },
  data () {
    return {
      msg: 'Lokalnik',
      menuIsOpen: false,
      splashScreenOpen: true,
      tempBackground: "teal lighten-1",
      showSpinner:true,


      // pageStack: [HomePage],
      // proba: ['abc']
    }
  },
  computed:{
    showBackBtn(){
      return this.$store.state.backBtnVisible;
    }
  },
  methods: {
    hideBackBtn(){
      this.$store.state.backBtnVisible = false;
    },
    hiiide() {
      console.log("zostałem wywołany");
      this.showSpinner = false;
    },
  },
  mounted: function() {
    //do something after creating vue instance
    var data = this;
    var something = setTimeout(function(){
        data.splashScreenOpen = false;
        data.tempBackground ='';
    },3000)
  }
}
</script>

<style scoped>
ons-splitter-side[side=left][animation=overlay] {
  border-right: 1px solid #BBB;
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
