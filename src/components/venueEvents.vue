<template id="venueEvents">
  <div >

  <v-container>
    <h3 class="text-xs-center mt-2 px-4 headline">
      Tu będą wyświetlać się eventy w lokalu hufca w obecnym tygodniu:
    </h3>
    <v-divider ></v-divider>
    <v-subheader style="font-style:italic; text-decoration:underline" >Wydarzenia ogólne</v-subheader>
    <v-layout row>
    <v-card>
        <v-card-media src="https://static.pexels.com/photos/7096/people-woman-coffee-meeting.jpg" height="100px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline text-xs-center">Przykładowe wydarzenie</h3>
            <div class="text-xs-center">Zapraszamy do hufca na super wydarzenie które będzie bardzo super i w ogóle będzie super </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-layout row>
            <v-flex >
          <v-btn flat class="orange--text" >Szczegóły</v-btn>
          <v-btn flat class="orange--text">Biorę udział!</v-btn>
        </v-flex>
        </v-layout>
        </v-card-actions>
      </v-card>
    </v-layout>

    <v-divider class="mt-4"></v-divider>
    <v-subheader style="font-style:italic; text-decoration:underline" >Wydarzenia NH</v-subheader>
    <v-layout row>
    <v-card>
        <v-card-media src="https://static.pexels.com/photos/7096/people-woman-coffee-meeting.jpg" height="100px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline text-xs-center">Przykładowe wydarzenie NH</h3>
            <div class="text-xs-center">Zapraszamy do hufca na super wydarzenie które będzie bardzo super i w ogóle będzie super </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-layout row>
            <v-flex >
          <v-btn flat class="orange--text" >Szczegóły</v-btn>
          <v-btn flat class="orange--text">Biorę udział!</v-btn>
        </v-flex>
        </v-layout>
        </v-card-actions>
      </v-card>
    </v-layout>


  </v-container>

      <v-card class="mt-5">
      <v-bottom-nav
        absolute
        value="true"
        :class="{
          'blue-grey': e2 === 1,
          'teal': e2 === 2,
          'brown': e2 === 3,
          'brown lighten-1': e2 === 4
        }"
      >
        <v-btn dark @click="e2 = 1" :value="e2 === 1">
          <span>Utwórz wydarzenie</span>
          <v-icon>fa-child</v-icon>
        </v-btn>
        <v-btn dark @click="e2 = 4" :value="e2 === 4">
          <span>W których biorę udział</span>
          <v-icon>fa-user</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-card>


</div>
</template>

<script>
export default {
  name: 'venueEvents',
  template: '#venueEvents',
  data () {
    return {
      msg: 'Lokalnik',
      e2: '2'
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
</style>
