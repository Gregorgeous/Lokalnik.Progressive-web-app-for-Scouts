<template id="main">
  <v-app>
    <v-toolbar class="home-toolbar">
        <router-link to='/' tag='span' class="ml-0" v-if="showBackBtn">
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
      // pageStack: [HomePage],
      proba: ['abc']
    }
  },
  computed:{
    showBackBtn(){
      return this.$store.state.backBtnVisible
    }
  },
  methods: {
    hideBackBtn(){
      this.$store.state.backBtnVisible = false;
    }
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
