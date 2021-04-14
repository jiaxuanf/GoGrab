<template>
  <div>
    <ol>
      <h1>My Rentals</h1>
      <br />
      <h2 v-if="rentalsArray.length == 0">
        No rentals yet! Rent some cars today! 🚘
      </h2>
      <li id="listing" v-for="(rental, index) in rentalsArray" :key="index">
        {{ rental[1].model }} <br />
        <img :src="rental[1].imageURL" />
        <br />
        DATE: {{ rental[1].rfrom }} -- {{ rental[1].rto }}<br />${{
          rental[1].total
        }}
        <div class="status">
          <p id="pending" v-if="rental[1].status === 'Pending'">
            Status: {{ rental[1].status }}
          </p>
          <p id="ongoing" v-else-if="rental[1].status === 'Ongoing'">
            Status: {{ rental[1].status }}
          </p>
          <p id="completed" v-else-if="rental[1].status === 'Completed'">
            Status: {{ rental[1].status }}
          </p>
          <p id="denied" v-else-if="rental[1].status === 'Denied'">
            Status: {{ rental[1].status }}
          </p>
          <p v-else>Status not Available</p>
        </div>
        </strong>
        <br />
        <div v-if="rental[1].status === 'Completed'">
          <button
            id="reviewButton"
            v-on:click="
              rentalRequestID = rental[0];
              listing_ID = rental[1].listing_id;
              owner_ID = rental[1].ownerID;
              goReview();
            "
            v-if="!rental[1].reviewerID"
          >
            Review Now!
          </button>
        </div>
        <button v-bind:owner_id="rental[1].ownerID" @click="chat($event)">
          Chat with Owner
        </button>
      </li>
    </ol>
  </div>
</template>

<script>
import firebase from "firebase";
import database from "../main.js"
export default {
  components: {},
  data() {
    return {
      rentalsArray: [],
      listing_ID: "",
      owner_ID: "",
      rentalRequestID: "",
      username: "",
      uid: "",
    };
  },
  methods: {
    fetchUser: function () {
      var user = firebase.auth().currentUser;
      this.uid = user.uid;
      firebase
        .firestore()
        .collection("userInfo")
        .doc(this.uid)
        .get()
        .then((snapshot) => {
          this.username = snapshot.data().username;
        });
      console.log("uid is " + this.uid);
    },
    fetchRentals: function () {
      this.fetchUser();
      console.log("start fetching rentals");
      //current logged in user
      firebase
        .firestore()
        .collection("rentalRequests")
        .where("renterID", "==", this.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log("start individual fetching ");
            // doc.data() is never undefined for query doc snapshots
            this.rentalsArray.push([doc.id, doc.data()]);
            console.log(doc.id, " => ", doc.data());
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },

    goReview: function () {
      console.log("listing_ID: " + this.listing_ID);
      console.log("owner_ID: " + this.owner_ID);
      console.log("rentalRequestID: " + this.rentalRequestID);

      this.$router.push({
        name: "reviewForm",
        params: {
          listingID: this.listing_ID,
          ownerID: this.owner_ID,
          rentalRequestID: this.rentalRequestID,
        },
      });
    },
    async chat(event) {
      const ownerID = event.target.getAttribute("owner_id");
      var username = "";
      var profileURL = "";
      console.log("before await, ownerid: " + ownerID);
      await database
        .collection("userInfo")
        .where("id", "==", ownerID)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            username = doc.data().username;
            profileURL = doc.data().profilePictureURL;
          });
        });
      var peerInfo = {
        id: ownerID,
        name: username,
        URL: profileURL,
      };
      console.log("peerInfo created =>");
      console.log(peerInfo);
      this.$router.push({ name: "chats", query: { peerInfo: peerInfo } });
    },
  },
  created: function () {
    this.fetchRentals();
    console.log("after created functions");
  },
};
</script>

<style scoped>
/*button */
#reviewButton {
  background-color: indigo;
  border: none;
  color: white;
  font-weight: bold;
  padding: 16px 32px;
  text-decoration: none;
  cursor: pointer;
  font-size: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#listing {
  font-size: 25px;
  border: 3px solid indigo;
}

img {
  width: 200px;
  height: 150px;
}

#pending {
  color: #dc4c46;
}
#completed {
  color: #a0daa9;
}
#ongoing {
  color: #f5df4d;
}
#denied {
  color: #dfcfbe;
}
</style>