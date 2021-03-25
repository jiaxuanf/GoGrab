<template>
  <div id="app">
    <img alt="GoGrab logo" src="./assets/GoGrab_Logo.png" width="155" height="150">
    <app-header></app-header>  
    <router-view></router-view>
  </div>
</template>

<script>

import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    'app-header':Header,
  }
}

</script>

<style>


</style>
