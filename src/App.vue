<template>
  <div id="app">
    <toolbar></toolbar>
    <cycle-monitor></cycle-monitor>
    <grid></grid>
  </div>
</template>


<script>
import Toolbar from './components/Toolbar';
import Grid from './components/Grid';
import CycleMonitor from './components/CycleMonitor';

export default {
  name: 'app',
  components: {
    Toolbar,
    Grid,
    CycleMonitor
  }
}
</script>

<style>
  
</style>