<template>
  <div id="app" style = "font-size:20px;">
    <b-card style = "width:50%; margin: 0 auto;" class = "mt-5">
      <b-button v-on:click = "goBack()" variant = "primary" > Back </b-button>
      <b-card-title style = "display:inline;" class = "ml-5">Leave a Review to help your host improve!</b-card-title>
      <br />
      <hr />
      <b-card-text><h4>{{this.view.carModel}} </h4> </b-card-text>
      <b-card-img v-bind:src = "this.view.imageURL" class = "mb-3"> </b-card-img>
      <b-card-text>Rented From: {{this.view.startDate}}</b-card-text>
      <b-card-text>Rented To: {{this.view.endDate}}</b-card-text> 
      <b-card-text><img v-bind:src = "this.view.ownerPicture" style = "width:50px; height:50px;">  Hosted By: {{this.view.ownerName}}</b-card-text>
      <hr />
      <label class = "mt-2"><strong> Rate your ride experience!</strong> </label><br>
      <b-form-rating v-model = "reviewData.reviewValue" variant = "warning" size = "lg">  
      </b-form-rating>
      <br>
      <p>Rating: {{reviewData.reviewValue}}</p>
      <hr />
      <br>
      <label><strong>Leave a private review for your host!</strong> </label><br>
      <b-form-textarea rows = "8" v-model = "reviewData.reviewText" placeholder = "Review..."> </b-form-textarea><br>
      <div style = "text-align:center"><b-button v-on:click = "addReview()" variant = primary style = "margin:0 auto;">Submit Review</b-button></div>
    </b-card>
  </div>
</template>

<script>
import firebase from "firebase";
import moment from "moment";

export default {
  data() {
    return {
      view: {
        imageURL: null,
        startDate: null,
        endDate: null,
        carModel :null,
        ownerName : null,
        ownerPicture: null,
      }, 
      reviewData: {
        reviewerID:"",
        reviewValue: 0,
        reviewText: "",
        listingID: this.listingID,
        ownerID: this.ownerID,
        rentalRequestID: this.rentalRequestID,
        reviewerUserName: ""
      },
    };
  },
  props: {
    listingID: String,
    ownerID: String,
    rentalRequestID: String
  },
  methods: {
    addReview: async function () {
      console.log("start addReview");
      const user = firebase.auth().currentUser;
      this.reviewData.reviewerID = user.uid;
      this.reviewData.rentalRequestID = this.rentalRequestID;
      // console.log("listingID: " + this.listingID);
      // console.log("ownerID: " + this.ownerID);

      await firebase.firestore().collection("userInfo").doc(user.uid).get().then( (doc) => {
        this.reviewData.reviewerUserName = doc.data().username;
      })

      await firebase
        .firestore()
        .collection("reviews")
        .add(this.reviewData)
        .then(() => {
          alert("Review submitted!");
          this.$router.push("/")
        })
        .catch((error) => {
          alert(error.message);
        });
      console.log("after addReview");

      

      //update rentaRequest document with user's ID as the reviewerID
      const requestRef = await firebase.firestore().collection("rentalRequests").doc(this.rentalRequestID);
      requestRef.update({
        reviewerID: user.uid
      }).then(() => {
        console.log("Listing document successfully updated");
      }).catch((error) => {
        console.log("Error: " + error);
      })
      this.$router.push("/myRentals");

    },
    checkID: function() {
      const user = firebase.auth().currentUser;
      console.log("userid: " + user.uid);
      console.log("listingID: " + this.listingID);
      console.log("rentalRequestID: " + this.rentalRequestID)
    },
    goBack: function() {
          this.$router.push("/myRentals");
    }
  },

  created: function() {
    const rentalID = this.$route.params.rentalRequestID;
    firebase.firestore().collection("userInfo").doc(this.reviewData.ownerID).get().then((doc) => {
        const data2 = doc.data();
        this.view.ownerPicture = data2['profilePictureURL'];
        this.view.ownerName = data2['username'];
    }); 
    firebase.firestore().collection("rentalRequests").doc(rentalID).get().then((doc) => {
        const data = doc.data();
        console.log(data);
        this.view.imageURL = data['imageURL'];
        this.view.startDate = moment(data['rfrom']).format('Do MMMM YYYY');
        this.view.endDate = moment(data['rto']).format('Do MMMM YYYY');
        this.view.carModel = data['model'];
    });
    
  }
};
</script>

<style scoped>
ul {
  margin: 0 10px;
  text-align: left;
  margin-left: 20%;
  margin-top: 10px;
  margin-bottom: 10px;
}
/*button */
.button {
  background-color: indigo;
  border: none;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
  font-size: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#reviewText {
  font-size: 25px;
  border: 5px solid indigo
}
</style>
