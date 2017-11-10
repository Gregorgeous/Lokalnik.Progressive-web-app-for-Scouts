<template>
  <v-ons-page>
    <v-ons-list-title>Onsen UI Essential Links</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item modifier="chevron" v-for="item in essentialLinks" @click="goTo(item.link)" :key="item.link">
        <div class="left"><v-ons-icon fixed-width :icon="item.icon"></v-ons-icon></div>
        <div class="center">{{ item.label }}</div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
export default {
  name: 'menu',
  data () {
    return {
      essentialLinks: [
        {
          label: 'Zdobądz klucze',
          link: '#',
          icon: 'fa-key'
        },
        {
          label: 'Wydarzenia w lokalu',
          link: '#',
          icon: 'fa-comments-o'
        },
        {
          label: 'Zarezerwuj lokal',
          link: '#',
          icon: 'fa-calendar-plus-o'
        },
        {
          label: 'Kalendarz lokalu',
          link: '#',
          icon: 'fa-calendar'
        },
        {
          label: 'Miej sprawę do komendanta',
          link: '#',
          icon: 'fa-address-card-o'
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
  margin-bottom: 20px;
}

img {
  max-width: 150px;
}

ons-list-item {
  cursor: pointer;
}
</style>
