<template>
  <div>
    <div id="stats">
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
      <div class="listings">
        <ul>
          <li v-for="(listing, index) in listingsArr" :key="index">
            <div class="indivListing">
              <div class="details">
                <h4>{{ index + 1 }}) {{ listing[0] }}</h4>
                <br />
                <p style="font-size: 20px">From:{{ listing[1] }}</p>
                <p style="font-size: 20px">To:{{ listing[2] }}</p>
              </div>
              <div class="carPic">
                <img
                  height="100"
                  width="100"
                  :src="listing[3]"
                  alt="no car picture"
                />
              </div>
            </div>
          </li>
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
      uid: "",
      listingsArr: [],
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
    async getListings() {
      console.log("went through getlistings()");
      console.log("id is: " + this.uid);
      await firebase
        .firestore()
        .collection("listings")
        .where("uid", "==", this.uid)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.listingsArr.push([
              doc.data().model,
              doc.data().afrom,
              doc.data().ato,
              doc.data().images[0],
            ]);
            console.log("img link is:" + doc.data().images[0]);
          });
        });
    },
    reviewCount: function () {
      const user = firebase.auth().currentUser;
      console.log("userID: " + user.uid);
      firebase
        .firestore()
        .collection("listings")
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
    this.getListings();
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
.listings {
  position: relative;
  margin-top: 10px;
  float: bottom;
  vertical-align: bottom;
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
.indivListing {
  height: 200px;
  border: 1px solid #222;
  margin: 30px;
}
.details {
  float: left;
  width: 50%;
}
.carPic {
  float: right;
  width: 50%;
  padding: 20px;
}
</style>