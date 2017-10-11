import Vue from 'vue';
import Vuex from 'vuex';

import Board from '../models/board.model';
import Cell from '../models/cell.model';

import { getNeighbours, cloneCells, nextCycle, nextCycleIsDifferent, animate } from './utils';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    board: new Board(),
    cells: (new Board()).generateCells(),
    cycles: 0,
    timerId: null,
    initialThrottle: 0,
    currentThrottle: 0
  },
  getters: {
    board: state => {
      return state.board
    },
    cells: state => {
      return state.cells
    },
    cell: state => ({x, y}) => {
      return state.cells[x][y];
    },
    cellSize: state => {
      return state.board.cellSize;
    },
    timerId: state => {
      return state.timerId;
    },
    cycles: state => {
      return state.cycles;
    },
    activeCells: state => {
      return (
        state.cells
          .reduce((a, b) => {
            return a.concat(b);
          }, [])
          .reduce((a, b) => {
            return a + Number(b.isActive);
          }, 0)
      )
    },
    birth: state => {
      return (
        state.cells
          .reduce((a, b) => {
            return a.concat(b);
          }, [])
          .reduce((a, b) => {
            return a + Number(b.isNewBorn);
          }, 0)
      )
    },
    death: state => {
      return (
        state.cells
          .reduce((a, b) => {
            return a.concat(b);
          }, [])
          .reduce((a, b) => {
            return a + Number(b.wasActive);
          }, 0)
      )
    },
    initialThrottle: state => {
      return state.initialThrottle;
    }
  },
  mutations: {
    setSizes: (state, newSizes) => {
      state.board = new Board(newSizes);
      state.board.autoAdjust();
      state.cells = state.board.generateCells(state.cells);
    },
    toggleCell: (state, {x, y}) => {
      state.cells[x][y].isActive = !state.cells[x][y].isActive;
    },
    randomizeCells: state => {
      for(let x = 0; x < state.cells.length; x++) {
        for(let y = 0; y < state.cells[0].length; y++) {
          let cell = state.cells[x][y];
          let randomNumber = ~~(Math.random() * 9);
          cell.isActive = randomNumber > 5 ? true : false;
        }
      }
    },
    setCells: (state, cells) => {
      state.cells = cells;
    },
    setThrottle: (state, value) => {
      state.initialThrottle = value;
    },
    decrementThrottle: (state, value) => {
      state.currentThrottle--;
    },
    resetThrottle: state => {
      state.currentThrottle = state.initialThrottle;
    },
    setTimer: (state, id) => {
      state.timerId = id;
    },
    clearTimer: state => {
      if(state.timerId) {
        cancelAnimationFrame(state.timerId);
        state.timerId = null;
      }
    },
    incrementCycles: state => {
      state.cycles++;
    },
    clearCells: state => {
      state.cells = state.board.generateCells();
      state.cycles = 0;
    }
  },
  actions: {
    setSizes: (context, newSizes) => {
      context.commit('setSizes', newSizes);
    },
    toggleCell: (context, {x, y}) => {
      context.commit('toggleCell', {x, y});
    },
    randomizeCells: context => {
      context.commit('randomizeCells');
    },
    setCells: (context, cells) => {
      context.commit('setCells', cells)
    },
    setThrottle: (context, value) => {
      context.commit('setThrottle', value);
    },
    decrementThrottle: context => {
      context.commit('decrementThrottle');
    },
    resetThrottle: context => {
      context.commit('resetThrottle');
    },
    setTimer: (context, id) => {
      context.commit('setTimer', id);
    },
    clearTimer: context => {
      context.commit('clearTimer');
    },
    incrementCycles: context => {
      context.commit('incrementCycles');
    },
    clearCells: context => {
      context.commit('clearTimer');
      context.commit('clearCells');
    },
    play: context => {
      if(!context.state.timerId) {
        animate(context);
      }
    },
    stop: context => {
      if(context.state.timerId) {
        context.commit('clearTimer');
      }
    }
  }
});

export default store;