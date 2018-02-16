<template id="createEventDialog">
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title class="title text-xs-center">Informacje dot. wydarzenia: </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-layout>
          <v-flex>
            <v-subheader class="pl-0">
              Kategoria wydarzenia
            </v-subheader>
            <v-select :items="sectionTitlesArray" v-model="formData.organizer" label="Select" single-line bottom></v-select>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-subheader class="pl-0">
              Nazwa wydarzenia
            </v-subheader>
            <v-text-field label='np."Herbatka namiestnictwa"' v-model='formData.title'></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-subheader class="pl-0">
              Opis wydarzenia:
            </v-subheader>
            <v-text-field multi-line textarea v-model='formData.description'></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-subheader class="pl-0">
              Data wydarzenia
            </v-subheader>
            <v-dialog ref="dialog1" v-model="modal" lazy full-width width="270px" :return-value.sync="formData.date">
              <v-text-field slot="activator" label="Dzień wydarzenia" v-model="formData.date" prepend-icon="event" readonly></v-text-field>
              <v-date-picker locale='pl' v-model="formData.date" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal=false">Anuluj</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog1.save(formData.date)">Wybierz</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-subheader class="pl-0">
              Godzina wydarzenia
            </v-subheader>
            <v-dialog ref="dialog2" v-model="modal2" lazy full-width width="270px" :return-value.sync="formData.time">
              <v-text-field slot="activator" label="O której chcesz zacząć" v-model="formData.time" prepend-icon="access_time" readonly></v-text-field>
              <v-time-picker v-model="formData.time" actions format="24hr">
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal2=false">Anuluj</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog2.save(formData.time)">Wybierz</v-btn>
              </v-time-picker>
            </v-dialog>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-subheader class="pl-0">
              Miejsce
            </v-subheader>
            <v-text-field label='np."hufiec"' v-model="formData.where"></v-text-field>
          </v-flex>
        </v-layout>
        <v-alert class="red text-xs-center" icon="warning" :value="errorInForm" style="border-radius:5px">
          Nie wypełniono jakiegoś pola!
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat class="orange--text" @click.native="closeDialog">Anuluj</v-btn>
        <v-btn class="orange--text" flat @click.native="sendData"> Utwórz!</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    template: '#createEventDialog',
    props: ['dialog', 'sectionTitlesArray'],
    data() {
      return {
        menu: false,
        modal: false,
        modal2: false,
        errorInForm: false,
        formData: {
          organizer: null,
          title: null,
          description: null,
          date: null,
          time: null,
          where: null,
        }
      }
    },
    methods: {
      // IDEA: We can't mutate dialog prop (e.g. doing @click= "dialog = false"). It's breaking the "one way data flow". We must do it via $emit plus add ".sync" mod of prop in the parent component.
      closeDialog() {
        this.$emit('update:dialog', false);
      },
      sendData() {
        this.formData['imageUrl'] = 'https://static.pexels.com/photos/7096/people-woman-coffee-meeting.jpg';
        console.log('my form data', this.formData);
        for (var field in this.formData) {
          if (this.formData[field] === null || this.formData[field] == 0) {
            console.log("błąd!");
            return this.errorInForm = true;
          }
        }

        // If the loop didn't stop the method, form is fulfilled, so make the errorInForm false.
        this.errorInForm = false;

        this.$store.dispatch('uploadNewEventToFB', this.formData);

        // IDEA: we need to initiate whole new empty object, otherwise, due to JS object/array reference nature, we will overwrite the already stored vuex objects.
        this.formData = {
          organizer: null,
          title: null,
          description: null,
          date: null,
          time: null,
          where: null,
        };
        this.closeDialog();
      }
    },
    computed: {}
  }

</script>

<style scoped>


</style>
