<template id="currentKeyHolders">
  <v-list two-line>
            <v-list-tile avatar >
              <v-list-tile-avatar>
                <i class="fa fa-user-circle-o fa-3x" aria-hidden="true"></i>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title >
                  {{keyHolderName}} {{keyHolderSurname}}
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  Info np. "Mam klucze do godz 20"
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

  </v-list>



  <!-- <v-ons-list-item>
    <div class="left">
          <v-ons-icon icon="md-face" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">
          {{keyHolderName}} {{keyHolderSurname}}
        </div>
  </v-ons-list-item> -->
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
