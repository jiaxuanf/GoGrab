<template>
  <div>
    <div style = "width : 50%; float:left; text-align:center;">
      <b-img :src = "require('../assets/login_3.jpg')" fluid grow></b-img>
    </div>

  <b-modal
    v-model = "wrongPassword"
    title="Incorrect Password Confirmation">
    <p> Please ensure that you entered your password in both fields correctly</p>
  </b-modal>
  <div style = "width:50%; float:right;">
      <div style = "width: 80%;text-align:center; margin: 0 auto; ">
        <b-img :src = "require('../assets/GoGrab_Logo_transparent.png')" style = "width:150px; height:150px; margin-top:10%"></b-img>
            <h2>Sign Up for GoGrab</h2>
              <b-form @submit.prevent="register">
                <label for = "Username"> Username: </label>
                <b-form-input type = "username" placeholder = "Username" v-model = "username"> </b-form-input> <br>
                <label for = "email"> Email: </label> <br>
                <b-form-input type = "email" placeholder="Email Address" v-model = "email" ></b-form-input> <br>
                <label for = "password"> Password: </label>
                <b-form-input type = "password" placeholder = "Password" v-model = "password"> </b-form-input> <br>
                <label for = "password"> Confirm Password: </label>
                <b-form-input type = "password" placeholder = "Password" v-model = "passwordConfirm"> </b-form-input> <br>
                <div style = "text-align:center"> <b-button type = "submit" variant = "primary" style = "background-color: indigo"> Sign Up </b-button> <br><br>
                </div>
              </b-form>
              <div><b-button v-on:click = "goToLogin()" style = "background-color: indigo">Return to login </b-button> </div>
        </div> 
    </div>
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
      passwordConfirm: "",
      uid: "",
      wrongPassword: false,
    };
  },
  methods: {
    register() {
      var flag = true;
      if (this.passwordConfirm != this.password) {
        flag = false;
        this.wrongPassword = !this.wrongPassword;
        return;
      }
      if (flag) {
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
              profilePictureURL: "https://firebasestorage.googleapis.com/v0/b/gograb-4c451.appspot.com/o/placeholder_profile.png?alt=media&token=93b23a28-0ad1-4013-89e4-b145ba3bb251",
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
        });}
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