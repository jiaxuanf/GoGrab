<template>
  <div>
    <form @submit.prevent="register">
      <h1>SIGN UP</h1>
      <label for="username">Username:</label><br />
      <input type="username" placeholder="Username..." v-model="username" />
      <br />
      <label for="email">Email:</label><br />
      <input type="email" placeholder="Email address..." v-model="email" />
      <br />
      <label for="password">Password:</label>
      <br />
      <input type="password" placeholder="password..." v-model="password" />

      <button type="submit">Sign Up!</button>
    </form>
    <span v-on:click="goToLogin()"> Login </span>
  </div>
</template>


<script>
import firebase from "firebase";
import database from "../main.js";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          var user = firebase.auth().currentUser;
          var uid = user.uid;
          database.collection("userInfo").doc(uid).set({
            username: this.username,
            email: this.email,
            phoneNumber: "",
            profilePictureURL: "",
          });
          alert("Successfully registered! Please login.");
          this.$router.push("/login");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    goToLogin() {
      this.$router.push("/login");
    },
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