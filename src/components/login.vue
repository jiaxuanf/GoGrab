<template>
  <div>
    <b-card style = "width:75%; height:100%; margin-left:auto; margin-right:auto; margin-top:20px;" class = "text-center"> 
      <b-row no-gutters>
        <b-col md = "6">
          <b-card-body>
            <h2>Login to GoGrab</h2>
              <b-form @submit.prevent="login">
                <label for = "email"> Email: </label> <br>
                <b-form-input type = "email" placeholder="Email Address" v-model = "email" ></b-form-input> <br>
                <label for = "password"> Password: </label>
                <b-form-input type = "password" placeholder = "Password" v-model = "password"> </b-form-input> <br>
                <div style = "text-align:center"> <b-button type = "submit" variant = "primary"> Login </b-button> <br><br>
                <h5> Don't have an account yet? </h5> 
                <b-button type = "button" v-on:click = "signUp()" variant = "primary">Sign Up Here </b-button>
                </div>
              </b-form>
          </b-card-body>
        </b-col>
        <b-col md = "6"><b-card-img :src = "require('../assets/Loginpage.jpg')" right></b-card-img></b-col>
      </b-row>
    </b-card>
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
                console.log("test")
                alert(error.message);
              });
          }
        })
        .catch((error) => {
                console.log("test")
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