
<template>
  <div>
    <h1>Update your profile, {{ this.username }}!</h1>
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
    </div>
    <div id="photo">
      <div>
        <div v-if="imageData != null">
          <img
            class="previewProfPic"
            height="330"
            width="356"
            :src="this.img1"
            alt= "Please choose a Photo"
          />
        </div>
        <br>
        <div>
          <b-button style="margin-left: 100px;border-radius: 30px;" @click="click1">choose a photo</b-button>
          <input
            type="file"
            accept="image/*"
            ref="input1"
            style="display: none"
            @change="previewImage"
          />
        </div>
        <br />
      </div>
    </div>
    <b-button style="border-radius: 30px;"
      id="updateInfo"
      color="pink"
      @click="
        uploadPhoto();
        updateContact();
      "
      >Update Information</b-button
    >
    <div class="border">
      <div class="license">
        <h2>Get Approved to Drive Now! <br /></h2>
        <h3>Driver's License</h3>
        <p>
          Upload a photo of your driver's license so that we know that you are
          able to drive
        </p>
        <b-form-file
          v-model="license"
          accept="image/*"
          placeholder="Upload your license"
          @change="displayLicense"
        />
        <br /><br />
        <b-button style="border-radius: 30px;" v-on:click="clearSelection">Clear Selection </b-button><br />
        <br />
        <b-img v-if="licensePresent" id="licensePreview" :src="image" />
      </div>
      <hr />
      <b-button style="background-color:rgb(97, 19, 150);border-radius: 30px;" v-on:click="updateInformation" :disabled="buttonStatus">
        Update
      </b-button>
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
      image: null,
      imageFile: null,
      license: null,
      licensePresent: false,
      buttonStatus: true,
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
          localStorage.setItem("email", this.email);
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
        localStorage.setItem("photoURL", this.img1);
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
              profilePictureURL: this.img1,
            });
          });
        }
      );
    },
    getProfilePicture() {
      var doc = database.collection("userInfo").doc(this.uid);
      return doc.get("profilePictureURL");
    },
    displayLicense: function (event) {
      this.licensePresent = true;
      this.buttonStatus = false;
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
        };
      }
      this.imageFile = input.files[0];
      reader.readAsDataURL(input.files[0]);
    },

    clearSelection: function () {
      this.image = null;
      this.license = null;
      this.licensePresent = false;
      this.buttonStatus = true;
    },

    updateInformation: function () {
      console.log(this.image);
      var storageRef = firebase.storage().ref();
      var image_id = storageRef.child("test1.jpg");
      image_id.put(this.imageFile).then((snapshot) => {
        console.log("Uploaded");
        console.log(snapshot);
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
  border: 2px solid black;
  border-radius: 12px;
}
h1 {
  font-size: "60px";
  text-align: center;
  font-family: "Dela Gothic One";
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

.border {
  /*margin:20px;*/
  margin-top: 50px;
  margin-left: 20px;
  border-style: none !important;
}

.license {
  width: 70% !important;
}

#licensePreview {
  width: 60%;
  height: 60%;
}
h2 {
  text-decoration: underline;
  font-family: "Roboto";
}
#updateInfo {
  margin-top: 180px;
  margin-left: 20px;
  background-color: rgb(97, 19, 150);
}
.previewProfPic {
  border-radius: 50%;
}
</style>
