<template>
  <div>
    <ol>
      <h1>My Rentals </h1>
      <br>
      <h2 v-if="listingsArray.length == 0">No rentals yet! Rent some cars today! 🚘</h2>
      <li id="listing" v-for="(listing, index) in listingsArray" :key="index">
        {{ listing[1].model }} <br />
        <img />
        <br />
        DATE: {{ listing[1].afrom }} -- {{ listing[1].ato }}<br />${{ listing[1].price }}
        <br />
        <button
          id="reviewButton"
          v-on:click="
            listing_ID = listing[0];
            owner_ID = listing[1].ownerID
            goReview();
          "
          v-if="!listing[1].reviewerID"
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
      listingsArray: [],
      listing_ID: "",
      owner_ID: ""
    };
  },
  methods: {
    fetchListings: function () {
      // console.log("userID: " + user.uid);
const user = firebase.auth().currentUser;
console.log("current user: " + user.uid);
     //current logged in user
      firebase
        .firestore()
        .collection("listings")
        .where("renterID", "==", user.uid)
        .get()
        .then((snapshot) => {
          // var temp = [];
          snapshot
            .forEach((doc) => {
              console.log(doc.id + " ==>" + doc.data());
              this.listingsArray.push([doc.id, doc.data()]);
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
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
const user = firebase.auth().currentUser;
console.log(user.uid);
    this.fetchListings();
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
</style>