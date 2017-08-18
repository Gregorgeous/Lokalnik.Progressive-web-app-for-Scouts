<template id="main">
    <v-ons-navigator swipeable
    :page-stack="pageStack"
    :pageStack="pageStack"
    :proba="proba">
    </v-ons-navigator>
</template>

<script>
import HomePage from './components/HomePage'

export default {
  template: '#main',
  computed:{
  },
  components: {
    'home-page': HomePage
  },
  data () {
    return {
      msg: 'Lokalnik',
      menuIsOpen: false,
      // pageStack: [HomePage],
      proba: ['abc']
    }
  },
  computed:{
    pageStack(){
      return this.$store.state.pageStack
    }
  },
  methods: {
    keysFinderLink:function () {
      // this.pageStack.push({
      //   extends: keysFinder,
      //   data() {
      //     return {
      //       toolbarInfo: {
      //         backLabel: 'Home',
      //         title: 'keysFinder'
      //       }
      //     }
      //   }
      // });
      console.log('działam');
      // console.log(this.$store.state.mojaArray);
      // this.pageStack.push(keysFinding);
    },
    venueEventsLink:function () {
      // $ons.notification.alert('Hello World!');
      console.log('działam');
    },
    reserveVenueLink:function () {
      // $ons.notification.alert('Hello World!');
      console.log('działam');
    },
    venueCalendarLink:function () {
      // $ons.notification.alert('Hello World!');
      console.log('działam');
    },
    businessToChiefScoutLink:function () {
      console.log('działam');
    }
  }
}
</script>

<style scoped>
ons-splitter-side[side=left][animation=overlay] {
  border-right: 1px solid #BBB;
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
