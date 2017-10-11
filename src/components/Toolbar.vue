<template>
  <div id="toolbar">
    <label>width</label>
    <input
    @input="resize"
    name="width"
    :value="board.width"
    :min="board.widthMin"
    :max="board.widthMax"
    type="range">
    <span>{{ board.width }} px</span>
    <hr>
      <button @click="handleRandomizeClick">Randomize</button>
      <br>
      <button @click="play">Play</button>
      <br>
      <button @click="stop">Stop</button>
      <br>
      <button @click="clearCells">Clear</button>
    <hr>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'toolbar',
  computed: {
    ... mapGetters([ 
      'board', 
    ]),
  },
  methods: {
    ... mapActions([ 
      'setSizes', 
      'randomizeCells',
      'clearCells',
      'play',
      'stop'
    ]),
    handleRandomizeClick() {
      this.randomizeCells();
    },
    resize(e) {
      const name = e.target.name;
      const value = parseInt(e.target.value, 10);
      this.setSizes(Object.assign({}, this.board, {[name]: value}));
    }
  },
  mounted() {
    const widthMax = this.$el.offsetWidth;
    this.setSizes(Object.assign({}, this.board, { widthMax }));
    
    window.addEventListener('resize', () => {
      const widthMax = this.$el.offsetWidth;
      this.setSizes(Object.assign({}, this.board, { widthMax }));
    });
  }
}
</script>

<style scoped>

</style>
