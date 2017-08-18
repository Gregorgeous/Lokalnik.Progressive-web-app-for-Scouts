<template id="venueCalendar">
  <v-ons-page>

    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-back-button>homePage</v-ons-back-button>
      </div>
      <div class="center">{{ msg }}</div>
    </v-ons-toolbar>

    <div class="header">
      <img src="../assets/zoliborz_logo.png" alt="vue-logo">
    </div>

    <v-ons-list-title id="MainTitle">
      Tu będzie kalendarz hufca generowany ze strony hufca ...
    </v-ons-list-title>


    <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=imlnjv9e13vae9jqjqfikpfals%40group.calendar.google.com&amp;color=%235F6B02&amp;ctz=Europe%2FWarsaw" style="border-width:0" width="450" height="600" frameborder="0" scrolling="yes"></iframe>

  </v-ons-page>
</template>

<script>
export default {
  name: 'venueCalendar',
  template: '#venueCalendar',
  data () {
    return {
      msg: 'Lokalnik',
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

iframe{
  margin: auto, auto;
}
</style>
