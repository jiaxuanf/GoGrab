<template>
  <div>
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
          <div class="numReviews">Reviews: {{ this.numReviews }}</div>
          <div class="followers">Followers: {{ this.numFollowers }}</div>
        </div>
      </div>
    </div>
    <div class="reviews">
      <ul>
        <li v-for="(review, index) in reviews" :key="index">
          <h4>Review: 
            <br>
            <p style="font-size:20px"> {{ review[0]}} </p></h4>
          <br />
          <h4>Ratings: 
            {{ review[1] }}/5</h4>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";
import database from "../main.js";

export default {
  data() {
    return {
      username: "",
      email: "",
      img: "",
      numReviews: 0,
      numFollowers: 0,
      uid: "",
      reviews: [],
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
  },
  created() {
    this.fetchItems();
    this.getReviews();
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
</style>