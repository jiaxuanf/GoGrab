<template>
    <b-card v-bind:id = "rental[0]" v-on:click = "moveIndividual" style = "height:450px;">
        <b-card-img v-bind:src = "rental[1]['images'][0]" style = "max-width:500px; height:300px;"> </b-card-img>
        <b-card-title class = "mb-1">{{rental[1]['model']}} </b-card-title>
        <b-card-text class = "mb-0">{{rental[1]['brand']}}</b-card-text>
        <hr>
        <b-card-text style ="text-align:right"><strong>${{rental[1]['price']}} SGD/Day</strong></b-card-text>
    </b-card>
</template>

<script>
import firebase from "firebase";
import database from "../main.js";
export default {
  data() {
    return {
      uid: "",
    };
  },
  props: {
    rental: Array,
  },

  methods: {
    async moveIndividual() {
      var user = firebase.auth().currentUser;
      this.uid = user.uid;
      var doc = database.collection("listings").doc(this.rental[0]);
      doc.get().then((doc) => {
        database
          .collection("listings")
          .doc(this.rental[0])
          .update({
            numberOfClicks: doc.data().numberOfClicks + 1,
          });
      });

      console.log("number of clicks: " + (await doc.get("numberOfClicks")));
      const listing_id = this.rental[0];

      this.$router.push({
        name: "IndividualListed",
        query: { listing_id: listing_id },
      });
    },
  },
};
</script>


<style scoped>
#NameRating {
  float: left;
  text-align: left;
}

#Price {
  float: right;
}

#carImage {
  width: 200px;
  height: 200px;
}
</style>
