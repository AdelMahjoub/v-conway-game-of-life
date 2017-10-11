<template>
  <div
  id="grid"
  class="board"
  :style="boardStyle()">
    <div
    v-for="col in board.columns"
    :key="`column-${col - 1}`">
      <div 
      class="cell"
      @click="handleCellClick"
      v-for="row in board.rows"
      :key="`cell-${col - 1},${row - 1}`"
      :data-x="col - 1"
      :data-y="row - 1"
      :class="{'was-active': cells[col - 1][row - 1].wasActive,'cell-active': cells[col - 1][row - 1].isActive}"
      :style="cellStyle(col - 1, row - 1)"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'grid',
  data() {
    return {

    }
  },
  computed: {
    ... mapGetters([ 
      'board',
      'cells'
    ]),
  },
  methods: {
    ... mapActions([
      'toggleCell', 
    ]),
    handleCellClick(e) {
      const x = parseInt(e.target.getAttribute('data-x'), 10);
      const y = parseInt(e.target.getAttribute('data-y'), 10);
      this.toggleCell({x, y});
    },
    cellStyle(x, y) {
      return {
        top: `${~~(y * this.board.cellSize)}px`,
        left: `${~~(x * this.board.cellSize)}px`,
        width: `${~~(this.board.cellSize)}px`,
        height:`${~~(this.board.cellSize)}px`
      }
    },
    boardStyle() {
      return {
        width: `${this.board.width}px`,
        height: `${this.board.height}px`
      }
    }
  }
}
</script>

<style scoped>
  .board {
    position: relative;
    padding:0;
    margin: 0;
  }
  .cell {
    position: absolute;
    border: .2px solid #eee;
    padding: 0;
    margin: 0;
  }
  .cell-active {
    background-color: green;
  }
  .was-active {
    background-color: darkgoldenrod;
  }
</style>
