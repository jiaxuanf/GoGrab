<template>
  <div>
    <div>
      <b-navbar toggleable = "lg" type = "dark" variant = "primary" class = "navbarCol">  
        <b-navbar-brand  class="d-inline-block align-top" href = "/"><img src = "../assets/GoGrab_Logo.png" style = "width:50px; height:50px"/> </b-navbar-brand>
        <b-navbar-nav class = "ml-auto"> 
          <b-nav-item-dropdown text = "User" style = "margin:0;"> 
            <b-dropdown-item class  = "routerLinks" to = "/updateProfile" id = "update">Update Profile</b-dropdown-item>
            <b-tooltip target = "update" triggers = "hover"  placement = "right">Update your E-mail, Driver's License and Phone Number here</b-tooltip>
            <b-dropdown-item @click = "logout" style = "margin:0px">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item class = "routerLinks" to = "/chat" id = "messages">Messages</b-nav-item>
          <b-tooltip target = "messages" triggers = "hover">Chat with other owners or renters</b-tooltip>
          <b-nav-item class = "routerLinks" to = "/CarListing"  id = "cars">Cars</b-nav-item>
          <b-tooltip target = "cars" triggers = "hover">View the cars available for rent </b-tooltip>
          <b-nav-item class = "routerLinks" to = "/MyRentals"  id = "bookings">My Bookings</b-nav-item>
          <b-tooltip target = "bookings" triggers = "hover">View the cars you have requested to book, and your upcoming bookings</b-tooltip>
          <b-nav-item class = "routerLinks" to = "/Requests"  id = "listings">Manage Listings</b-nav-item>
          <b-tooltip target = "listings" triggers = "hover">Manage the bookings renters make for your cars</b-tooltip>
          <b-nav-item class = "routerLinks" to = "/listing"  id = "list">List Your Car</b-nav-item>
          <b-tooltip target = "list" triggers = "hover">List your car for rent here</b-tooltip>
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
      this.$router.push("/login");
      localStorage.clear();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.navbarCol {
  font-size: 20px;
  background-color: indigo !important;
} 

.routerLinks {
  padding: 0px;
  margin: 0px;
}

a {
  color: white !important;
}


</style>