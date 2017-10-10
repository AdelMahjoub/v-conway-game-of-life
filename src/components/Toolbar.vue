<template>
  <div id="toolbar">
    <div
    :key="key" 
    v-for="(value, key) in board"
    v-if="settableSizes.includes(key)">
      <label>{{ key }}</label>
      <input
      @input="resize"
      :name="key"
      :value="board[key]"
      :min="board[`${key}Min`]"
      :max="board[`${key}Max`]"
      type="range">
      <span>{{ value }} px</span>
    </div>
    <hr>
      <button @click="handleRandomizeClick">Randomize</button>
      <br>
      <button @click="nextCycle">Next</button>
      <br>
      <button @click="play">Play</button>
      <br>
      <button @click="stop">Stop</button>
      <br>
      <button @click="clear">Clear</button>
    <hr>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import eventBus from '../store/eventBus';

export default {
  name: 'toolbar',
  data() {
    return {
      settableSizes: ['width', 'height', 'cellSize'],
    }
  },
  computed: {
    ... mapGetters([ 
      'board', 
    ]),
  },
  methods: {
    ... mapActions([ 
      'setSizes', 
      'randomizeCells',
      'clearCells'
    ]),
    handleRandomizeClick() {
      this.randomizeCells();
    },
    resize(e) {
      const name = e.target.name;
      const value = parseInt(e.target.value, 10);
      // set board[concerned property] new size
      // unchanged properties are carried over
      this.setSizes(Object.assign({}, this.board, {[name]: value}));
    },
    nextCycle() {
      eventBus.$emit('nextCycle');
    },
    play() {
      eventBus.$emit('play');
    },
    stop() {
      eventBus.$emit('stop');
    },
    clear() {
      this.clearCells();
    }
  },
  mounted() {
    // Initialize maximum board width and maximum board height on mount
    const widthMax = this.$el.offsetWidth;
    const heightMax = widthMax;
    this.setSizes(Object.assign({}, this.board, { widthMax, heightMax }));
    // Set maximum board width and maximum board height on screen resize
    window.addEventListener('resize', () => {
      const widthMax = this.$el.offsetWidth;
      const heightMax = widthMax;
      this.setSizes(Object.assign({}, this.board, { widthMax, heightMax }));
    });
  }
}
</script>

<style scoped>

</style>
