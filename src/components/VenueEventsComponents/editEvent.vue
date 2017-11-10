<template>
  <div id="editEvent">
    <v-layout v-if="ourEvent === null">
      <v-flex class="text-xs-center">
        <h3>Nie ma takiego eventu</h3>
      </v-flex>
    </v-layout>
    <div v-else>
      <v-layout>
        <v-flex>
          <h5>Edytuj wydarzenie</h5>
        </v-flex>
      </v-layout>
      <v-container>
        <v-layout>
          <v-flex>
            <v-card>
              <v-card-media :src="ourEvent.imageUrl" height='400px'>
                <v-btn rounded>Zmień zdjęcie</v-btn>
              </v-card-media>
              <v-list three-line>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon color="indigo">title</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-text-field
                    v-model="ourEvent.title"
                    label="Tytuł"
                    single-line
                    ></v-text-field>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-icon class="pr-4" color="indigo">description</v-icon>
                  <v-list-tile-content>
                    <v-text-field
                    v-model="ourEvent.description"
                    label="opis wydarzenia"
                    multi-line
                    ></v-text-field>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider inset></v-divider>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon color="indigo">place</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-text-field
                    v-model="ourEvent.where"
                    label="Tytuł"
                    single-line
                    ></v-text-field>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile disabled>
                  <v-list-tile-action>
                    <v-icon color="indigo">book</v-icon>
                  </v-list-tile-action>
                  <v-subheader>Kategoria:</v-subheader>
                  <v-list-tile-content class="pt-2">
                    <v-select
                    :items="sections"
                    v-model="ourEvent.organizer"
                    label="Select"
                    single-line
                    bottom
                    disabled
                    ></v-select>
                  </v-list-tile-content>
                  <v-list-tile-sub-title> Nie można zmienić raz wybranej kategorii  </v-list-tile-sub-title>
                </v-list-tile>
                <v-divider inset></v-divider>
                <v-list-tile >
                  <v-list-tile-action >
                    <v-icon color="indigo">date_range</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content class="text-xs-center">
                    <v-menu >
                      <v-btn slot='activator' >zmień datę</v-btn>
                      <v-date-picker v-model="ourEvent.date" no-title scrollable actions>
                      </v-date-picker>
                    </v-menu>
                  </v-list-tile-content>
                  <v-list-tile-content class="hidden-sm-and-down" >
                    <p class="pt-2">obecnie ustawione:</p>
                  </v-list-tile-content>
                  <v-list-tile-content>
                    <v-text-field
                    class="pt-4"
                    v-model="ourEvent.date"
                    readonly>
                  </v-text-field>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile >
                <v-list-tile-action >
                  <v-icon color="indigo">access_time</v-icon>
                </v-list-tile-action>
                <v-list-tile-content class="text-xs-center">
                  <v-menu
                  lazy
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  :nudge-right="40"
                  max-width="290px"
                  min-width="290px">
                  <v-btn slot='activator' >zmień godzinę</v-btn>
                  <v-time-picker v-model="ourEvent.time" actions format="24hr" >
                    <template scope="{ save, cancel }">
                      <v-card-actions>
                        <v-btn flat color="primary" @click="cancel">anuluj</v-btn>
                        <v-btn flat color="primary" @click="save">zapisz</v-btn>
                      </v-card-actions>
                    </template>
                  </v-time-picker>
                </v-menu>
              </v-list-tile-content>
              <v-list-tile-content class="hidden-sm-and-down" >
                <p class="pt-2">obecnie ustawione:</p>
              </v-list-tile-content>
              <v-list-tile-content>
                <v-text-field
                class="pt-4"
                v-model="ourEvent.time"
                readonly>
              </v-text-field>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-alert class="red text-xs-center" icon="warning" :value="errorInForm" style="border-radius:5px">
        Nie wypełniono jakiegoś pola!
        </v-alert>
        <v-divider></v-divider>
        <v-card-actions>
          <v-flex class="text-xs-center">
            <v-btn flat class="orange--text" @click='goBack'>Anuluj zmiany</v-btn>
            <v-btn flat class="green--text"
            @click='saveEditedChanges' >Zapisz</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</div>
</div>
</template>
<script>
export default {
  name: "editEvent",
  data () {
    return {
      ourEvent: null,
      errorInForm: false,
      sections: [
        'Wydarzenia ogólne',
        'Nam. zuchowe',
        'Nam. harcerskie',
        'Nam. starszoharcerskie',
        'Nam. wędrownicze',
      ],
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' }
      ]
    }
  },
  computed: {
    vState (){return this.$store.state;},
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
    stopParticipatingInEvent(theEvent){
      this.$store.dispatch('deleteEventUserParticipates', theEvent);
    },
    startParticipatingInEvent(theEvent){
      this.$store.dispatch('addEventUserParticipates', theEvent);
    },
    searchVuexForEvent(sectionDB) {
      let userID = this.$route.params.editedEvent_id;
      var ourSourceObject;
      console.log("patrz!",userID );
      if (sectionDB) {
        sectionDB.forEach((object) => {
          if (object.ID == userID) {
            // IDEA: Just to make sure it's not the source object of ours straight from Vuex, but a copy (otherwise, vuex state data would be changed even when user hits "discard changes")
            ourSourceObject = {...object};
            this.ourEvent = ourSourceObject;
          }
        })
      }
    },
    goBack(){
      this.$router.go(-1);
    },
    saveEditedChanges(){
      let isEmpty = false;
      for (var field in this.ourEvent) {
        if (this.ourEvent[field] === null || this.ourEvent[field] == 0) {
          console.log("błąd!");
          isEmpty = true;
        }
      }
      if (isEmpty) {
        this.errorInForm = true;
      }
      else {
        this.errorInForm = false;
        this.$store.dispatch('updateEventOnFB',this.ourEvent);
        this.$router.replace({name:'venueEvents'});
      }
    }
  },
  created() {
    //do something after creating vue instance
    this.searchVuexForEvent(this.vState.generalEventsDB);
    this.searchVuexForEvent(this.vState.cubScoutsEventsDB);
    this.searchVuexForEvent(this.vState.scoutsEventsDB);
    this.searchVuexForEvent(this.vState.explorersEventsDB);
    this.searchVuexForEvent(this.vState.roversEventsDB);
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
