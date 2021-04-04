<template>
  <div>
    <ol>
      <h1>My Reviews</h1>
      <StarRating
          :increment="0.5"
          :border-width= 1
          :item-size= "60"
          :read-only="true"
          :show-rating="false"
          :rating="getAverage"
        >
        </StarRating>
        {{this.averageRating}}/5
      <br />
      <h2 v-if="reviewsArray.length == 0">
        No reviews yet! Rent out some cars today! 🚘
      </h2>
      <li id="review" v-for="(review, index) in reviewsArray" :key="index">
        <StarRating
          :increment="0.5"
          :border-width= 1.5
          :item-size= "60"
          :read-only="true"
          :show-rating="false"
          v-model="review.reviewValue"
        >
        </StarRating>
        {{ review.reviewValue }}/5

        <br />
        userID: {{ review.reviewerID }}
        <br />
        "{{ review.reviewText }}"
        <br />
      </li>
    </ol>
  </div>
</template>

<script>
import firebase from "firebase";
import { StarRating } from "vue-rate-it";

export default {
  data() {
    return {
      reviewsArray: [],
      averageRating: 0,
      total: 0
    };
  },
  methods: {
    fetchReviews:  function () {
      const user = firebase.auth().currentUser;
      console.log("current user: " + user.uid);
      //current logged in user
      firebase
        .firestore()
        .collection("reviews")
        .where("ownerID", "==", user.uid)
        .get()
        .then((snapshot) => {
          snapshot
            .forEach((doc) => {
              console.log(doc.id + " ==>" + doc.data());
              this.total += doc.data().reviewValue
              console.log("total = " + this.total);
              console.log("added " + doc.data().reviewValue + " to total");
              this.reviewsArray.push(doc.data());
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        });
        
    },
  },
  props: {},
  components: {
    StarRating,
  },
  mounted() {
    this.fetchReviews();
  },
  
};
</script>

<style>
#review {
  font-size: 25px;
  border: 3px solid indigo;
  padding: 10px 10px;
}
</style>