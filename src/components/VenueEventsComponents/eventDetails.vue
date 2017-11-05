<template>
  <div id="eventDetails">
    <v-layout v-if="ourEvent === null">
      <v-flex class="text-xs-center">
        <h3>Nie ma takiego eventu</h3>
      </v-flex>
    </v-layout>
    <div v-else>
      <v-layout>
        <v-flex>
          <v-parallax :src="this.ourEvent.imageUrl"
          height="300">
            <v-layout column align-center justify-center>
              <h1 class="amber--text">{{this.ourEvent.title}}</h1>
              <h4 class="amber--text">Dnia: {{this.ourEvent.date}} o godz. {{this.ourEvent.time}}</h4>
            </v-layout>
          </v-parallax>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex class="text-xs-center">
          <h3>Opis wydarzenia:</h3>
          <p>{{ourEvent.description}}</p>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout>
        <v-flex class="text-xs-center">
          <h3>Kategoria wydarzenia ?</h3>
          <p>{{ourEvent.organizer}}</p>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout>
        <v-flex class="text-xs-center">
          <h3>Gdzie ?</h3>
          <p>{{ourEvent.where}}</p>
        </v-flex>
      </v-layout>
      <v-divider ></v-divider>
      <v-layout>
        <v-flex class="text-xs-center">
          <h3>Wydarzenie utworzył(a):</h3>
          <p>{{ourEvent.nameOfWhoCreatedEvent}}</p>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex
        v-if = "checkParticipation(ourEvent)"
        class="text-xs-center">
          <v-btn class="red lighten-1"
          @click= 'stopParticipatingInEvent(ourEvent)'>Nie wezmę jednak udziału..</v-btn>
        </v-flex>
        <v-flex
        v-else
         class="text-xs-center">
          <v-btn class="green lighten-1"
          @click= 'startParticipatingInEvent(ourEvent)'>Chcę wziąć udział!</v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
export default {
  name: "eventDetails",
  data () {
    return {
      ourEvent: null
    }
  },
  computed: {
    vState (){return this.$store.state;},
    user (){return this.$store.state.user;}
  },
  methods: {
    searchVuexForEvent(sectionDB) {
      let userID = this.$route.params.event_id;
      if (sectionDB) {
        sectionDB.forEach((object) => {
          if (object.ID == userID) {
            console.log("jestem!");
            this.ourEvent = object;
          }
        })
      }
    },
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
    stopParticipatingInEvent(theEvent){
      this.$store.dispatch('deleteEventUserParticipates', theEvent);
    },
    startParticipatingInEvent(theEvent){
      this.$store.dispatch('addEventUserParticipates', theEvent);
    }
  },
  created() {
    //do something after creating vue instance
    this.searchVuexForEvent(this.vState.generalEventsDB);
    this.searchVuexForEvent(this.vState.cubScoutsEventsDB);
    this.searchVuexForEvent(this.vState.scoutsEventsDB);
    this.searchVuexForEvent(this.vState.explorersEventsDB);
    this.searchVuexForEvent(this.vState.roversEventsDB);
    console.log("our this.ourEvent:", this.ourEvent);
  },
  watch:{
    '$route' (to,from) {
      alert(to.params.event_id);

    }
  }
}
</script>
<style scoped>
</style>
