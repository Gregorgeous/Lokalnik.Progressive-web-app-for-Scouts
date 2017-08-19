<template id="bookVenue">
    <div>
      <h3 class="title mt-2 mx-4" >
        Wybierz co chcesz zrobic
      </h3>

      <v-switch label="Chcę zarezerwowac lokal hufca" v-model="switcher1" >
      </v-switch>

            <iframe  v-show="switcher1" src="https://docs.google.com/forms/d/1LlSxGIdxIRxrU6CVlKe2qIz3Fn8iq6Z-NBVTqg322M4/viewform?embedded=true" width="340" height="1320" frameborder="2" marginheight="0" marginwidth="0">Ładowanie...</iframe>
      <v-switch label="Chcę zarezerwowac rzutnik" v-model="switcher2" >
      </v-switch>


      <iframe v-show="switcher2" src="https://docs.google.com/forms/d/1Ik9fA8FpX8MMTbYdvT5RB0tEkwC84_hn-V14pH6nlQc/viewform?embedded=true" width="340" height="1320" frameborder="2" marginheight="0" marginwidth="0">Ładowanie...</iframe>

</div>
</template>

<script>
export default {
  name: 'bookVenue',
  template: '#bookVenue',
  data () {
    return {
      msg: 'Lokalnik',
      switcher1: false,
      switcher2: false
    }
  },
  methods: {
    showIframe(index,event) {
      if (index == '1') {
        this.switcher1 = event.value;
      }
      if (index == '2') {
        this.switcher2 = event.value;
      }
    }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
}
.switcher{
  width: 90%;
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
