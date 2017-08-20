<template id="meetWithDCS">
  <v-container>
    <h3 class="text-xs-center px-4 headline">
      Masz sprawę do komendanta i chcesz się z nim spotkac na dyżurze
    </h3>
    <p class="text-xs-center">Daj mu znać w jakiej sprawie i o której chciałbyś przyjść:</p>
    <v-divider ></v-divider>

    <v-layout row >
      <v-flex xs4 class="mt-2">
        <v-subheader>Jak ważna sprawa?</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-select
          v-bind:items="items"
          v-model="e1"
          label="Jak ważne?"
          single-line
          auto
          append-icon="fa-commenting-o "
          hide-details
        ></v-select>
      </v-flex>
      </v-layout>

      <v-layout row >
        <v-flex xs4 class="mt-2">
          <v-subheader>O której chcesz przyjść?</v-subheader>
        </v-flex>
        <v-flex xs8>
          <v-dialog
          persistent
          v-model="modal2"
          lazy>
          <v-text-field
          slot="activator"
          v-model="e6"
          label="Chce przyjść o .."
          append-icon="fa-clock-o"
          readonly
        ></v-text-field>
        <v-time-picker v-model="e6" actions format="24hr">
          <template scope="{ save, cancel }">
            <v-card-actions>
              <v-btn flat primary @click="cancel()">anuluj</v-btn>
              <v-btn flat primary @click="save()">klik!</v-btn>
            </v-card-actions>
          </template>
        </v-time-picker>
      </v-dialog>
    </v-flex>
  </v-layout>

  <v-layout row >
    <v-flex xs4 class="mt-2">
      <v-subheader>Na jak długo?</v-subheader>
    </v-flex>
    <v-flex xs8>
      <v-select
        v-bind:items="items2"
        v-model="e2"
        label="Jak długo?"
        single-line
        auto
        append-icon="fa-handshake-o"
        hide-details
      ></v-select>
    </v-flex>
    </v-layout>

  <v-layout row>
    <v-flex xs12>
      <v-text-field
        name="input-1"
        label="Tu możesz wstępnie opisać sprawę"
        textarea
      ></v-text-field>
    </v-flex>
  </v-layout>


  <v-layout row>
    <v-flex xs-6 offset-xs4>
      <v-btn round primary dark @click="snackbar = true">Daj znać!</v-btn>
    </v-flex>
  </v-layout>

  <v-snackbar
      :timeout="timeout"
      :success="context === 'success'"
      :info="context === 'info'"
      :warning="context === 'warning'"
      :error="context === 'error'"
      :primary="context === 'primary'"
      :secondary="context === 'secondary'"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbar"
    >
      {{ text }}
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>


</v-container>
</template>

<script>
export default {
  name: 'meetWithDCS',
  template: '#meetWithDCS',
  data () {
    return {
      msg: 'Lokalnik',
      e1: null,
      items: [
        {text: 'ważna i pilna!' },
        {text: 'ważna, mało pilna' },
        {text: 'pilna, mało ważna' },
        {text: 'mało ważna,mało pilna' }
      ],
      e2: null,
      items2: [
        {text: 'Sprawa jest długa i złożona' },
        {text: 'Do pół godziny..' },
        {text: 'Zajmę tylko chwilę' },
        {text: 'Trudno powiedzieć' }
      ],
      e6: null,
      menu2: false,
      modal2: false,
      snackbar: false,
      context: 'success',
      mode: '',
      timeout: 2000,
      text: 'Dałeś znać Pawłowi - w razie co, skontakuje się z Tobą :) '
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
