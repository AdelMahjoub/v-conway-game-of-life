<template>
  <nav id="navbar" class="navbar is-light">
    <div class="container is-fluid">
      <div class="navbar-brand">
        <a href="/" class="navbar-item">
          <span>V-Conway</span>
        </a>
        <div
        @click="menuIsOpen = !menuIsOpen"
        :class="{'is-active': menuIsOpen}" 
        class="navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div
      :class="{'is-active': menuIsOpen}"
      class="navbar-menu">
        <div class="navbar-start">

        </div>
        <div class="navbar-end">
          <a href="https://github.com/AdelMahjoub/v-conway-game-of-life" target="_blank" class="navbar-item">
            <span class="has-icon">
              <i class="fa fa-github fa-lg"></i>
              <span>github</span>
            </span>
          </a>
          <a href="https://www.freecodecamp.org/adelmahjoub" target="_blank" class="navbar-item">
            <span class="has-icon">
              <i class="fa fa-free-code-camp fa-lg"></i>
              <span>Freecodecamp</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      menuIsOpen: false,
    }
  }
}
</script>

<style scoped>

</style>
