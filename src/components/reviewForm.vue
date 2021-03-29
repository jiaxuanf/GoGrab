<template>
  <div id="app">
    <h1>Build trust among the GoGrab community!</h1>
    <h1>Leave a review today!</h1>
    <br /><br /><br />
    <form action="/action_page.php">
      <ul>
        <li>
          <h2>Review:</h2>
          <StarRating v-model="rating"></StarRating>
          <h3>Rating selected: {{ rating }}</h3>
          <br />
          <label id="desc" for="description"></label><br />
          <textarea id="description" name="description" rows="4" cols="50">
          </textarea>
          <br /><br />
        </li>

        <form>
          <input type="submit" id="submit" v-on:click="addReview"/>
        </form>
      </ul>
    </form>
  </div>
</template>

<script>
import { StarRating } from "vue-rate-it";
import database from "../main.js";

export default {
  data() {
    return {
      rating: 0,
    };
  },
  name: "reviewForm",
  props: {},
  components: {
    StarRating,
  },
  methods: {
    addReview: function () {
      console.log("rating is: " + this.rating);
      console.log(
        "description is: " + document.getElementById("description").value
      );
      // const ratingNumber = this.rating;
      // const text = document.getElementById('description').value;
      const newReview = database.collection("reviews").doc();
      console.log(newReview.id);
       database.collection("reviews").doc(newReview.id).set({
          ratingNum: 2,
          description: "hello123"
      }).then(function() {
         console.log("Doc successful");
     })
     .catch(function(error) {
        console.error("Error writing doc", error);
     }); 
      console.log("after addReview"); 
      
      
    }, 
  }, 
};
</script>

<style>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
  text-align: left;
  margin-left: 20%;
  margin-top: 10px;
  margin-bottom: 10px;
}
/*button */
#submit {
  background-color: #c88ad8;
  border: none;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
  font-size: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#description {
  font-size: 25px;
}
</style>
