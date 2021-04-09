<template>
  <div>
    <ol>
      <h1>My Rentals </h1>
      <br>
      <h2 v-if="rentalsArray.length == 0">No rentals yet! Rent some cars today! 🚘</h2>
      <li id="listing" v-for="(rental, index) in rentalsArray" :key="index">
        {{ rental[1].model }} <br />
        <img :src = "rental[1].imageULR"/>
        <br />
        DATE: {{ rental[1].rfrom }} -- {{ rental[1].rto }}<br />${{ rental[1].total }}
        <br />
        
        <button
          id="reviewButton"
          v-on:click="
            rental = rental[0];
            owner_ID = rental[1].ownerID
            goReview();
          "
          v-if="!rental[1].reviewerID"
        >
          Review Now!
        </button>
      </li>
    </ol>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  components: { },
  data() {
    return {
      rentalsArray: [],
      listing_ID: "",
      owner_ID: "",
      username:'',
      uid:'',
      
    };
  },
  methods: {
    fetchUser: function () {
      var user = firebase.auth().currentUser;
      this.uid = user.uid;
      firebase.firestore()
        .collection("userInfo")
        .doc(this.uid)
        .get()
        .then((snapshot) => {
          this.username = snapshot.data().username;
        });
      console.log("uid is "+ this.uid)
    },
    fetchRentals: function () {
      this.fetchUser();
      console.log("start fetching rentals")
     //current logged in user
      firebase
        .firestore()
        .collection("rentalRequests")
        .where("renterID", "==", this.uid)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log("start individual fetching ")
              // doc.data() is never undefined for query doc snapshots
              this.rentalsArray.push([doc.id, doc.data()]);
              console.log(doc.id, " => ", doc.data());
            });
            this.fetchListings();
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        

    },
    
    goReview: function () {
      console.log("listing_ID: " + this.listing_ID);
      console.log("owner_ID: " + this.owner_ID);
      this.$router.push({
        name: 'reviewForm',
        params: {
          listingID: this.listing_ID,
          ownerID: this.owner_ID
        }
      });
    },
  },
  created: function () {
    this.fetchRentals();
    console.log("after created functions");
  },
};
</script>

<style>
/*button */
#reviewButton {
  background-color: indigo;
  border: none;
  color: white;
  font-weight: bold;
  padding: 16px 32px;
  text-decoration: none;
  cursor: pointer;
  font-size: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#listing {
  font-size: 25px;
  border: 3px solid indigo;
}

img {
  width: 200px;
  height: 150px;
}
</style>