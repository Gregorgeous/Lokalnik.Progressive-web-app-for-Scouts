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
            <v-select
            :items="sectionTitlesArray"
            v-model="formData.organizer"
            label="Select"
            single-line
            bottom
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-subheader class="pl-0">
              Nazwa wydarzenia
            </v-subheader>
            <v-text-field
            label='np."Herbatka namiestnictwa"'
            v-model = 'formData.title' ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-subheader class="pl-0">
              Opis wydarzenia:
            </v-subheader>
            <v-text-field
              multi-line
              textarea
              v-model = 'formData.description'
              box
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-subheader class="pl-0">
              Data wydarzenia
            </v-subheader>
            <v-menu
            lazy
            :close-on-content-click="false"
            v-model="menu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-right="40"
            max-width="290px"
            min-width="290px"
            full-width
            :nudge-left='25'
            :nudge-top='200'
            >
            <v-text-field
            slot="activator"
            label="wybierz datę"
            v-model="formData.date"
            prepend-icon="event"
            readonly>
          </v-text-field>
          <v-date-picker
          v-model="formData.date"
          no-title scrollable :actions='false'
          locale="pl"
          autosave
          :first-day-of-week="1">
        </v-date-picker>
      </v-menu>
    </v-flex>
  </v-layout>
  <v-layout>
    <v-flex>
      <v-subheader class="pl-0">
        Godzina wydarzenia
      </v-subheader>
      <v-dialog
      persistent
      v-model="modal2"
      lazy
      full-width>
      <v-text-field
      slot="activator"
      label="Picker in dialog"
      v-model="formData.time"
      prepend-icon="access_time"
      readonly
      ></v-text-field>
      <v-time-picker v-model="formData.time" actions format="24hr">
        <template scope="{ save, cancel }">
          <v-card-actions>
            <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
            <v-btn flat color="primary" @click="save">Save</v-btn>
          </v-card-actions>
        </template>
      </v-time-picker>
    </v-dialog>
  </v-flex>
</v-layout>
<v-layout>
  <v-flex>
    <v-subheader class="pl-0">
      Miejsce
    </v-subheader>
    <v-text-field
    label='np."hufiec"'
    v-model="formData.where"></v-text-field>
  </v-flex>
</v-layout>
<v-alert class="red text-xs-center" icon="warning" :value="errorInForm" style="border-radius:5px">
Nie wypełniono jakiegoś pola!
</v-alert>
</v-card-text>
<v-card-actions>
  <v-spacer></v-spacer>
  <v-btn  flat class="orange--text" @click.native="closeDialog">Anuluj</v-btn>
  <v-btn  class="orange--text" flat @click.native="sendData"> Utwórz!</v-btn>
</v-card-actions>
</v-card>
</v-dialog>
</template>

<script>
export default {
  template: '#createEventDialog',
  props: ['dialog', 'sectionTitlesArray'],
  data () {
    return {
      menu:false,
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
    sendData(){
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
  computed:{
  }
}
</script>

<style scoped>
</style>
