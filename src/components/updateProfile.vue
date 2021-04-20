
<template>
  <div>
    <h1 style = "margin-left: auto; margin-right:auto; text-align:center">Update your profile, {{ this.username }}!</h1>
    <div id="photo" style = "margin-left:auto; margin-right:auto; text-align:center; ">
      <div >
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
          <b-button style="border-radius: 30px;" @click="click1">Choose a photo</b-button>
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
    <b-card no-body>
    <b-tabs card vertical> 
    <b-tab title = "Personal Information">
      <div id="information">
        <h3>Contact Information</h3>
        <form>
          <label for="email">Email:</label><br />
          <b-form-input type="email" placeholder="Email address..." v-model="email"></b-form-input>
          <br />
          <label for="phoneNumber">Phone number:</label>
          <br />
          <b-form-input
            type = "number"
            placeholder="Phone number..."
            v-model="phoneNumber"
          > </b-form-input>
        </form>
      </div>
      <br><br>
      
      <b-button style="border-radius: 30px;"
        id="updateInfo"
        color="pink"
        @click="
          uploadPhoto();
          updateContact();"
        >Update Information</b-button>
    </b-tab>    

    <b-tab title = "Driver's License">
      <div>
        <div>
          <h2>Get Approved to Drive Now! <br /></h2>
          <h5>Driver's License</h5>
          <p>
            Upload a photo of your driver's license so that we know that you are
            able to drive!
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
          <b-img v-if="licensePresent" id="licensePreview" :src="image" style = "width:500px; height:500px;"/>
        </div>
        <hr />
        <b-button style="background-color:rgb(97, 19, 150);border-radius: 30px;" v-on:click="updateInformation" :disabled="buttonStatus">
          Update
        </b-button>
      </div>
    </b-tab>    
  </b-tabs> 
  </b-card>
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
      var user = firebase.auth().currentUser;
      user.updateEmail(this.email).then(() => {
        database
        .collection("userInfo")
        .doc(this.uid)
        .update({
          email: this.email,
          phoneNumber: this.phoneNumber,
        })
        .then(() => {
          localStorage.setItem("email", this.email);
          location.reload();
        });
      })      
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
      var storage = firebase.storage();
      var storageRef = storage.ref();
      const image_url = this.uid + "_license.jpg";
      storageRef.child(image_url).getDownloadURL().then((url) =>
        {this.image = url;
        this.licensePresent = true;}
      );
    }, 

    uploadPhoto() {
      const post = {
        photo: this.img1,
      };
      firebase
        .database()
        .ref("PhotoGallery")
        .push(post)
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
      var storageRef = firebase.storage().ref();
      const licenseName = this.uid + "_license.jpg"
      var image_id = storageRef.child(licenseName);
      image_id.put(this.imageFile).then(() => {
        storageRef.child(licenseName).getDownloadURL().then(
        (doc) => {
          database.collection("userInfo").doc(this.uid).update({licenseURL : doc})
        })
      });
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
#licensePreview {
  width: 60%;
  height: 60%;
}

.previewProfPic {
  border-radius: 50%;
}
</style>
