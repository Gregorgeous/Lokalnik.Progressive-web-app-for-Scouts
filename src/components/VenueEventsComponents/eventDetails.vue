<template>
  <div id="eventDetails">
    <v-layout v-if="ourEvent === false">
      <h3>Nie ma takiego eventu</h3>
    </v-layout>
    <v-layout v-else>
      <h3> Jest !</h3>
    </v-layout>
  </div>
</template>
<script>
export default {
  name: "eventDetails",
  props: ['event_id'],
  data () {
    return {
      ourEvent: null
    }
  },
  computed: {
    vState (){
      return this.$store.state;
    }
  },
  methods: {
    searchVuexForEvent() {
      function digin(sectionDB){
        if (sectionDB.length>0) {
          sectionDB.forEach((object) => {
            if (object.ID == this.event_id) {
              this.ourEvent = object;
            }
          })
        }
      }
      digin(this.vState.generalEventsDB);
      digin(this.vState.cubScoutsEventsDB);
      digin(this.vState.scoutsEventsDB);
      digin(this.vState.explorersEventsDB);
      digin(this.vState.roversEventsDB);
    }
  },
  created() {
    //do something after creating vue instance
    this.searchVuexForEvent();
    console.log("my object", this.ourEvent);
  }
}
</script>
<style scoped>
</style>
