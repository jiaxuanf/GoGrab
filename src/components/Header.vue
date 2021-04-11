<template>
  <div>
    <div>
      <b-navbar toggleable = "lg" type = "light" variant = "primary" class = "navbarCol">  
        <b-navbar-brand  class="d-inline-block align-top" href = "/"><img src = "../assets/GoGrab_Logo_transparent.png" style = "width:50px; height:50px"/> </b-navbar-brand>
        <b-navbar-nav class = "ml-auto"> 
          <b-nav-item-dropdown text = "User" style = "margin:0;"> 
            <b-dropdown-item class  = "routerLinks" to = "/updateProfile">Profile</b-dropdown-item>
            <b-dropdown-item @click = "logout" style = "margin:0px">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item class = "routerLinks" to = "/chat"  type = "dark">Messages</b-nav-item>
          <b-nav-item class = "routerLinks" to = "/CarListing"  type = "dark">Cars</b-nav-item>
          <b-nav-item class = "routerLinks" to = "/MyRentals"  type = "dark">My Rentals</b-nav-item>
          <b-nav-item class = "routerLinks" to = "/"  type = "dark">Feed (TBD)</b-nav-item>
          <b-nav-item class = "routerLinks" to = "/listing"  type = "dark">List your car</b-nav-item>
          <b-navbar-brand class = "d-inline-block align-top"  to = "/profilePage" href = "/"><img src = "../assets/profile_icon.png" style = "width:50px; height:50px"> </b-navbar-brand>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      msg: "",
    };
  },
  methods : {
    logout : function() {
      firebase.auth().signOut();
      this.$router.push("/");
      localStorage.clear();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.navbarCol {
  font-size: 20px;
  background-color:#DED3FF !important;
} 

.routerLinks {
  padding: 0px;
  margin: 0px;
}
</style>