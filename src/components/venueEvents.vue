<template id="venueEvents">
  <div>

    <v-container>
      <div class="text-xs-center">
        <h3 class=" mt-2 px-4 headline">
          Wybierz co chcesz widzieć:
        </h3>
        <v-menu  :nudge-right='5' bottom offset-y>
          <v-btn class="amber purple--text" slot="activator">Wybierz kategorię</v-btn>
          <v-list>
            <v-list-tile v-for="item in sections" :key="item.title" @click="displayTheRightSection(item)">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
      <v-divider class="mt-3"></v-divider>

<!-- COMPONENT 1  -->
      <sectionEvents
      v-if="!isInputFiltered"
      :sectionTitle='sectionTitle'
      :sectionVuexState='masterSection'>
    </sectionEvents>
<!--========================-->

<!-- COMPONENT 2  -->
      <eventsUserParticipates
      v-else
      :sectionVuexState='filteredEventsUserParticipates'>
    </eventsUserParticipates>
<!--========================-->

  </v-container>

<!-- COMPONENT 3  -->
  <createEventDialog
  :dialog.sync='dialogVisible'
  :sectionTitlesArray = 'propForCreateEventDialog'></createEventDialog>
<!--========================-->

    <v-bottom-nav
    absolute
    :value="isUserAGuest"
    :class="{
      'blue-grey': e2 === 1,
      'teal': e2 === 2,
      'brown': e2 === 3,
      'brown lighten-1': e2 === 4
      }"
      >
      <v-btn dark @click="createEvent" :value="e2 === 1">
        <span style="font-size:10px;">Nowe wydarzenie</span>
        <v-icon>fa-calendar-plus</v-icon>
      </v-btn>
      <v-btn dark
      @click="showAllSections"
      :value="e2 === 4">
        <span style="font-size:10px;">Wszystkie</span>
        <v-icon>fa-th-list</v-icon>
      </v-btn>
      <v-btn dark
      @click="showSectionsUserParticipates"
      :value="e2 === 2">
        <span style="font-size:10px;">W tym biorę udział</span>
        <v-icon>fa-user</v-icon>
      </v-btn>
    </v-bottom-nav>

</div>
</template>

<script>
import sectionEvents from './VenueEventsComponents/sectionEvents.vue'
import eventsUserParticipates from './VenueEventsComponents/eventsUserParticipates.vue'
import createEventDialog from './VenueEventsComponents/createEventDialog.vue'


export default {
  name: 'venueEvents',
  template: '#venueEvents',
  components: {
    sectionEvents,
    eventsUserParticipates,
    createEventDialog
  },
  data () {
    return {
      msg: 'Lokalnik',
      e2:4,
      sections: [
        {title: 'Wydarzenia ogólne', id:0},
        {title: 'Nam. zuchowe', id:1},
        {title: 'Nam. harcerskie', id:2},
        {title: 'Nam. starszoharcerskie', id:3},
        {title: 'Nam. wędrownicze', id:4},
      ],
      sectionTitle: 'wydarzenia ogolne',
      dialogVisible: false,
      initialSection: null,
      swapper: null,
      set: this.$store.state.generalEventsDB,
      isInputFiltered: false
    }
  },
  methods: {
    displayTheRightSection(theSection) {
      this.isInputFiltered = false;
      this.e2 = 4;
      switch (theSection.id) {
        case 0:
          this.sectionTitle = 'wydarzenia ogolne';
          this.masterSection = this.generalEvents;
          break;
        case 1:
          this.sectionTitle = 'wydarzenia namiestnictwa zuchowego';
          this.masterSection = this.cubScoutsEvents;
          break;
        case 2:
          this.sectionTitle = 'wydarzenia namiestnictwa harcerskiego';
          this.masterSection = this.scoutsEvents;
          break;
        case 3:
          this.sectionTitle = 'wydarzenia namiestnictwa starszoharcerskiego';
          this.masterSection = this.explorersEvents;
          break;
        case 4:
          this.sectionTitle = 'wydarzenia namiestnictwa wędrowniczego';
          this.masterSection = this.roversEvents;
          break;
        default:
        this.sectionTitle = 'wydarzenia ogolne';
        this.masterSection = this.generalEvents;
        break;
      }
    },
    createEvent(){
      this.e2 = 1;
      this.dialogVisible =true;
    },
    showAllSections (){
      this.e2 = 4;
      this.isInputFiltered = false;
    },
    showSectionsUserParticipates (){
      this.e2 = 2;
      this.isInputFiltered = true;
    }
  },
  computed:{
    // IDEA: behold! this is the stupidest workaround I've ever done ...
    // Because the data in state is reactive only via computed properties (if you put it in "data" it'll get only the value of state at that certain time != "reactive"), we need to set both setter and getters in masterSection computed, aand create 2 dummy variables in "data" - initialSection and "swapper" and an additional condition to prevent the initialSection from getting only one of the vuex.state variables.
    masterSection:{
      get: function(){
        this.initialSection = this.$store.state.generalEventsDB;
        if (this.swapper !== null) {
          this.initialSection = this.swapper;
        }
        return this.initialSection;},
      set: function(argument){
        this.swapper = argument;
        }
    },
    trololo () {
      this.initialSection = this.$store.state.generalEventsDB;
      return;
    },
    isUserAGuest (){return !this.$store.state.isUserAGuest;},
    generalEvents (){return this.$store.state.generalEventsDB;},
    cubScoutsEvents (){return this.$store.state.cubScoutsEventsDB;},
    scoutsEvents (){return this.$store.state.scoutsEventsDB;},
    explorersEvents (){return this.$store.state.explorersEventsDB;},
    roversEvents (){return this.$store.state.roversEventsDB;},
    propForCreateEventDialog(){
      // IDEA: somehow passing the whole "sections" object make it undefined in createEventDialog, so we adjust it here and send it in this form to the component
      let titlesArray = [];
      for (var i = 0; i < this.sections.length; i++) {
        titlesArray.push(this.sections[i].title);
      }
      return titlesArray;
    },
    filteredEventsUserParticipates(){
      return this.$store.getters.filterEventsUserParticipates;
    },
    filteredEventsUserIsAnEditor(){
      return this.$store.getters.filterEventsUserIsAnEditor;
    }
  },
  created() {
    this.$store.dispatch('checkIfLoggedUser', 'fetchCurrentEvents');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
