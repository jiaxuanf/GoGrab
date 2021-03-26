<template>
  <div>
    <h1>UPDATE YOUR PROFILE {{this.username}}</h1>
    <h3>Contact Information</h3>
    <form>
      <label for="email">Email:</label><br />
      <input type="email" placeholder="Email address..." v-model="email" />
      <br />
      <label for="phoneNumber">Phone number:</label>
      <br />
      <input
        type="phoneNumber"
        placeholder="Phone number..."
        v-model="phoneNumber"
      />
    </form>
    <button v-on:click="updateContact()">Update Information</button>
  </div>
</template>


<script>
import firebase from "firebase";
import database from "../main.js";
export default {
  data() {
    return {
      username:"",
      email: "",
      phoneNumber: "",
    };
  },
  methods: {
    updateContact() {
      var user = firebase.auth().currentUser;
      var uid = user.uid;
      database.collection("userInfo").doc(uid).update({
        email: this.email,
        phoneNumber: this.phoneNumber,
      }).then(() => {this.$router.push({
            path: '/'})
        });
    },
    fetchItems: function () {
      var user = firebase.auth().currentUser;
      var uid = user.uid;
      database
        .collection("userInfo")
        .doc(uid)
        .get()
        .then((snapshot) => {
          this.username = snapshot.data().username;
          this.email = snapshot.data().email;
          this.phoneNumber = snapshot.data().phoneNumber;
        });
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
input {
  margin-right: 20px;
}
h1 {
  font-size: "60px";
}

form {
  text-align: left;
}
label {
  color: black;
}
</style>