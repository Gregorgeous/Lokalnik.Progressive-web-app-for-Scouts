<template id="homePage">
  <div class="mainContainer">
    <v-container class="pt-1">
      <v-layout justify-center>
        <v-flex>
          <v-card>
            <v-card-media height='200' contain src="./static/harcerzposzukiwanie.jpg">
            </v-card-media>
            <v-divider></v-divider>
            <v-card-title primary-title class="display-1 text-xs-center">
              Twój profil
            </v-card-title>
            <v-card-text class="pt-0">
              <v-layout row wrap justify-center>
                <v-flex xs5 class="dashboardBox">
                  <p class="dashboardBox__header text-xs-center">Wydarzenia w których bierzesz udział</p>
                  <div class="dashboardBox__hero">
                    <h1 class="display-3">3</h1>
                  </div>
                </v-flex>
                <v-flex xs5 class="dashboardBox">
                  <p class="dashboardBox__header text-xs-center">Wydarzenia które prowadzisz</p>
                  <div class="dashboardBox__hero">
                    <h1 class="display-3">Posiadasz!</h1>
                  </div>
                </v-flex>
                <v-flex xs5 class="dashboardBox">
                  <p class="dashboardBox__header text-xs-center">status kluczy:</p>
                  <div class="dashboardBox__hero">
                    <h1 class="display-3">Posiadasz!</h1>
                  </div>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <h1 class="text-xs-center">Ustawienia</h1>
              <v-btn block>Zmień hasło</v-btn>
              <v-btn block class="error">Usuń konto</v-btn>              
            </v-card-text>
          </v-card>

        </v-flex>
      </v-layout>
    </v-container>


  </div>
</template>

<script>
  export default {
    name: 'homePage',
    template: '#homePage',
    data() {
      return {
        link: '/keysfinder',
      }
    },
    computed: {},
    methods: {
      showBackButtonNow() {
        this.$store.state.backBtnVisible = true;
      }
    },
    components: {}
  }

</script>


<style scoped>
  .card__title {
    margin: 0 auto;
    display: block;
  }

  .dashboardBox {
    /* margin: 1px; */
    /* border: 2px solid black; */
    border-radius: 15px;
    background-color: rgba(211, 211, 211, 0.452);
    min-height: 200px;
    margin: 5px auto;
    /* display: flex;
    flex-direction: column;
    align-items: center; */
    /* justify-content: space-between; */
  }

  .dashboardBox__header {
    /* justify-self: flex-start; */
  }

  .dashboardBox__hero {
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media only screen and (max-width:600px) {
    .display-3 {
      font-size: 25px !important;
    }
  }

  @media only screen and (max-width:400px) {
    .display-3 {
      font-size: 15px !important;
    }
  }

</style>
