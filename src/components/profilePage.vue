<template>
  <div>
    <div style = "height:100vh;width:20%; float:left; text-align:center; position: sticky; top:0; background-color:#DED3FF">
      <br><br>
      <img
            class="profilePic"
            height="170"
            width="170"
            :src="this.img"
            alt="no profile picture"
          />
      <h5>{{this.username}} </h5>
      <br>
      <b-button v-on:click = "goToReviewsPage" style = "background-color: indigo">View your reviews: {{this.numReviews}}</b-button> <br /> <br />
      <b-button v-on:click = "goDashboard" style = "background-color: indigo">Your listing Dashboard </b-button>
    </div>
    <b-container style = "width:80%; margin: 0 auto; overflow:auto;" class = "pt-5 pl-5"> 
        <b-row v-for = "(chunk,index) in chunkedListingsArr" :key = "index" class = "mb-4 align-self-stretch">
          <b-col lg = '6' v-for="(listingData,index) in chunk" :key="index"><profileListIcon v-bind:listing = "listingData"></profileListIcon></b-col>
        </b-row>
    </b-container>
  </div>
</template>


<script>
import firebase from "firebase";
import database from "../main.js";
import profileListIcon from "./profileListIcon.vue"

export default {
  components: {
    profileListIcon,
  },
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
      chunkedListingsArr: [],
    };
  },

  methods: {
     fetchItems() {
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

    get_listings : function() {
        firebase.firestore().collection("listings").where("ownerID", "==", this.uid)
        .get()
        .then((snapshot) => {
          var temp = [];
          snapshot.docs.forEach(doc => {
            temp.push([doc.id, doc.data()]);
            if (temp.length == 2) {
              this.chunkedListingsArr.push(temp);
              temp = [];
            }
          });
          if (temp.length != 0) {
            this.chunkedListingsArr.push(temp);
          }  
        })
    },

    reviewCount: function () {
      const user = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection("reviews")
        .where("ownerID", "==", user.uid)
        .get()
        .then((snapshot) => {
          // this.numReviews = snapshot.size;
          this.numReviews = snapshot.size;
        });
    },

    goToReviewsPage: function () {
      this.$router.push({ path: "/reviewsPage" });
    },
    goDashboard: function () {
      this.$router.push({ path: "/Dashboard" });
    },
  },
  created() {
    this.fetchItems();
    this.reviewCount();
    this.get_listings();
  },
};
</script>

<style scoped>
.profilePic {
  border-radius: 50%;
}

</style>