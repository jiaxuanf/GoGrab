<template>
  <div>
  <div>

    
  </div>
    <b-container style = "width:80%; margin: 0 auto; overflow:auto;" class = "pt-5 pl-5"> 
        <b-row v-for = "(chunk,index) in chunkedReviewsArray" :key = "index" class = "mb-4 align-self-stretch">
          <b-col lg = '6' v-for="(listingData,index) in chunk" :key="index"></b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      reviewsArray: [],
      chunkedReviewsArray : [],
      total: 0,
      name: "",
    };
  },
  methods: {
    fetchReviewsAndName: function () {
      const user = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection("userInfo")
        .where("id", "==", user.uid)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log("username: " + doc.data().username);
            this.name = doc.data().username;
          });
        })
        .catch((error) => {
          console.log("error: " + error);
        });
      firebase
        .firestore()
        .collection("reviews")
        .where("ownerID", "==", user.uid)
        .orderBy("reviewValue", "desc")
        .get()
        .then((snapshot) => {
          snapshot
            .forEach((doc) => {
              this.total += doc.data().reviewValue;
              this.reviewsArray.push(doc.data());
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        });
    },
  },
  created() {
    this.fetchReviewsAndName();
  },
  computed: {
    getAverage: function () {
      return this.total / this.reviewsArray.length;
    },
  },
};


</script>

<style scoped>
</style>