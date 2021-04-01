
<template>
  <div>
    <h1>UPDATE YOUR PROFILE {{ this.username }}</h1>
    <br />
    <div id="information">
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
    <div id="photo">
      <v-layout row>
        <v-flex md6 offset-sm3>
          <div>
            <div>
              <v-btn @click="click1">choose a photo</v-btn>
              <input
                type="file"
                ref="input1"
                style="display: none"
                @change="previewImage"
                accept="image/*"
              />
            </div>
            <div v-if="imageData != null">
              <img
                class="preview"
                height="268"
                width="356"
                :src="this.img1"
              />
              <br />
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex class="text-center">
          <v-btn color="pink" @click="uploadPhoto()">upload</v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";
import database from "../main.js";
export default {
  data() {
    return {
      uid: "",
      username: "",
      email: "",
      phoneNumber: "",
      img1: "",
      imageData: "",
      uploadValue: 0,
    };
  },
  methods: {
    updateContact() {
      database
        .collection("userInfo")
        .doc(this.uid)
        .update({
          email: this.email,
          phoneNumber: this.phoneNumber,
        })
        .then(() => {
          this.$router.push({
            path: "/",
          });
        });
    },
    fetchItems: function () {
      var user = firebase.auth().currentUser;
      this.uid = user.uid;
      database
        .collection("userInfo")
        .doc(this.uid)
        .get()
        .then((snapshot) => {
          this.username = snapshot.data().username;
          this.email = snapshot.data().email;
          this.phoneNumber = snapshot.data().phoneNumber;
          this.img1 = snapshot.data().profilePictureURL;
        });
    },
    uploadPhoto() {
      const post = {
        photo: this.img1,
      };
      firebase
        .database()
        .ref("PhotoGallery")
        .push(post)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    click1() {
      this.$refs.input1.click();
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.img1 = null;
      this.imageData = event.target.files[0];
      this.onUpload();
    },
    onUpload() {
      this.img1 = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.img1 = url;
            console.log(this.img1);
            database.collection("userInfo").doc(this.uid).update({
            profilePictureURL : this.img1
          });
          });
        }
      );
    },
    getProfilePicture() {
      var doc = database.collection('userInfo').doc(this.uid);
      return doc.get("profilePictureURL");
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
input {
  border: 2px solid black;
  border-radius: 4px;
}
h1 {
  font-size: "60px";
  text-align: center;
}
form {
  text-align: left;
}
label {
  color: black;
}
#information {
  float: left;
  width: 50%;
  padding: 20px;
}
#photo {
  float: right;
  width: 50%;
}
</style>
