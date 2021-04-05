<template>
  <div>

    <div id="stats">
      <p class="stat">Reviews: {{ this.numReviews }}</p>
      <div class="topStat">
        <div id="profilePicture">
          <img
            class="profilePic"
            height="170"
            width="170"
            :src="this.img"
            alt="no profile picture"
          />
          <div id="statsView">
            <div class="name">{{ this.username }}</div>
            <button class="numReviews">Reviews: {{ this.numReviews }}</button>
            <div class="followers">Followers: {{ this.numFollowers }}</div>
          </div>
        </div>
      </div>
      <div class="reviews">
        <ul>
        </ul>
      </div>
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
      numFollowers: 0,
      img: "",
    };
  },

  methods: {
    async fetchItems() {
      const user = firebase.auth().currentUser;
      this.uid = user.uid;
      console.log("this is ran");
      console.log("uid is:" + this.uid);
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
    },
  },
  created() {
    this.fetchItems();
    this.getReviews()
  }
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
  margin-top: 10px;
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