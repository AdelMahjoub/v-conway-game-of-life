<template>
  <div id="app">
    <navbar></navbar>
    <div class="section">
      <div class="container is-fluid">
        <toolbar></toolbar>
        <grid></grid>
        <cycle-monitor></cycle-monitor>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>


<script>
import Navbar from './components/Navbar';
import Toolbar from './components/Toolbar';
import Grid from './components/Grid';
import CycleMonitor from './components/CycleMonitor';
import AppFooter from './components/AppFooter';

export default {
  name: 'app',
  components: {
    Toolbar,
    Grid,
    CycleMonitor,
    Navbar,
    AppFooter
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Audiowide');
  
  ::-webkit-scrollbar {
      width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #999;
  }
</style>