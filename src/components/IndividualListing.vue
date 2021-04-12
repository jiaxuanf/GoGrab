<template>
  <div id=app style = "font-size: 20px">

    <b-form v-on:submit.prevent = "list" style = "margin-left:20%; margin-right:10%; margin-top: 40px; margin-bottom: 40px;">  
      <h1>Start Listing your car </h1> <br>
      
      <h3>1. Basic Information </h3>
      <label for = "brand">Select your car Brand:</label> <br>
      <b-form-select id = "brand" v-model = "listing.brand" :options = "brandOptions" required style = "width:60%;"> </b-form-select>
      <br><br> 

      <label for = "model">Car Model: </label><br>
      <b-form-input v-model = "listing.model" placeholder = "Enter your car model..." required style = "width:60%;"> </b-form-input>
      <br><br>


      <label for = "numSeater" >Number of Seats: </label><br>
      <b-form-input v-model = "listing.numSeats" type = "number" placeholder = "Number of car seats..." min = "1" required style = "width:20%"></b-form-input>
      <br><br>

      <label for = "type">Car Type: </label><br>
      <b-form-radio-group v-model = "listing.carType" :options = "typeOptions" buttons required button-variant = "outline-primary"> </b-form-radio-group><br><br>

      <label for = "age">Car Age:</label><br>
      <b-form-input v-model = "listing.age" type = "number" placeholder = "Age..." min = "1" required style = "width:20%"></b-form-input>
      <br><br>

      <label>Asking Price: (Per Day) </label> <br>
      <b-form-input v-model = "listing.price" type = "number" required style = "width:20%" min = 1></b-form-input>
      <br />

      <label for = "afrom">Available From: </label> <br> 
      <b-form-datepicker id = "afrom" name = "afrom" v-model = "listing.afrom" :min = "new Date()" required style = "width:30%"> </b-form-datepicker><br>
      <label for = "ato">Available Until: </label> <br>
      <b-form-datepicker id = "ato" name = "ato" v-model = "listing.ato" :min = "listing.afrom" required style = "width:30%"> </b-form-datepicker>
      <br><br>

      <label for = "pickup">Pick up Location: </label> <br>
      <b-form-input v-model="listing.location" required style = "width:60%" placeholder = "Enter your pickup location...."> </b-form-input><br>
      
      <h3>2. Upload some images of your Car!</h3><br>
      <b-form-file
          accept="image/*"
          @change="previewImage"
          multiple
          placeholder = "Upload Images of your car"></b-form-file><br /><br>
      <b-button type = "button" v-on:click = "clearSelection">Clear Selection</b-button>
      <br><br>
      <b-carousel v-if="imageData != null"
      :interval="0"
      controls
      no-animation
      indicators style = "width:600px; height : 400px; margin: 0 auto">
        <b-carousel-slide v-for = "(image, index) in this.listing.images" :key = "index">
          <template #img> 
            <img v-bind:src = "image" style = "width:600px; height:400px">    
          </template>  
        </b-carousel-slide>
      </b-carousel>    


      <h3 class = "mt-5">3. Any additional information you want your renter to know?</h3>
      <label for = "Defects">Any prior defects for your car? </label><b-form-checkbox v-model = "listing.defect" switch> </b-form-checkbox>
      <br>
      <label for = "defects" v-if = "listing.defect">List your defects here:</label><br>
      <b-form-tags input-id = "defects" v-show = "listing.defect" v-model = "listing.defectList" placeholder = "Press Enter for each new defect" required></b-form-tags>
      <br><br>

      <label for = "description">Give a description of your car or any information you would like your renters to know</label> <br> 
      <b-form-textarea v-model = "listing.description"  :state="wordLength" placeholder = "Enter a description or information for your renters" rows = "4" max-rows="4" required ></b-form-textarea>
      <b-form-invalid-feedback id="input-live-feedback">Enter at least 200 characters</b-form-invalid-feedback>
      <br><br>

      <label for = "rule">List down any rules you have regarding your car: </label> <br>
      <b-form-tags input-id = "rule" v-model = "listing.rules"></b-form-tags><br><br> 
      
      <b-button type = "submit" style = "background-color: #DED3FF; color : black"> List your Car Now! </b-button>
    </b-form>
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
        brand:'',
        age:'',
        numSeats:'',
        defect:false, 
        defectList : [],
        price: '',
        location:'',
        description:'',
        rules:[],
        images:[],
        time: Date.now(), //number
        status:'',
        carType : '',
        numberOfClicks: 0,
        ownerID:"",
        renterID:"",
        reviewerID:"",
      },
      img1: "",
      imageData: null,
      uploadValue: 0,
      listingID:null,
      typeOptions : [
        "SUV",
        "MPV",
        "Sedan",
        "Sports",
        "Mini"
      ],
      brandOptions : ["Abarth",
        "Alfa Romeo",
        "Aston Martin",
        "Audi",
        "Bentley",
        "BMW",
        "Bugatti",
        "Cadillac",
        "Chevrolet",
        "Chrysler",
        "Citroën",
        "Dacia",
        "Daewoo",
        "Daihatsu",
        "Dodge",
        "Donkervoort",
        "DS",
        "Ferrari",
        "Fiat",
        "Fisker",
        "Ford",
        "Honda",
        "Hummer",
        "Hyundai",
        "Infiniti",
        "Iveco",
        "Jaguar",
        "Jeep",
        "Kia",
        "KTM",
        "Lada",
        "Lamborghini",
        "Lancia",
        "Land Rover",
        "Landwind",
        "Lexus",
        "Lotus",
        "Maserati",
        "Maybach",
        "Mazda",
        "McLaren",
        "Mercedes-Benz",
        "MG",
        "Mini",
        "Mitsubishi",
        "Morgan",
        "Nissan",
        "Opel",
        "Peugeot",
        "Porsche",
        "Renault",
        "Rolls-Royce",
        "Rover",
        "Saab",
        "Seat",
        "Skoda",
        "Smart",
        "SsangYong",
        "Subaru",
        "Suzuki",
        "Tesla",
        "Toyota",
        "Volkswagen",
        "Volvo"
      ],
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
      var i;
      for (i = 0; i < this.imageData.length; i++) {
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
      this.listing.status = "pending";
      //upload document to firebase

      firebase.firestore().collection("listings")
      .add(this.listing)
      .then((doc) => {
        // get listinID ready to pass to IndividualListed 

        this.listingID = doc.id;
        const listing_id = this.listingID;
        this.$router.push({name: "IndividualListed", query: { listing_id: listing_id }});

      }) 
      .catch((error) => {
          alert(error.message);

        });
      console.log('listed')
    },

    clearSelection : function() {
      this.listing.images = [];
      this.imageData = null
    },
  },

   computed : {
        wordLength() {
            return this.listing.description.length > 200 ? true : false;
        }
    },

} 
</script>

<style scoped>

</style>