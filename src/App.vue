<template>
  <div id="app">
    <toolbar></toolbar>
    <cycle-monitor></cycle-monitor>
    <grid></grid>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

import eventBus from './store/eventBus';
import Cell from './models/cell.model.js';

import Toolbar from './components/Toolbar';
import Grid from './components/Grid';
import CycleMonitor from './components/CycleMonitor';

export default {
  name: 'app',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'cells', 
      'timerId'
    ])
  },
  components: {
    Toolbar,
    Grid,
    CycleMonitor
  },
  methods: {
    ...mapActions([
      'setCells',
      'setTimer',
      'clearTimer',
      'incrementCycles'
    ]),
    // Return a cell's surroundings cells sums
    getNeighbours(posX, posY, matrix) {
      let neighbours = [];
      for(let x = posX - 1; x <= (posX + 1); x++) {
        for(let y = posY - 1; y <= (posY + 1); y++) {
          if((x >= 0 && y >= 0) && (x !== posX || y !== posY) && (x < matrix.length && y < matrix[0].length)) {
            neighbours.push(Number(matrix[x][y].isActive));
          }
        }
      }
      return neighbours.reduce((a, b) => a + b, 0);
    },
    // Clone a 2D array of Cell instances
    cloneCells() {
      let clone = [];
      for(let x = 0; x < this.cells.length; x++) {
        clone[x] = [];
        for(let y = 0; y < this.cells[0].length; y++) {
          clone[x][y] = new Cell(this.cells[x][y]);
        }
      }
      return clone;
    },
    // Return the next cycle cells according to conway logic
    nextCycle() {
      let nextMatrix = this.cloneCells();
      for(let x = 0; x < this.cells.length; x++) {
        for(let y = 0; y < this.cells[0].length; y++) {
          let currentCell = Number(this.cells[x][y].isActive);
          let cellFate = this.getNeighbours(x, y, this.cells)
          switch(currentCell) {
            case 1:
              if(cellFate < 2 || cellFate > 3) {
                nextMatrix[x][y].isActive = false;
                nextMatrix[x][y].wasActive = true;
              }
              break;
            case 0:
              if(cellFate === 3) {
                nextMatrix[x][y].isActive = true;
              }
              nextMatrix[x][y].wasActive = false;
              break;
            default:
          }
        }
      }
      return nextMatrix;
    },
    // Check if two cycles are different
    nextCycleIsDifferent(nextCycle) {
      let changes = 0;
      for(let x = 0; x < this.cells.length; x++) {
        for(let y = 0; y < this.cells[0].length; y++) {
          if(nextCycle[x][y].isActive !== this.cells[x][y].isActive) {
            changes++;
            break;
          }
        }
        if(changes) {
          break;
        }
      }
      return changes > 0;
    }
  },
  mounted() {
    eventBus.$on('nextCycle', () => {
      const nextCycle = this.nextCycle();
      if(this.nextCycleIsDifferent(nextCycle)) {
        this.setCells(nextCycle);
      }
    });
    eventBus.$on('play', () => {
      if(!this.timerId) {
        let timer = setInterval(() => {
          const nextCycle = this.nextCycle();
          if(this.nextCycleIsDifferent(nextCycle)) {
            this.setCells(nextCycle);
            this.incrementCycles();
          } else {
            clearInterval(timer);
            timer = null
            this.clearTimer(); // Clear store timer
          }
        }, ~~(1000/15));
        this.setTimer(timer); // Set store timer
      }
    });
    eventBus.$on('stop', () => {
      if(this.timerId) {
        this.clearTimer(); // Clear store timer
      }
    });
  }
}
</script>

<style>
  
</style>