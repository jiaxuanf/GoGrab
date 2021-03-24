<template>
  <div id="app">
    <div class="navbar">
      <a href="#">
        <img v-bind:src="'https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png'"
      style="width:40px;height:30px;"/></a>
      <a href="#messages">Messages</a>
      <a href="#cars">Cars</a>
      <a href="#feed">Feed</a>
      <a href="#listcar">List Your Car</a>
    </div>
    <div class="main">
      <img v-bind:src="'https://lh5.googleusercontent.com/qt-iclLn2RAU2kBotZ919RV1uzrRDIf_e-UDqoK2cCW4wF7KrQH2MYFd0-JdPNOVvSbUEkzNp9ArhdgxOQ5-r9t8U1jPzlr9N9kvVHs-GA'"
      style="width:100%;"/>
      <h1 id="title">Drive anywhere you want 🚗</h1>
      <h2 id="subtitle">Book cars from trusted owners today!</h2>
      <form>
        <label for="location">Location</label>
        <input type="text"> 
        </form>
    </div>
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
.navbar {
  overflow: hidden;
  background-color: #ded3ff;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
}

.navbar a {
  float: right;
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

.main {
  margin-top: 60px; /* Add a top margin to avoid content overlay */
}

#title {
  position: absolute;
  top: 12%;
  left: 30%;
  transform: translate(-10%, -50%);
  color: black;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 60px;
}

#subtitle {
  position: absolute;
  top: 18%;
  left: 33%;
  transform: translate(-10%, -50%);
  color: black;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 36px;
}
</style>
