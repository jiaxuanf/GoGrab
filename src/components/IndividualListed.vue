<template>
<div style = "font-size: 20px">
    <br><br>
    <b-carousel
      :interval="0"
      controls
      no-animation
      indicators style = "width:60%; height:600px; margin-left:auto; margin-right:auto; text-align:center;">  
      <b-carousel-slide v-for = "(image, index) in this.listing.images" :key = "index">
        <template #img style = "{margin-left:auto; margin-right:auto}"> 
          <img v-bind:src = "image" style = "{margin-left:auto; margin-right:auto}">    
        </template>  
      </b-carousel-slide>
    </b-carousel>
    <br> <br>
    <div style = "width:50%; float: left; margin-left:15%">
    <b-container style = "{margin: 0}">
      <b-row no-gutters align-v = "baseline"> 
        <b-col sm = 3><strong>The Car</strong> </b-col>
        <b-col sm = 9><h2>{{this.listing.model}}</h2><br>
          <b-row>
            <b-col><img src = "../assets/business-and-trade.png" style = "width:30px; height:30px;">  Brand: {{this.listing.brand}}  </b-col>
            <b-col><img src = "../assets/anti-age.png" style = "width:30px; height:30px;">  Age: {{this.listing.age}} </b-col>
          </b-row>
          <b-row>
            <b-col><img src = "../assets/car-seat.png" style = "width:30px; height:30px;">  Seats: {{this.listing.numSeats}} </b-col>
            <b-col><img src = "../assets/automobile-salesman.png" style = "width:30px; height:30px;">  Hosted by: {{this.username}}</b-col>
          </b-row>
        </b-col>
        <b-modal v-model="loginPrompt" @ok="moveToUpdateProfile" title = "Please Add a Driver's License">
          <p>Please add a driver's license into your profile so the owner of the car can verify that you are allowed to drive </p>
        </b-modal>
        <b-modal v-model="formPrompt" title = "Invalid Rental Request">
          <p>You have entered an invalid value for the rental form. Please check the start and end date, and check the terms and conditions before renting. </p>
        </b-modal>
      </b-row>
      <b-row no-gutters style = "{width: 60%}" class = "mt-5">  
        <b-col sm = 3><strong>Price Per Day</strong></b-col>  
        <b-col sm = 9><strong><img src = "../assets/car-price.png" style = "width:30px; height:30px;">  ${{this.listing.price}} SGD/Day </strong></b-col>
      </b-row>
      <b-row no-gutters style = "{width: 60%}" class = "mt-5"> 
        <b-col sm = 3><strong>Availability </strong> </b-col>
        <b-col sm = 9><b-calendar readonly :min = "this.listing.afrom" :max = "this.listing.ato"> </b-calendar> </b-col>
      </b-row>
      <b-row no-gutters style = "{width: 60%}" class = "mt-5"> 
        <b-col sm = 3><strong>Car Description</strong> </b-col>
        <b-col sm = 9>{{this.listing.description}} </b-col>
      </b-row>

      <b-row class = "mt-5"> 
        <b-col sm = 3><strong>Owner's Rules</strong></b-col>
        <b-col sm = 9>
          <ul v-for = "(rules,index) in listing.rules" :key = "index"> 
              <li>{{rules}} </li>
          </ul>
        </b-col>
      </b-row>
      <b-row class = "mt-5">
        <b-col sm = 3><strong>Defects</strong></b-col>
        <b-col sm = 9>Before taking over the car from the owner, please do a check yourself to ensure that there is no visible
          damage or defects to the car. Otherwise, if a defect is found by the owner after your rental, you could be liable to 
          pay for the cost of repairing the defects found. 
          <br><br>
          <p v-if = "!listing.defect">There are currently no defrects reported by the owner of the car. Please do a check before taking over the car from the owner </p>
          <p v-else>These are the current defects reported by the owner of the car: </p>
            <ul v-for = "(defects, index) in listing.defectList" :key = "index"> 
              <li>{{defects}} </li>
            </ul>
        </b-col>
      </b-row>
    </b-container>
    </div>

    <div style = "width:20%; float:right; margin-right: 15%;" v-if = "listing.ownerID != uid">
      <h3>Book your ride now! </h3>
        <hr />
        <b-form v-on:submit.prevent = "rent"> 
        <label>I have read through all the rules and conditions stated by the owner:</label><br>
        <b-form-checkbox v-model = "request.read" value = "true" required>I agree to the terms and conditions </b-form-checkbox><br><br>
        <label>Trip Start Date: </label><br> 
        <b-form-datepicker v-model = "request.rfrom" :min = "this.listing.afrom" :max = "this.listing.ato" required></b-form-datepicker><br>
        <label>Trip End Date: </label><br>
        <b-form-datepicker v-model = "request.rto" :min = "this.listing.afrom" :max = "this.listing.ato" required></b-form-datepicker><br>  
        <label>Any Notes for the owner? </label>
        <b-form-textarea v-model = "request.note"> </b-form-textarea><br>  
        <h5>Total Price:</h5>
        <p>{{totalPrice}} </p> <br>
        <b-form-radio-group v-model = "request.paymentMethod" required>
          <b-form-radio  value = "PayLah">PayLah! </b-form-radio>
          <b-form-radio  value = "Cash">Cash </b-form-radio>
        </b-form-radio-group> <br>
        <b-button type = "submit" variant = "primary">Rent Now!</b-button> 
        </b-form> 
    </div>
    <br> <br> <br>
</div>
</template>

<script>
import firebase from 'firebase'
import moment from "moment"

