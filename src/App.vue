<template>
  <div id="app">
    <div id = "navbar">
      <ul>
        <li class = "links"><img src = './assets/profile_icon.png' /></li>
        <li class = "links"><router-link to = "/" exact><a>Login/Signup</a></router-link></li>
        <li class = "links"><router-link to = "/" exact><a>Messages</a></router-link></li>
        <li class = "links"><router-link to = "/CarListing" exact><a>Cars</a></router-link></li>
        <li class = "links"><router-link to = "/" exact><a>Feed</a></router-link></li>
        <li class = "links"><router-link to = "/" exact><a>List Your Car</a></router-link></li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
  
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#navbar {
  position: sticky;
  background-color:lightpink;
  width:100;
  margin-top: 0;
  height:40px;
}

#navbar > ul {
  list-style-type: none;
  text-align: center;
  height:40px;
}

.links {
  float:right;
  height:40px;
}

.links a {
  display:block;
  padding:5px;
}

.links img {
  display:block;
  width : 40px;
  height : 40px; 
}


router-link-active {
  background-color:aquamarine
}


</style>
