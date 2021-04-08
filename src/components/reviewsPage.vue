<template>
  <div>
    <ol id="main">
      <h1>{{this.name}}'s' Reviews</h1>
      <StarRating
          :increment="0.1"
          :border-width= 1
          :show-rating="false"
          :item-size= "60"
          :read-only="true"
          v-model="getAverage"
          
        >
        </StarRating>
        <h3>{{this.getAverage.toFixed(2)}}/5</h3>
      <br />
      <h2 v-if="reviewsArray.length == 0">
        No reviews yet! Rent out some cars today! 🚘
      </h2>
      <li id="review" v-for="(review, index) in reviewsArray" :key="index">
        <StarRating
          :increment="1"
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
      total: 0,
      name: ""
    };
  },
  methods: {
    fetchReviewsAndName:   function () {
      const user = firebase.auth().currentUser;
      //get username
      firebase.firestore().collection("userInfo").where("id", "==", user.uid).get().then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log("username: " + doc.data().username)
          this.name = doc.data().username
        });
      }).catch((error) => {
        console.log("error: " + error)
      })
      // get reviews
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
  created() {
    this.fetchReviewsAndName();
  },
  computed: {
    getAverage: function() {
      return this.total / (this.reviewsArray.length);
    },
  }
  
};
</script>

<style>

#review {
  font-size: 25px;
  border: 3px solid indigo;
  padding: 10px 10px;
}


</style>