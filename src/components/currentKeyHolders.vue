<template id="currentKeyHolders">
  <v-list two-line id="keyholdersList">
    <v-list-tile avatar >
      <v-list-tile-avatar>
        <i class="fa fa-user-circle fa-3x" aria-hidden="true"></i>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title >
          {{keyHolderName}} {{keyHolderSurname}}
        </v-list-tile-title>
        <v-list-tile-sub-title>
          {{keyHolderNote}}
        </v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>

   
   
    
    
    
  </v-list>
</template>
<script>
export default {
  name: "currentKeyHolders",
  template: '#keysFinder',
  props: ['keyHolderName','keyHolderSurname', 'keyHolderNote'],
  data: () => ({

  })
}
</script>
<style scoped>
#keyholdersList{
  margin-bottom: 50px;
}
</style>
