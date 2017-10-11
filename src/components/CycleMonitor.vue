<template>
  <div id="cycle-monitor">
    <div class="level is-mobile">
      <div class="level-item has-text-centered has-text-info">
        <div>
          <p class="heading">Generations</p>
          <p class="title">{{ cycles }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered has-text-success">
        <div>
          <p class="heading">Total alive</p>
          <p class="title">{{ activeCells }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered has-text-danger">
        <div>
          <p class="heading">Death rate</p>
          <p class="title">{{ death }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered has-text-primary">
        <div>
          <p class="heading">Birth rate</p>
          <p class="title">{{ birth }}</p>
        </div>
      </div>
    </div>
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
      'death',
      'birth'
    ])
  }
}
</script>

<style scoped>

</style>
