<template id="homePage">
  <div class="mainContainer">
    <div class="topBar">
      <h3 class='mt-3 mb-0 topBar__header' id="MainTitle">Wybierz co chcesz zrobić:</h3>
      <div v-if="userNotGuest" class="topBar__btn" @click='goToUserProfile'>
        <img class='topBar__btn__svg' src="static/user.svg" alt="">
        <span class='topBar__btn__span'>Twój profil</span>
      </div>
    </div>
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
      },
      goToUserProfile() {
        this.$store.state.backBtnVisible = true;
        this.$router.push('/user-profile');
      }
    },
    computed:{
      userNotGuest(){
        return !this.$store.state.isUserAGuest;
      }
    }
  }

</script>


<style scoped>
  *{
    box-sizing: border-box;
  }
  .mainContainer {
    padding: 0 2rem;
    min-height: 100vh;

  }

  .myContainer {
    /* min-height: 100vh; */
    display: flex;
    flex-wrap: wrap;
  }


  .cardDiv {
    padding: 10px;
    align-self: stretch;
  }

  .cardDiv:not(:last-child) {
    width: 50%;
  }

  .cardDiv:last-child {
    width: 100%;
  }

  .cardDiv:hover .cardDiv__card {
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

  .topBar {
    display: flex;
    align-items:flex-end;
    margin-top: 1rem;
  }

  .topBar__header{
    margin-right: auto;
  }

  .topBar__btn{
    cursor: pointer;
    align-self: stretch;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0 3px;
    border-bottom: #e9b60f solid 2px;
    transition: all 0.5s;
  }

  .topBar__btn:hover {
    border: #e9b60f solid 2px;
    
  }

  .topBar__btn__svg {
    width: 4rem;
    height: 4rem;
    margin-right: 4px;
    border-radius: 50%;
    border: black 1px solid;
  }

  .topBar__btn__span{
    text-align: center;
    display: inline-block;
  }

  @media only screen and (max-width:400px) {
    html {
      font-size: 62.5%
    }
    .headline {
      font-size: 17px;
    }
    .mainContainer {
      padding: 0;
    }

  }

</style>
