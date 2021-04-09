<template>
  <div style="margin-left: 20px">
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

      <b-button style="border-radius: 20px" type="submit">Sign Up!</b-button>
    </form>
    <span v-on:click="goToLogin()"> Login </span>
  </div>
</template>


<script>
import firebase from "firebase";
import database from "../main";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      uid: "",
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(async (res) => {
          /*var user = firebase.auth().currentUser;
          this.uid = user.uid;*/
          await database
            .collection("userInfo")
            .doc(res.user.uid)
            .set({
              username: this.username,
              id: res.user.uid,
              email: this.email,
              password: this.password,
              phoneNumber: "",
              profilePictureURL: "",
              chatList: [],
            })
            .then(() => {
              localStorage.setItem("id", res.user.uid);
              localStorage.setItem("name", this.username);
              localStorage.setItem("email", this.email);
              localStorage.setItem("password", this.password);
              localStorage.setItem("photoURL", "");
              localStorage.setItem("description", "");
              localStorage.setItem("FirebaseDocumentId", res.user.uid);
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
  border-radius: 12px;
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