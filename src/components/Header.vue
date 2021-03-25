<template>
   <div>
    <header>
        <h1>{{ msg }}</h1>
        <router-link to="/" exact>Home </router-link>
        <router-link to="/listing" exact>Car Listing</router-link>
        <router-link to="/listed" exact>Listed</router-link>
        <router-link to="/login" exact>Log In</router-link>
        <router-link to="/signup" exact>Sign up</router-link>
    </header>
    </div>
  
</template>

<script>
export default {
  
  data(){
    return{
        msg: ''
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
header{
    background: rgb(97, 19, 150);
    height: 60px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align:center;
    vertical-align:bottom;
}
h1{
    color:ivory
}
a{
    color: #fff;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;
}
.router-link-active{
    background: #eee;
    color: #444;
    
}
</style>