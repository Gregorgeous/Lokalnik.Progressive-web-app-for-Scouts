<template id="app">
  <v-app>

    <v-toolbar >
      <v-toolbar-side-icon
      v-if="showBackBtn" @click="goBack" >
        <i class="fa fa-arrow-left fa-lg" aria-hidden="true" ></i>
      </v-toolbar-side-icon>
      <v-toolbar-title class="ml-2">Lokalnik</v-toolbar-title>
      <img class="ml-3 hidden-sm-and-up " v-if="!showBackBtn "style="max-height:80%" src="./assets/zoliborz_logo.png" alt="app-logo">
      <!--IDEA:cheap work-around to show the logo when the way I want it -->
      <img class="ml-3 hidden-xs-only "style="max-height:80%" src="./assets/zoliborz_logo.png" alt="app-logo">
    </v-toolbar>

    <main>
        <router-view ></router-view>
    </main>

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
    }
  },
  computed:{
    showBackBtn(){
      let route = this.$route.name;
      switch (route) {
        case 'signin':
        case 'editEvent':
        case 'HomePage':
          return false;
          break;
        default:
          return true;
      }
    }
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    }
    // hideBackBtn(){
    //   this.$store.state.backBtnVisible = false;
    // }
  }
}
</script>

<style scoped>

</style>
