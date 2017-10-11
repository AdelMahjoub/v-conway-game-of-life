import Vue from 'vue';
import Vuex from 'vuex';

import Board from '../models/board.model';
import Cell from '../models/cell.model';

import { getNeighbours, cloneCells, nextCycle, nextCycleIsDifferent } from './utils';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    board: new Board(),
    cells: (new Board()).generateCells(),
    cycles: 0,
    timerId: null,
    fps: 15
  },
  getters: {
    board: state => {
      return state.board
    },
    cells: state => {
      return state.cells
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
    fps: state => {
      return state.fps;
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
    setFps: (state, fps) => {
      state.fps = fps;
    },
    setTimer: (state, id) => {
      state.timerId = id;
    },
    clearTimer: state => {
      if(state.timerId) {
        clearInterval(state.timerId);
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
    setFps: (context, fps) => {
      context.commit('setFps', fps);
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
        let timer = setInterval(() => {
          const next = nextCycle(context.state.cells)
          if(nextCycleIsDifferent(context.state.cells, next)) {
            context.commit('setCells', next);
            context.commit('incrementCycles');
          } else {
            clearInterval(timer);
            timer = null
            context.commit('clearTimer');
          }
        }, ~~(1000/context.state.fps));
        context.commit('setTimer', timer);
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