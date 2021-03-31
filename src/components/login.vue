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
      username: "",
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
        .then(async (res) => {
          console.log(res);
          if (res.user) {
            await firebase
              .firestore()
              .collection("userInfo")
              .where("id", "==", res.user.uid)
              .get()
              .then((querySnapshot) => {
                // console.log("query", querySnapshot);
                querySnapshot.forEach((doc) => {
                  let userData = doc.data();
                  localStorage.setItem("id", userData.id);
                  localStorage.setItem("name", userData.name);
                  localStorage.setItem("email", userData.email);
                  localStorage.setItem("password", userData.password);
                  localStorage.setItem("photoURL", userData.URL);
                  localStorage.setItem("description", userData.description);
                  localStorage.setItem("FirebaseDocumentId", doc.id);
                });
              })
              .then(() => {
                alert("Successfully logged in");
                this.$router.push({ path: "/" });
              })
              .catch((error) => {
                alert(error.message);
              });
          }
        })
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