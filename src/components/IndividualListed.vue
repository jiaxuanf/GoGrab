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
        <b-col sm = 2><strong>The Car</strong> </b-col>
        <b-col sm = 8><h2>{{this.listing.model}}</h2><br>
          <p>Color : {{this.listing.color}} </p>
          <p>Age : {{this.listing.age}} </p>
          <p v-if="this.listing.defect != ''">Defects : {{this.listing.defect}} </p> 
          <p>Hosted by : {{this.username}} </p>
        </b-col>
        <b-col sm = 2><b-button @click = "rent" variant = "primary">Rent Now!</b-button> </b-col>
      </b-row>
      <br>
      <b-row no-gutters style = "{width: 60%}"> 
        <b-col sm = 2><strong>Price Per Day</strong></b-col>  
        <b-col sm = 8><strong>${{this.listing.price}} SGD/Day </strong></b-col>
      </b-row>
      <br><br>
      <b-row no-gutters style = "{width: 60%}"> 
        <b-col sm = 2><strong>Availability </strong> </b-col>
        <b-col sm = 8><b-calendar readonly :min = "this.listing.afrom" :max = "this.listing.ato"> </b-calendar> </b-col>
      </b-row>
      <br><br>
      <b-row no-gutters style = "{width: 60%}"> 
        <b-col sm = 2><strong>Car Description</strong> </b-col>
        <b-col sm = 8>{{this.listing.description}} </b-col>
      </b-row>
      <b-row> 
        <b-col sm = 2><strong>Owner's Rules</strong></b-col>
        <b-col sm = 8>{{this.listing.rules}}</b-col>
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
          const car = firebase.firestore().collection("listings").doc(this.$route.params.listing_id)
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
        const listing_id = this.$route.params.listing_id
        this.$router.push({name: 'rentalRequest',  params: { listing_id: listing_id }})
      },
      goListed: function () {
        this.$router.push({
          name: 'rentalRequest',
          params: {
            listing_id: this.listing_id,
        }
      });
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

</style>