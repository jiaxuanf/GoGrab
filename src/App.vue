<template>
  <div id="app">
    
    <ul>
      <li><router-link to="/" exact> Home </router-link></li>

    </ul>
    <router-view> </router-view>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
};
</script>

<style>


</style>
