<template>
  <div>
    <h1>LOGIN</h1>
    <form @submit.prevent="login">
      <label for="email">Email:</label><br />
      <input type="email" placeholder="Email address..." v-model="email" />
      <br />
      <label for="password">Password:</label>
      <br />
      <input type="password" placeholder="password..." v-model="password" />
      <br />
      <button type="submit">Login</button>
    </form>
    <h4>Do not have an account?</h4>
    <span v-on:click="signUp()"> Sign up here </span>
  </div>
</template>


<script>
import firebase from "firebase";
export default {
  data() {
    return {
      password: "",
      email: "",
    };
  },
  methods: {
    signUp: function () {
      this.$router.push({ path: "/signup" });
    },
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert("Successfully logged in");
          this.$router.push("/home");
        })
        .catch((error) => {
          alert(error.message);
        });
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
  color: black
}
</style>