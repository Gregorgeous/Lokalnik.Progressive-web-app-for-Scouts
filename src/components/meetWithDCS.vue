<template id="meetWithDCS">
  <v-container>
    <h3 class="text-xs-center px-4 headline">
      Masz sprawę do komendanta i chcesz się z nim spotkac na dyżurze
    </h3>
    <p class="text-xs-center">Daj mu znać w jakiej sprawie i o której chciałbyś przyjść:</p>
    <v-divider></v-divider>

    <v-layout row>
      <v-flex xs4 class="mt-2">
        <v-subheader>Jak ważna sprawa?</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-select v-bind:items="items" v-model="appointmentImportancy" label="Jak ważne?" single-line auto append-icon="fa-commenting-o "
          hide-details></v-select>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs4 class="mt-2">
        <v-subheader>O której chcesz przyjść?</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-dialog v-model="modal2" lazy>
          <v-text-field slot="activator" v-model="appointmentTime" label="Chce przyjść o .." append-icon="fa-clock-o" readonly></v-text-field>
          <v-time-picker v-model="appointmentTime" actions format="24hr">
            <template slot-scope="{ save, cancel }">
              <!-- FIXME: find out why it's not currently showing (the production version does) -->
              <v-card>
                <v-card-actions>
                  <v-btn flat @click="cancel()">anuluj</v-btn>
                  <v-btn flat @click="save()">klik!</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-time-picker>
        </v-dialog>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs4 class="mt-2">
        <v-subheader>Na jak długo?</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-select v-bind:items="items2" v-model="appointmentDuration" label="Jak długo?" single-line auto append-icon="fa-handshake-o"
          hide-details></v-select>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12>
        <v-text-field name="input-1" label="Tu możesz wstępnie opisać sprawę" v-model="appointmentMessage" textarea></v-text-field>
      </v-flex>
    </v-layout>


    <v-layout row>
      <v-flex xs-6 offset-xs4>
        <v-btn round primary dark @click="emailDCS">
          Daj znać!
        </v-btn>
      </v-flex>
    </v-layout>

    <v-snackbar :timeout="timeout" :success="context === 'success'" :info="context === 'info'" :warning="context === 'warning'"
      :error="context === 'error'" :primary="context === 'primary'" :secondary="context === 'secondary'" :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'" v-model="snackbar">
      {{ text }}
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>

    <v-snackbar top right vertical v-model='information'>
      Ta sekcja na razie nie działa ale możesz wypróbować jak będzie funkcjonować :)
      <v-btn flat class='amber--text' @click="information = false">Zamknij wiadomość</v-btn>
    </v-snackbar>


  </v-container>
</template>

<script>
  export default {
    name: 'meetWithDCS',
    template: '#meetWithDCS',
    data() {
      return {
        information: false, //this is controlling visibility of temp. toast message informing that this view is still under development.
        appointmentImportancy: null,
        items: [
          'ważna i pilna!',
          'ważna, mało pilna',
          'pilna, mało ważna',
          'mało ważna,mało pilna'
        ],
        appointmentDuration: null,
        items2: [
          'Sprawa jest długa i złożona',
          'Do pół godziny..',
          'Zajmę tylko chwilę',
          'Trudno powiedzieć'
        ],
        appointmentTime: null,
        appointmentMessage: null,
        menu2: false,
        modal2: false,
        snackbar: false,
        context: 'success',
        mode: '',
        timeout: 2000,
        text: 'Dałeś znać Pawłowi - w razie co, skontakuje się z Tobą :) '
      }
    },
    methods: {
      emailDCS() {
        this.snackbar = true;
        let appointmentImportancy = 
        this.appointmentImportancy? this.appointmentImportancy : "Nie sprecyzowano ważności spotkania" ;

        let appointmentTime = 
        this.appointmentTime? this.appointmentTime : "Nie podano kiedy";
        
        let appointmentDuration =
         this.appointmentDuration? this.appointmentDuration: "Nie podano na jak długo";
        let appointmentMessage = 
        this.appointmentMessage? this.appointmentMessage : "";
        this.$store.dispatch('emailDCS', 
        {appointmentImportancy,
        appointmentTime, 
        appointmentDuration, 
        appointmentMessage})
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    },
    mounted() {
      //do something after mounting vue instance
      this.information = true;
    },
    created(){
      if(!this.$store.state.user.email){
        this.$store.dispatch('checkIfLoggedUser', null);
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


  #MainTitle {
    text-align: center;
  }

</style>
