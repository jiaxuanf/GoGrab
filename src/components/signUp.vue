<template>
  <div>
    <b-card style = "width:60%; height:100%; margin-left:auto; margin-right:auto; margin-top:20px;" class = "text-center"> 
      <b-row no-gutters>
        <b-col md = "6">
          <b-card-body>
            <h2>Sign Up for GoGrab</h2>
              <b-form @submit.prevent="register">
                <label for = "Username"> Username: </label>
                <b-form-input type = "username" placeholder = "Username" v-model = "username"> </b-form-input> <br>
                <label for = "email"> Email: </label> <br>
                <b-form-input type = "email" placeholder="Email Address" v-model = "email" ></b-form-input> <br>
                <label for = "password"> Password: </label>
                <b-form-input type = "password" placeholder = "Password" v-model = "password"> </b-form-input> <br>
                <div style = "text-align:center"> <b-button type = "submit" variant = "primary"> Sign Up </b-button> <br><br>
                </div>
              </b-form>
              <div><b-button v-on:click = "goToLogin()">Return to login </b-button> </div>
          </b-card-body>
        </b-col>
        <b-col md = "6"><b-card-img :src = "require('../assets/Loginpage.jpg')" right></b-card-img></b-col>
        
      </b-row>
    </b-card>
    
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
              profilePictureURL: "https://firebasestorage.googleapis.com/v0/b/gograb-4c451.appspot.com/o/placeholder_profile.png?alt=media&token=23ff609d-21f9-4b25-8342-f2deb1d07700",
              chatList: [],
              licenseURL: "",
            })
            .then(() => {
              localStorage.setItem("id", res.user.uid);
              localStorage.setItem("name", this.username);
              localStorage.setItem("email", this.email);
              localStorage.setItem("password", this.password);
              localStorage.setItem("photoURL", "");
              localStorage.setItem("description", "");
              localStorage.setItem("FirebaseDocumentId", res.user.uid);
              alert("Successfully registered! Please login.")
              this.$router.push("/")
            });
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

.card-img-right {
    max-width: 100%;
    max-height: 100%;
}
</style>