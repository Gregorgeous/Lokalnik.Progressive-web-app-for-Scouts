<template id="homePage">
  <div class="mainContainer">
    <h3 class='mt-3 mb-0' id="MainTitle">Wybierz co chcesz zrobić:</h3>
    <v-divider></v-divider>

    <div class="myContainer">


      <router-link tag='div' class="cardDiv" to='/keysfinder'>
        <v-card class="cardDiv__card" style="cursor:pointer" @click="showBackButtonNow">
          <v-card-title primary-title class="pb-0 text-xs-center">
            <h3 class="headline mx-0">Sprawdź kto ma klucze do hufca</h3>
          </v-card-title>
          <v-card-media class="text-xs-center">
            <i class="fa fa-key fa-5x mb-1 pb-2" aria-hidden="true"></i>
          </v-card-media>
        </v-card>
      </router-link>

      <router-link tag='div' class="cardDiv" to='/venueevents'>
        <v-card class="cardDiv__card" style="cursor:pointer" @click="showBackButtonNow">
          <v-card-title primary-title class="pb-0 text-xs-center">
            <h3 class="headline mx-0">Sprawdź wydarzenia w lokalu hufcu</h3>
          </v-card-title>
          <v-card-media class="text-xs-center">
            <i class="fa fa-comments-o fa-5x mb-1 pb-2" aria-hidden="true"></i>
          </v-card-media>
        </v-card>
      </router-link>

      <router-link tag='div' class="cardDiv" to='/bookvenue'>
        <v-card class="cardDiv__card" style="cursor:pointer" @click="showBackButtonNow">
          <v-card-title primary-title class="pb-0 text-xs-center">
            <h3 class="headline mx-0">Zarezerwuj lokal</h3>
          </v-card-title>
          <v-card-media class="text-xs-center">
            <i class="fa fa-calendar-plus-o fa-5x mb-1 pb-2" aria-hidden="true"></i>
          </v-card-media>
        </v-card>
      </router-link>

      <router-link tag='div' class="cardDiv" to='/venuecalendar'>
        <v-card class='cardDiv__card' style="cursor:pointer" @click="showBackButtonNow">
          <v-card-title primary-title class="pb-0 text-xs-center">
            <h3 class="headline mx-0">Kalendarz lokalu</h3>
          </v-card-title>
          <v-card-media class="text-xs-center">
            <i class="fa fa-calendar fa-5x mb-1 pb-2" aria-hidden="true"></i>
          </v-card-media>
        </v-card>
      </router-link>

      <router-link tag='div' class="cardDiv-last cardDiv" to='/meetwithdcs'>
        <v-card class="cardDiv__card" style="cursor:pointer" @click="showBackButtonNow">
          <v-card-title primary-title class="pb-0 text-xs-center">
            <h3 class="headline mx-0">Mam sprawę do komendanta</h3>
          </v-card-title>
          <v-card-media class="text-xs-center">
            <i class="fa fa-address-card-o fa-5x mb-1 pb-2" aria-hidden="true"></i>
          </v-card-media>
        </v-card>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'homePage',
    template: '#homePage',
    data() {
      return {
        msg: 'Lokalnik',
        link: '/keysfinder'
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
  

  .mainContainer {
    padding: 0 2rem;
    min-height: 100vh;

  }

  .myContainer {
    /* min-height: 100vh; */
    display: flex;
    flex-wrap: wrap;
  }
  

  .cardDiv{
    padding: 10px;
    align-self: stretch;
  }

  .cardDiv:not(:last-child){
    width: 50%;
  }

  .cardDiv:last-child{
    width: 100%;
  }

  .cardDiv:hover .cardDiv__card{
    -webkit-box-shadow: 0px 10px 41px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 10px 41px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 10px 41px 0px rgba(0, 0, 0, 0.301);
    transition: all .5s;
  }

  .cardDiv__card {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .cardDiv-last__card {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media only screen and (max-width:400px) {
    html{
      font-size: 62.5%
    }
    .headline{
      font-size: 17px;
    }
    .mainContainer {
    padding: 0;
    }

  }

</style>
