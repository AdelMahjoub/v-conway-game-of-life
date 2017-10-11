<template>
  <div>
    <div class="level">
        <div class="level-item">
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input type="checkbox" v-model="showDeath">
                <span class="tag is-danger">show death</span>
              </label>
            </div>
          </div>
        </div>
        <div class="level-item">
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input type="checkbox" v-model="showNewBorn">
                <span class="tag is-primary">show new born</span>
              </label>
            </div>
          </div>
        </div>
        <div class="level-item">
          <div class="field has-text-centered">
            <label class="label is-small">Active</label>
            <p class="control">
              <input :disabled="timerId" type="color" v-model="activeColor">
            </p>
          </div>
        </div>
        <div class="level-item">
          <div class="field has-text-centered">
            <label class="label is-small">Death</label>
            <p class="control">
              <input :disabled="timerId" type="color" v-model="deathColor">
            </p>
          </div>
        </div>
        <div class="level-item">
          <div class="field has-text-centered">
            <label class="label is-small">Born</label>
            <p class="control">
              <input :disabled="timerId" type="color" v-model="newBornColor">
            </p>
          </div>
        </div>
    </div>
    <hr>
    <div class="columns">
      <div class="column is-8 is-offset-2">
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
            :style="[
              cellStyle(col - 1, row - 1),
              cells[col - 1][row - 1].wasActive && showDeath ? deathStyle(): '',
              cells[col - 1][row - 1].isActive ? activeStyle() : '', 
              cells[col - 1][row - 1].isNewBorn && showNewBorn ? newBornStyle() : ''
            ]"></div>
          </div>
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'grid',
  data() {
    return {
      showDeath: true,
      showNewBorn: true,
      activeColor: '#23d160',
      deathColor: '#ff3860',
      newBornColor: '#00d1b2'
    }
  },
  computed: {
    ... mapGetters([ 
      'board',
      'cells',
      'timerId'
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
    activeStyle() {
      return {
        backgroundColor: this.activeColor
      }
    },
    deathStyle() {
      return {
        backgroundColor: this.deathColor
      }
    },
    newBornStyle() {
      return {
        backgroundColor: this.newBornColor
      }
    },
    boardStyle() {
      return {
        width: `${this.board.width}px`,
        height: `${this.board.height}px`,
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
    border: .2px solid whitesmoke;
    padding: 0;
    margin: 0;
  }
</style>
