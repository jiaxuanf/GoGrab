<template>
  <div>
    <div id="profilePicture">profilePicture</div>
    <div id="stats">
      <button class="button" v-on:click="goReviewsPage()"><p class="stat">Reviews: {{ numReviews }}</p></button>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";
import database from "../main.js";

export default {

  mounted() {
    this.reviewCount();
  },

  data() {
    return {
      username: "",
      email: "",
      numReviews: 0,
    };
  },

  methods: {
    async fetchItems() {
      const user = firebase.auth().currentUser;
      this.uid = user.uid;
      database
        .collection("userInfo")
        .doc(this.uid)
        .get()
        .then((snapshot) => {
          this.username = snapshot.data().username;
          this.email = snapshot.data().email;
          this.img = snapshot.data().profilePictureURL;
        });
    },
    async getReviews() {
      await firebase
        .firestore()
        .collection("reviews")
        .where("ownerID", "==", this.uid)
        .get()
        .then((snapshot) => {
          this.numReviews = snapshot.size;
          snapshot.forEach((doc) => {
            if (doc.data().ownerID == this.uid) {
              this.reviews.push([
                doc.data().reviewText,
                doc.data().reviewValue,
              ]);
              console.log("review is:" + doc.data().reviewText);
              console.log("review id is:" + doc.data().reviewValue);
            }
          });
        });
    },
    reviewCount: function () {
      const user = firebase.auth().currentUser;
      console.log("userID: " + user.uid);
          firebase
      .firestore()
      .collection("reviews")
      .where("ownerID", "==", user.uid)
      .get()
      .then((snapshot) => {
        // this.numReviews = snapshot.size;
        console.log("numReviews: " + snapshot.size);
        this.numReviews = snapshot.size;
      });
    },

    goReviewsPage: function () {
      this.$router.push({ path: "/reviewsPage" });
    }
  },
};
</script>

<style scoped>
.profilePic {
  float: left;
  padding: 20px;
  border-radius: 50%;
}
.followers {
  float: left;
  border: 2px solid black;
  border-radius: 4px;
  padding: 5px;
}
.numReviews {
  float: right;
  border: 2px solid black;
  border-radius: 4px;
  padding: 5px;
}
#statsView {
  float: left;
}
.name {
  font-size: 30px;
}
.topStat {
  float: top;
  vertical-align: top;
  position: fixed;
}
.reviews {
  position: relative;
  margin-top:10px;
  float: bottom;
  vertical-align: bottom;
}
li {
  flex-grow: 3;
  flex-basis: 200px;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

.button {
  background-color: indigo;
  border: none;
  color: white;
  padding: 10px 18px;
  text-decoration: none;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  font-size: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  border-radius: 20px;
}
</style>