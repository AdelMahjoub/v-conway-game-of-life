<template>
  <div id="toolbar">
    <div class="level">
      <div class="level-item">
        <div class="field has-addons">
          <p class="control">
            <a @click="handleRandomizeClick" class="button" title="randomize">
              <span class="icon is-small">
                <i class="fa fa-random"></i>
              </span>
            </a>
          </p>
          <p class="control">
            <a @click="play" class="button is-success" title="play">
              <span class="icon is-small">
                <i class="fa fa-play"></i>
              </span>
            </a>
          </p>
          <p class="control">
            <a @click="stop" class="button is-warning" title="pause">
              <span class="icon is-small">
                <i class="fa fa-pause"></i>
              </span>
            </a>
          </p>
          <p class="control">
            <a @click="clearCells" class="button is-danger" title="clear">
              <span class="icon is-small">
                <i class="fa fa-eraser"></i>
              </span>
            </a>
          </p>
        </div>
      </div>
      <div class="level-item">
        <div class="field">
          <div class="control has-text-centered">
            <label class="label is-small">Width</label>
            <input
            @input="resize"
            name="width"
            :value="board.width"
            :min="board.widthMin"
            :max="board.widthMax"
            type="range">
            <label class="label is-small">{{ board.width }} px</label>
          </div>
        </div>
      </div>
      <div class="level-item">
        <div class="field">
          <div class="control has-text-centered">
            <label class="label is-small">Throttle</label>
            <input
            @input="handleThrottle"
            :value="initialThrottle"
            min="0"
            max="12"
            type="range">
            <label class="label is-small">{{ initialThrottle }}</label>
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
  name: 'toolbar',
  computed: {
    ... mapGetters([ 
      'board',
      'timerId',
      'initialThrottle'
    ]),
  },
  methods: {
    ... mapActions([ 
      'setSizes', 
      'randomizeCells',
      'clearCells',
      'play',
      'stop',
      'setThrottle'
    ]),
    handleRandomizeClick() {
      this.randomizeCells();
    },
    resize(e) {
      const name = e.target.name;
      const value = parseInt(e.target.value, 10);
      this.setSizes(Object.assign({}, this.board, {[name]: value}));
    },
    handleThrottle(e) {
      const throttle = parseInt(e.target.value, 10);
      this.setThrottle(throttle);
    }
  },
  mounted() {
    const widthMax = this.$el.offsetWidth;
    this.setSizes(Object.assign({}, this.board, { widthMax }));
    
    window.addEventListener('resize', () => {
      const widthMax = this.$el.offsetWidth;
      this.setSizes(Object.assign({}, this.board, { widthMax }));
    });

    this.randomizeCells();
    this.play();
  }
}
</script>

<style scoped>
.slider {
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;   
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%; 
    background: #4CAF50;
    cursor: pointer;
}

.slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
}
</style>
