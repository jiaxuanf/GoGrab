<template>
  <div id=app>
    <h1>List Your Car Now!</h1>
    <br><br><br>


    <form id='listing' v-on:submit.prevent="list">
    <ul>
      <li>
        <label for="model">Car Model:  </label>
        <input type="text" id="model" name="model"  v-model="listing.model" required /><br><br>
      </li>
      <li>
        <label for="color">Color:   </label>
        <input type="text" id="color" name="color" v-model="listing.color" required /><br><br> 
      </li>
      <li> 
        <label for="age">Age:   </label>
        <input type="number" id="age" name="age" v-model="listing.age" required /><br><br>
      </li>
        <!-- Rounded switch -->
      <li>
        <label> Any Defect:   No </label>
        <label class="switch">
        <input type="checkbox" v-model="listing.defect">
        <span class="slider round"></span>
        </label>
        <label> Yes  ( If yes, please specify in the description box. )</label>
        <br><br>
      </li>
      <li>
        <label for="price">Price:  $ </label>
        <input type="number" id="price" name="price" v-model="listing.price" required>
        <label for="price"> /day </label><br><br>
      </li>
      <li> 
        <label for="afrom">Available From:  </label> <input type="date" id="afrom" name="afrom" v-model="listing.afrom" required>
        <label for="ato"> To:  </label> <input type="date" id="ato" name="ato" v-model="listing.ato" required><br><br>
      </li>
      <li>
        <label for="loc">Pick-up Location:</label>
        <input type="text" id="loc" name="loc" v-model="listing.location" required><br><br>
      </li>
      <li>
        <label id = 'uploadPhotoe' for="files" >Upload Photos: </label> 
          <button @click="click1" type = "button">choose a photo</button>
          <input
            type="file"
            ref="input1"
            style="display: none"
            @change="previewImage"
            accept="image/*"
            multiple
          />
          <br><br>
        <div v-if="imageData != null">
          <img
            class="preview"
            :src="this.img1"
            size = 50%
            multiple
          />
          <br>
        </div>
      </li>
      <li>
        <label for="description">Description:  </label><br><br>
        <textarea id="description" name="description" rows="4" cols="50" v-model="listing.description" required>
        </textarea><br><br>
      </li>
      <li>
        <label for="rule">Set your rules for your guest:  </label><br><br>
        <textarea id="rule" name="rule" rows="4" cols="50" v-model="listing.rules" required>
        </textarea><br><br>
      </li>
      <li><button type = "submit">Submit </button> </li>
    </ul>


    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
 export default {
  name: 'IndividualListing',
  props: {
    msg: String
  },
  data(){
    return {
      listing: {
        model:'',
        color:'',
        age:'',
        defect:'', 
        price: '',
        location:'',
        description:'',
        rules:'',
        images:[],
        time: Date.now(), //number
        numberOfClicks: 0,
      },
      img1: "",
      imageData: '',
      uploadValue: 0,
      }
  },
  methods: {
    getCurrentUser: function() {
      var user = firebase.auth().currentUser;
      var uid
      if (user != null) {
        uid = user.uid;
        return uid;
      }
    },
    click1() {
      this.$refs.input1.click();
    },
    previewImage(event) {
      console.log("start previewImage")
      this.uploadValue = 0;
      // this.img1 = null;
      this.imageData = event.target.files
      console.log(this.imageData)
      this.onUpload();
    },
    onUpload() {
      // this.listing.images = [],
      console.log("start onUpload")
      this.img1 = this.imageData[0];
      console.log('length of imageData is' + this.imageData.length)
      var i;
      for (i = 0; i < this.imageData.length; i++) {
        console.log("the " + i + "th element in this.imageData is ")
        console.log(this.imageData[i])
        const storageRef = firebase
        .storage()
        .ref(this.imageData[i].name)
        .put(this.imageData[i]);
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
            console.log("add images to this.listing.images[]")
            console.log('BEFORE images is Array? ' + typeof this.listing.images)
            console.log(this.listing.images)
            this.listing.images.push(url)
            console.log(this.listing.images);
            console.log('this.listing.images[0] is ')
            console.log(this.listing.images[i])
            
            this.img1 = url
          });
        }
      );
      }
    },
    list : function() {
      //add userID to the document for listing
      this.listing.ownerID = this.getCurrentUser();
      this.listing.renterID = "";
      this.listing.reviewerID = "";
      //upload document to firebase
      firebase.firestore().collection("listings")
      .add(this.listing)
      .then(() => {
          alert("Successfully listed!");
          this.$router.push("/listed");
        })
        .catch((error) => {
          alert(error.message);
        });
      console.log("done");
    }
  },    
} 
</script>

<style>
#uploadPhoto {
  margin-right: 20px;
  margin-block: 50px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
  text-align: left;
  margin-left: 20%;
  margin-top: 10px;
  margin-bottom: 10px;
}
/* 'List It' button */
input[type=submit] {
  background-color: #c88ad8;
  border: none;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
  font-size: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
/* ####### Style below: for the toggle switch ####### */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked + .slider {
  background-color: #c88ad8;
}
input:focus + .slider {
  box-shadow: 0 0 1px #c88ad8;
}
input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
/* Rounded sliders */
.slider.round {
  border-radius: 30px;
  align-items: center;
}
.slider.round:before {
  border-radius: 50%;
}
</style>