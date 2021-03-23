<template>
  <div id="app">
    <h1> hi there </h1>
    <div class="navbar">
  <a href="#home">List Your Car</a>
  <a href="#news">Cars</a>
  <a href="#contact">Messages</a>
</div>
   <router-view> </router-view>
  </div>
</template>

<script>


export default {
  props: {
  },
  data() {
    return {

    };
  }
}
</script>

<style>
.navbar {
  overflow: hidden;
  background-color: #ded3ff;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
}

.navbar a {
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.navbar a:hover {
  background: #ddd;
  color: red;
}
</style>
