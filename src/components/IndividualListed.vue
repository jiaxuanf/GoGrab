<template>
<div style = "font-size: 20px">
    <br><br>
    <b-carousel
      :interval="0"
      controls
      no-animation
      indicators style = "{width:80%; height:600px; margin-left:auto; margin-right:auto; text-align:center;}">  
      <b-carousel-slide v-for = "(image, index) in this.listing.images" :key = "index">
        <template #img style = "{margin-left:auto; margin-right:auto}"> 
          <img v-bind:src = "image" style = "{margin-left:auto; margin-right:auto}">    
        </template>  
      </b-carousel-slide>
    </b-carousel>
    <br> <br>
    <b-container style = "{margin: 0}">
      <b-row no-gutters style = "{width: 60%}"> 
        <b-col sm = 2><strong>The Car:</strong> </b-col>
        <b-col sm = 8><h2>{{this.listing.model}}</h2><br>
          <b-row>
            <b-col><img src = "../assets/business-and-trade.png" style = "width:30px; height:30px;">  Brand: {{this.listing.brand}}  </b-col>
            <b-col><img src = "../assets/anti-age.png" style = "width:30px; height:30px;">  Age: {{this.listing.age}} </b-col>
          </b-row>
          <b-row>
            <b-col><img src = "../assets/car-seat.png" style = "width:30px; height:30px;">  Seats: {{this.listing.numSeats}} </b-col>
            <b-col><img src = "../assets/automobile-salesman.png" style = "width:30px; height:30px;">  Hosted by: {{this.username}}</b-col>
          </b-row>
        </b-col>
        <b-col sm = 2><b-button @click = "rent" variant = "primary">Rent Now!</b-button> </b-col>
      </b-row>
      <b-row no-gutters style = "{width: 60%}" class = "mt-5">  
        <b-col sm = 2><strong>Price Per Day</strong></b-col>  
        <b-col sm = 8><strong><img src = "../assets/car-price.png" style = "width:30px; height:30px;">  ${{this.listing.price}} SGD/Day </strong></b-col>
      </b-row>
      <b-row no-gutters style = "{width: 60%}" class = "mt-5"> 
        <b-col sm = 2><strong>Availability </strong> </b-col>
        <b-col sm = 8><b-calendar readonly :min = "this.listing.afrom" :max = "this.listing.ato"> </b-calendar> </b-col>
      </b-row>
      <b-row no-gutters style = "{width: 60%}" class = "mt-5"> 
        <b-col sm = 2><strong>Car Description</strong> </b-col>
        <b-col sm = 8>{{this.listing.description}} </b-col>
      </b-row>

      <b-row class = "mt-5"> 
        <b-col sm = 2><strong>Owner's Rules</strong></b-col>
        <b-col sm = 8>
          <ul v-for = "(rules,index) in listing.rules" :key = "index"> 
              <li>{{rules}} </li>
          </ul>
        </b-col>
      </b-row>
      <b-row class = "mt-5">
        <b-col sm = 2><strong>Defects</strong></b-col>
        <b-col sm = 8>Before taking over the car from the owner, please do a check yourself to ensure that there is no visible
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
    <br> <br> <br>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'IndividualListed',
  props: {
    listingID: String
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
        this.$router.push({name: 'rentalRequest',  query: { listing_id: this.$route.query.listing_id}})
      },
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
  width:75%;
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