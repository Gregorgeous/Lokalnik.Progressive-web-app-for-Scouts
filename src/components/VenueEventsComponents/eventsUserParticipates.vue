<template id="eventsUserParticipates">
  <div>
    <h4 class="text-xs-center mb-1">Wydarzenia w których się bierzesz udział: </h4>

    <div v-if="isLoading" >
      <v-flex class="text-xs-center">
        <div v-if="isUserAGuest">
          <h4>
            dostępne tylko dla zalogowanych ...
          </h4>
          <v-icon x-large>mood_bad</v-icon>
        </div>
        <v-progress-circular  class="amber--text" indeterminate size="100" v-else
        ></v-progress-circular>
      </v-flex>
    </div>

    <div v-else>
      <v-layout row wrap v-if="sectionVuexState.length > 0">
        <v-flex class="mb-5"v-for="theEvent in sectionVuexState" :key="theEvent.key" xs12 sm6 md4 lg3>
          <v-card>
            <v-card-media
            src="https://static.pexels.com/photos/7096/people-woman-coffee-meeting.jpg" height="100px">
            <v-container fill-height fluid>
           <v-layout fill-height>
             <v-flex xs12 align-end flexbox>
             </v-flex>
             <h5>
               Ten pokój jest pusty.. wiesz co jeszcze jest?
               <br>
               ..na pewno wiesz co z tym zrobić :>
             </h5>
           </v-layout>
           </v-container>
            </v-card-media>
            <v-card-title primary-title>
              <div>
                <h3 class="headline text-xs-center">{{theEvent.title}}</h3>
                <div class="text-xs-center">
                  {{theEvent.description}}
                </div>
              </div>
            </v-card-title>
            <v-card-actions class="justify-space-around text-xs-center">
              <v-layout row wrap >
                <v-flex>
                  <v-btn flat class="orange--text" >Szczegóły</v-btn>
                </v-flex>
                <v-flex>
                  <v-btn flat class="orange--text">Biorę udział!</v-btn>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout v-else>
        <v-flex class="mb-5">
          <v-card color="cyan darken-2" class="white--text " style="border-radius: 45px;">
            <v-card-media
            src="http://www.jcwallsandceilings.com.au/wp-content/uploads/2015/08/iStock_000057942062_Large.jpg"
            height="205px"
            ></v-card-media>
          </v-card>
          <v-card style="border-radius:40px; ">
            <v-card-title class="pa-0 text-xs-center">
              <v-flex>
                <h5 class="ma-0">Ten pokój jest pusty..</h5>
                <h5 class="ma-0">Wiesz co jeszcze jest puste? ></h5>
                <h5 class="ma-0">To na pewno wiesz też co robić ;) </h5>
              </v-flex>
            </v-card-title>
          </v-card>
          <v-divider></v-divider>
        </v-flex>
      </v-layout>
    </div>

  </div>
</template>

<script>
export default {
  template: '#eventsUserParticipates',
  props: ['sectionVuexState'],
  data () {
    return {
    }
  },
  computed: {
    size(){ return "200px";},
    isLoading (){return this.$store.state.loadingState;},
    isUserAGuest(){return this.$store.state.isUserAGuest;}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
