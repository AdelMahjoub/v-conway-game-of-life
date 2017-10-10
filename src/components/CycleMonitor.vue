<template>
  <div id="cycle-monitor">
    <span>{{ cycles }} generations</span>
    <br>
    <span>{{ activeCells }} total live cells</span>
    <br>
    <span>{{ death }} death / generation</span>
    <hr>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'cycle-monitor',
  computed: {
    ...mapGetters([ 
      'cycles',
      'activeCells',
      'death'
    ])
  }
}
</script>

<style scoped>

</style>
