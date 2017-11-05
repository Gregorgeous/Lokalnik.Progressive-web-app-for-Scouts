<template id="sectionEvents">
  <div>

    <h4 class="text-xs-center mb-1">{{sectionTitle}}</h4>

    <div v-if="isLoading" >
      <v-flex class="text-xs-center">
        <div v-if="isUserAGuest">
          <h4>
            dostępne tylko dla zalogowanych ...
          </h4>
          <v-icon x-large>mood_bad</v-icon>
        </div>
        <v-progress-circular class="amber--text" indeterminate size="100" v-else
        ></v-progress-circular>
      </v-flex>
    </div>

    <div v-else>
      <v-layout row wrap v-if="sectionVuexState.length > 0">
        <v-flex class="mb-5"v-for="theEvent in sectionVuexState" :key="theEvent.key" xs12 sm6 md4 lg3>
          <v-card>
            <v-card-media src="https://static.pexels.com/photos/7096/people-woman-coffee-meeting.jpg" height="100px">
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
                  <v-btn flat class="orange--text"
                  @click ='goToEventDetails(theEvent)' >Szczegóły</v-btn>
                </v-flex>
                <v-flex>
                  <v-btn flat
                   v-if="checkParticipation(theEvent)"
                   @click= 'stopParticipatingInEvent(theEvent)'
                   class="red--text">Nie wezmę udziału!</v-btn>
                   <v-btn flat
                    v-else
                    @click='startParticipatingInEvent(theEvent)'
                    class="orange--text">Biorę udział!</v-btn>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout v-else >
        <v-flex class="mb-5">
          <v-card color="cyan darken-2" class="white--text " style="border-radius: 15px;" >
            <v-card-media
            src="https://pbs.twimg.com/media/Cc3D-AMVIAEAjPH.jpg"
            height="325px"
            ></v-card-media>
            <v-card-title primary-title class="text-xs-center">
              <h5>
                Coś tu pusto ... a może Ty  stworzysz jakieś wydarzenie ? :)
              </h5>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </div>

  </div>
</template>

<script>
export default {
  template: '#sectionEvents',
  props: ['sectionTitle','sectionVuexState'],
  data () {
    return {
    }
  },
  computed: {
    isLoading (){return this.$store.state.loadingState;},
    isUserAGuest(){return this.$store.state.isUserAGuest;},
    user (){return this.$store.state.user;}
  },
  methods: {
    checkParticipation (theEvent) {
      let idMatch = false;
      console.log("this is my event id ", theEvent.ID);
      if (this.user.eventsUserParticipates) {
        this.user.eventsUserParticipates.forEach((id) => {
          console.log("this is id from userDB", id);
          if (id === theEvent.ID) {
            idMatch = true;
          }
        })
      }
      return idMatch;
    },
    goToEventDetails(theEvent) {
      let eventId = theEvent.ID;
      this.$router.push({
        name: 'eventDetails',
        params: {event_id: eventId}
    });
  },
    stopParticipatingInEvent(theEvent){
      this.$store.dispatch('deleteEventUserParticipates', theEvent);
    },
    startParticipatingInEvent(theEvent){
      this.$store.dispatch('addEventUserParticipates', theEvent);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
