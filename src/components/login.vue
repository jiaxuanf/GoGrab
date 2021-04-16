<template>
  <div>
    <div style = "width : 47%; float:left; text-align:center;">
      <b-img :src = "require('../assets/login_2.jpg')" fluid grow></b-img>
    </div>
    <div style = "width:53%; float:right;">
      <div style = "width: 80%;text-align:center; margin: 0 auto; ">
        <b-img :src = "require('../assets/GoGrab_Logo_transparent.png')" style = "width:150px; height:150px; margin-top:10%"></b-img>
        <h2>Login to GoGrab</h2>
        <b-form @submit.prevent="login">
          <label for="email"> Email: </label> <br />
          <b-form-input
            type="email"
            placeholder="Email Address"
            v-model="email"
          ></b-form-input>
          <br />
          <label for="password"> Password: </label>
          <b-form-input type="password" placeholder="Password" v-model="password">
          </b-form-input>
          <br />
          <div style="text-align: center">
            <b-button type="submit" variant="primary"> Login </b-button>
            <br /><br />
            <h5>Don't have an account yet?</h5>
            <b-button type="button" v-on:click="signUp()" variant="primary"
              >Sign Up Here
            </b-button>
          </div>
        </b-form>
      </div>
    </div>
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
                querySnapshot.forEach((doc) => {
                  let userData = doc.data();
                  localStorage.setItem("id", userData.id);
                  localStorage.setItem("name", userData.username);
                  localStorage.setItem("email", userData.email);
                  localStorage.setItem("password", userData.password);
                  localStorage.setItem("photoURL", userData.profilePictureURL);
                  localStorage.setItem("description", userData.description);
                  localStorage.setItem("FirebaseDocumentId", doc.id);
                });
              })
              .then(() => {
                alert("Successfully logged in");
                this.$router.push({ path: "/" });
              })
              .catch((error) => {
                console.log("test");
                alert(error.message);
              });
          }
        })
        .catch((error) => {
          console.log("test");
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
  color: black;
}

.card-img-right {
  max-width: 100%;
  max-height: 100%;
}
</style>