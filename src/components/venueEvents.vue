<template id="venueEvents">
  <div>
    <h3 class="text-xs-center mt-2 px-4 headline">
      Tu będą ładnie wyświetlac się eventy w lokalu hufca w obecnym tygodniu:
    </h3>

  </div>
</template>

<script>
export default {
  name: 'venueEvents',
  template: '#venueEvents',
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
</style>
