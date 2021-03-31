<template>
  <div id="app">
    <h1>Build trust among the GoGrab community!</h1>
    <h1>Leave a review today!</h1>
    <br /><br /><br />
    <ul>
      <form>
        <h1>Review:</h1>
        <StarRating v-model="reviewData.reviewValue"> </StarRating>
        <h3>Rating selected: {{ reviewData.reviewValue }}/5</h3>
        <label for="reviewText"></label>
        <br />
        <textarea
          id="reviewText"
          placeholder="Enter your review description here"
          name="reviewText"
          v-model="reviewData.reviewText"
          rows="7"
          cols="50"
        >
        </textarea>
      </form>
    </ul>
    <br><br><br>
    <button id="submit" v-on:click="addReview()">Submit</button>
  </div>
</template>

<script>
import firebase from "firebase";
import { StarRating } from "vue-rate-it";

export default {
  data() {
    return {
      reviewData: {
        reviewValue: 0,
        reviewText: "",
      },
    };
  },
  props: {},
  components: {
    StarRating,
  },
  methods: {
    addReview: function () {
      console.log("start addReview");
      firebase
        .firestore()
        .collection("reviews")
        .add(this.reviewData)
        .then(() => {
          alert("Review submitted!");
          //this.$router.push("/listed");
        })
        .catch((error) => {
          alert(error.message);
        });
      console.log("after addReview");
    },
  },
};
</script>

<style>
ul {
  margin: 0 10px;
  text-align: left;
  margin-left: 20%;
  margin-top: 10px;
  margin-bottom: 10px;
}
/*button */
#submit {
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
