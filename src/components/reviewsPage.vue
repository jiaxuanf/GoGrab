<template>
  <div>
  <div style = "text-align:center;">
      <h2 class = "mt-4">View your reviews from your past renters!</h2>
      <b-form-rating readonly v-model = "getAverage" style = "width:60%; margin : 0 auto;" variant = "warning" size = "lg" class = "mt-4"></b-form-rating> 
      <p><strong>Average Rating: {{getAverage}}/5</strong></p>
  </div>
    <b-container style = "width:80%; margin: 0 auto; overflow:auto;" class = "pt-5 pl-5"> 
        <b-row v-for = "(reviewData,index) in reviewsArray" :key = "index" class = "mb-4 align-self-stretch">
          <b-col ><ReviewsIcon v-bind:review = "reviewData"></ReviewsIcon></b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import firebase from "firebase";
import ReviewsIcon from "./reviewsIcon.vue"

export default {
  data() {
    return {  
      reviewsArray: [],
      chunkedReviewsArray : [],
      total: 0,
      name: "",
    };
  },

  components : {
    ReviewsIcon,
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