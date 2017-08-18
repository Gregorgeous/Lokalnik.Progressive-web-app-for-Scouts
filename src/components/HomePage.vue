<template id="homePage">
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="center">{{ msg }}</div>
    </v-ons-toolbar>

    <div class="header">
      <img src="../assets/zoliborz_logo.png" alt="vue-logo">
    </div>

    <v-ons-list-title id="MainTitle">Wybierz co chcesz zrobic</v-ons-list-title>
    <v-ons-row>
      <v-ons-col>
        <v-ons-card @click="keysFinderLink">
          <div class="title">
            Znajdz kto ma klucze do hufca
          </div>
          <div class="content">
            <i class="fa fa-key fa-5x" aria-hidden="true"></i>
          </div>
        </v-ons-card>
      </v-ons-col>
      <v-ons-col>
        <v-ons-card @click="venueEventsLink">
        <div class="title">
          Wydarzenia w hufcu
        </div>
        <div class="content">
          <i class="fa fa-comments-o fa-5x" aria-hidden="true"></i>
        </div>
        </v-ons-card>
      </v-ons-col>
    </v-ons-row>
    <v-ons-row>
      <v-ons-col>
        <v-ons-card @click="bookVenueLink">
          <div class="title">
            Zarezerwuj lokal
          </div>
          <div class="content">
            <i class="fa fa-calendar-plus-o fa-5x" aria-hidden="true"></i>
          </div>
        </v-ons-card>
      </v-ons-col>
      <v-ons-col>
        <v-ons-card @click="venueCalendarLink">
          <div class="title">
            Kalendarz lokalu
          </div>
          <div class="content">
            <i class="fa fa-calendar fa-5x" aria-hidden="true"></i>
          </div>
        </v-ons-card>
      </v-ons-col>
    </v-ons-row>
    <v-ons-row>
      <v-ons-col>
      <v-ons-card @click="meetWithDCSLink">
        <div class="title">
          Mam sprawę do komendanta
        </div>
        <div class="content">
          <i class="fa fa-address-card-o fa-5x" aria-hidden="true"></i>
        </div>
      </v-ons-card>
    </v-ons-col>
    </v-ons-row>
  </v-ons-page>
</template>

<script>
import keysFinder from './keysFinder'
import venueEvents from './venueEvents'
import bookVenue from './bookVenue'
import venueCalendar from './venueCalendar'
import meetWithDCS from './meetWithDCS'

export default {
  name: 'homePage',
  template: '#homePage',
  data () {
    return {
      msg: 'Lokalnik'
    }
  },
  computed: {
    myArray(){
      return this.$store.state.mojaArray;
    },
    pageStack(){
      return this.$store.state.pageStack;
    }
  },
  methods: {
    keysFinderLink:function () {
      this.pageStack.push(keysFinder);
    },
    venueEventsLink:function () {
      this.pageStack.push(venueEvents);
    },
    bookVenueLink:function () {
      this.pageStack.push(bookVenue);
    },
    venueCalendarLink:function () {
      this.pageStack.push(venueCalendar);
    },
    meetWithDCSLink:function () {
      this.pageStack.push(meetWithDCS);
    }
  },
  components: {
    'keys-finder': keysFinder,
    'venue-events': venueEvents,
    'book-venue': bookVenue,
    'venue-calendar': venueCalendar,
    'meet-with-dcs': meetWithDCS
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
