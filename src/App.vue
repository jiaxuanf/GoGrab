<template>
  <div id="app">
    <img alt="GoGrab logo" src="./assets/GoGrab_Logo.png" width="155" height="150">

    <app-header></app-header>  

    <router-view></router-view>

    

    
  </div>
</template>

<script>
import Header from './components/Header.vue'
//import HelloWorld from './components/HelloWorld.vue'
//import IndividualListing from './components/IndividualListing.vue'
//import IndividualListed from './components/IndividualListed.vue'


export default {
  name: 'App',
  components: {
    'app-header':Header,
    //IndividualListing,
    //IndividualListed,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