export default {
  name: 'IndividualListed',
  props: {
    listing_id: String
  },
  data() {
    return {
      listing: {
        model:'',
        color:'',
        age:'',
        defect:'', 
        price: '',
        afrom:'',
        ato:'',
        location:'',
        description:'',
        rules:'',
        images:[],
        time: '',
        ownerID:'',
        owner:'',
        carType : '',
        defectList : [],
        numSeats : '',
      },
      uid: "",
      username: "",
      email: "",
      phoneNumber: "",
      profilePhoto: "", //URL
      imageData: "",
      uploadValue: 0,
      carInfo:[],
      licenseURL : "",
      loginPrompt: false,
      formPrompt : false,

      request: {
        read:'',
        note:'',
        rfrom:'',
        rto:'', 
        total: '', //get from the collection parasm
        paymentMethod: "",
        ownerID:'',
        renterID:'',
        listing_id: '',
        model:'',
        imageURL:'',
        price:'',
        status:'',
      },
      // listedID:'',
    }
  },
  methods : {
        fetchItems : function() {
          const car = firebase.firestore().collection("listings").doc(this.$route.query.listing_id)
          console.log(car)
          car.get().then((doc) => {
              if (doc.exists) {
                  console.log("Document data:", doc.data());
                  this.listing.model = doc.get("model")
                  this.listing.price = doc.get("price")
                  this.listing.color = doc.get("color")
                  this.listing.age = doc.get("age")
                  this.listing.defect = doc.get("defect")
                  this.listing.description = doc.get("description")
                  this.listing.rules = doc.get("rules")
                  this.listing.afrom = doc.get("afrom")
                  this.listing.ato = doc.get("ato")
                  this.listing.images = doc.get("images")
                  this.listing.ownerID = doc.get("ownerID")
                  this.listing.carType = doc.get("carType")
                  this.listing.defectList = doc.get("defectList")
                  this.listing.numSeats = doc.get('numSeats')
                  this.listing.brand = doc.get('brand')
                  this.fetchOwner();
              } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
              }
          }).catch((error) => {
              console.log("Error getting document:", error);
          });
        },
      fetchUser: function () {
        var user = firebase.auth().currentUser;
        this.uid = user.uid;
        firebase.firestore()
          .collection("userInfo")
          .doc(this.uid)
          .get()
          .then((snapshot) => {
            this.username = snapshot.data().username;
            this.profilePhoto = snapshot.data().profilePictureURL;
            this.licenseURL = snapshot.data().licenseURL;
            if (this.licenseURL == null) {
              console.log("empty");
            }
            console.log(this.licenseURL);
          });
      },
      fetchOwner: function () {
        console.log("start fetchOwner" + this.listing.ownerID)
        firebase.firestore()
          .collection("userInfo")
          .doc(this.listing.ownerID)
          .get()
          .then((snapshot) => {
            this.listing.owner = snapshot.data().username;
            // this.profilePhoto = snapshot.data().profilePictureURL;
            console.log("owner is " + this.listing.owner)

          });
        return this.listing.owner
      },
      rent: function () {
        //No license added
        if (this.licenseURL == null) {
          this.loginPrompt = !this.loginPrompt;
          return;
        }
        var flag = false
        //Form Validation
        /*
        1. Start Date and end date should be within rental period, and end date >= Start Date 
        2. Checkbox must be required 
        */
        if (this.request.rfrom == null || this.request.rto == null) {
          flag = true;
        }
        if (moment(this.request.rfrom).valueOf() > moment(this.request.rto).valueOf()) {
            flag = true;
        } if (this.request.read != "true") {
            flag = true;
        }
        console.log(this.request);
        if (flag) {
          this.formPrompt = !this.formPrompt
          return;
        } 
        this.request.renterID = this.uid; 
        this.request.ownerID = this.listing.ownerID;
        this.request.listing_id = this.$route.query.listing_id;
        this.request.status = "Pending";
        this.request.model = this.listing.model;
        this.request.imageURL=  this.listing.images[0];
        this.request.price = this.listing.price;
        this.request.total = this.totalPrice;
        console.log(this.request);
        firebase.firestore().collection("rentalRequests")
            .add(this.request)
            .then(() => {
                alert("Request submitted");
                this.$router.push("/MyRentals");
                })
                .catch((error) => {
                alert(error.message);
                });
        //const listing_id = this.$route.query.listing_id
        //this.$router.push({name: 'rentalRequest',  query: { listing_id: listing_id }})
      },
      goListed: function () {
        this.$router.push({
          name: 'rentalRequest',
          params: {
            listing_id: this.listing_id,
        }
      });
    },

    moveToUpdateProfile : function() {
      this.$router.push({name: 'updateProfile'});
    },
  },
  computed : {
    totalPrice: function() {
        var rfrom =  new Date(this.request.rfrom);
        var rto = new Date(this.request.rto);
        var days = parseInt((rto - rfrom) / (24*3600*1000));
        if (isNaN(days)) {
          return 0;
        } else {
          return (days+1) * this.listing.price;
        }
    }
  },

  created:function() {
    console.log("check is listing_is is passed down here")
    console.log(this.listing_id)
    this.fetchItems();
    this.fetchUser();
  }
}

</script>
<style scoped>
.carousel-item > img {
  height:600px;
  width:100%;
  margin: 0 auto
}

ul {
  list-style-type: none;
}

ul li:before {
  content : '';
  display: inline-block;
  height:20px;
  width:20px;
  background-size: 20px;
  background-image : url('../assets/rules.png');
  background-repeat: no-repeat;
  margin-right: 10px;
}

</style>