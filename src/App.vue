<template>
  <v-app>

    <v-toolbar>
      <v-toolbar-side-icon
      v-if="showBackBtn" @click="goBack" >
        <i class="fa fa-arrow-left fa-lg" aria-hidden="true" ></i>
      </v-toolbar-side-icon>
      <v-toolbar-title class="ml-2">Lokalnik</v-toolbar-title>
      <img class="ml-3 hidden-sm-and-up " v-if="!showBackBtn " style="max-height:80%" src="./assets/zoliborz_logo.png" alt="app-logo">
      <!--IDEA:cheap work-around to show the logo when the way I want it -->
      <img class="ml-3 hidden-xs-only " style="max-height:80%" src="./assets/zoliborz_logo.png" alt="app-logo">
      <v-spacer></v-spacer>
      <v-toolbar-side-icon v-if="logoutButton" @click="signOut">
          <i class="fa fa-sign-out fa-2x" id="logoutIcon" aria-hidden="true" ></i>
          <span id="logoutSpan">wyloguj</span>
    </v-toolbar-side-icon>
    </v-toolbar>

    <main>
        <router-view ></router-view>
        <v-btn v-if="loginButton" @click='goToSignin' round class="myFAB primary elevation-12" dark>Zaloguj się</v-btn>
    </main>

  </v-app>
</template>

<script>
import * as firebase from 'firebase';
export default {
  name: 'app',
  data() {
    return {
      userLogged: false,
    }
  },
  computed:{
    loginButton(){
      if (this.$route.path == '/signin' || this.$route.path == '/signup') {
        return false;
      }else {
      return  !this.$store.state.explicitLoginState;
      }
    },
    logoutButton(){
      if (this.$route.path == '/signin' || this.$route.path == '/signup') {
        return false;
      }else {
      return  this.$store.state.explicitLoginState;
      }
    },
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
    },
    showLoginFAB(){
      if (this.$route.path == '/signin' || this.$route.path == '/signup') {
        return false;
      }
      else {
        return !this.$store.getters.decideWhetherToPromptForLoginFAB;
      }
    },
    showLogoutIcon(){
      if (this.$route.path == '/signin' || this.$route.path == '/signup') {
        return false;
      }
      else {
        return this.$store.getters.decideWhetherToPromptForLoginFAB;
      }
    }
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    },
    goToSignin(){
      this.$router.replace('/signin');
    },
    signOut(){
      this.$store.dispatch('signOutUser');
      this.$router.replace('/signin');
    }
  },
  created() {
    //do something after creating vue instance
    this.$store.dispatch('booleanLoginState');
  },
  beforeUpdate() {
    //do something before updating vue instance
    this.$store.dispatch('booleanLoginState');
  }
}
</script>

<style scoped>
  .myFAB{
    position: fixed;
    right: 5px;
    bottom: 10px;
  }
  #logoutIcon{
    display: flex;
    position: absolute;
  }
  #logoutSpan{
    display: block;
    font-size: 10px;
    position: absolute;
    bottom: -5px;
  }
</style>
