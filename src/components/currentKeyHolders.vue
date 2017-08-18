<template id="currentKeyHolders">
  <v-ons-list-item>
    <div class="left">
          <v-ons-icon icon="md-face" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">
          {{keyHolderName}} {{keyHolderSurname}}
        </div>
  </v-ons-list-item>
</template>
<script>
export default {
  name: "currentKeyHolders",
  template: '#keysFinder',
  props: ['keyHolderName','keyHolderSurname'],
  data: () => ({

  })
}
</script>
<style scoped>
</style>
