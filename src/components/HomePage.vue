<template id="homePage">
  <div>
    <h3 class='mt-3 mb-0' id="MainTitle" >Wybierz co chcesz zrobic:</h3>
    <v-divider ></v-divider>
    <v-container fluid grid-list-md class="grey lighten-4 pr-4">
      <v-layout row wrap>

        <v-flex xs6 class="ml-0">
          <router-link tag='span' to='/keysfinder' >
          <v-card style="cursor:pointer" @click="showBackButtonNow">
            <v-card-title primary-title class="pb-0 text-xs-center">
                <h3 class="headline mx-0">Sprawdz kto ma klucze do hufca</h3>
            </v-card-title>
            <v-card-media class="text-xs-center">
              <i class="fa fa-key fa-5x mb-1 pb-2" aria-hidden="true"></i>
            </v-card-media>
          </v-card>
          </router-link>
        </v-flex>

        <v-flex xs6 >
          <router-link tag='span' to='/venueevents'>
          <v-card style="cursor:pointer" @click="showBackButtonNow">
            <v-card-title primary-title class="pb-0 text-xs-center">
              <h3 class="headline mx-0">Sprawdz wydarzenia w lokalu hufcu</h3>
            </v-card-title>
            <v-card-media class="text-xs-center">
              <i class="fa fa-comments-o fa-5x mb-1 pb-2" aria-hidden="true"></i>
            </v-card-media>
          </v-card>
        </router-link>
        </v-flex>

        <v-flex xs6 >
          <router-link tag='span' to='/bookvenue' >
            <v-card style="cursor:pointer" @click="showBackButtonNow">
            <v-card-title primary-title class="pb-0 text-xs-center">
              <h3 class="headline mx-0">Zarezerwuj lokal</h3>
            </v-card-title>
            <v-card-media class="text-xs-center">
              <i class="fa fa-calendar-plus-o fa-5x mb-1 pb-2" aria-hidden="true"></i>
            </v-card-media>
        </v-card>
      </router-link>
        </v-flex>

        <v-flex xs6>
          <router-link tag='span' to='/venuecalendar' >
          <v-card style="cursor:pointer" @click="showBackButtonNow">
            <v-card-title primary-title class="pb-0 text-xs-center">
              <h3 class="headline mx-0">Kalendarz lokalu</h3>
            </v-card-title>
            <v-card-media class="text-xs-center">
              <i class="fa fa-calendar fa-5x mb-1 pb-2" aria-hidden="true"></i>
            </v-card-media>
        </v-card>
      </router-link>
        </v-flex>

        <v-flex xs12>
          <router-link tag='span' to='/meetwithdcs'>
            <v-card style="cursor:pointer" @click="showBackButtonNow">
            <v-card-title primary-title class="pb-0 text-xs-center">
              <h3 class="headline mx-0">Mam sprawę do komendanta</h3>
            </v-card-title>
            <v-card-media class="text-xs-center">
              <i class="fa fa-address-card-o fa-5x mb-1 pb-2" aria-hidden="true"></i>
            </v-card-media>
          </v-card>
        </router-link>
        </v-flex>

      </v-layout>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'homePage',
  template: '#homePage',
  data () {
    return {
      msg: 'Lokalnik',
      link: '/keysfinder'
    }
  },
  computed: {
  },
  methods: {
    showBackButtonNow(){
      this.$store.state.backBtnVisible = true;
    }
  },
  components: {
  }
}
</script>


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
