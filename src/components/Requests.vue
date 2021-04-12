<template>
  <div>
    <h1>Rental Requests received</h1>
    <h2 v-if="listingsArray.length == 0">
      You have not receive any requests yet!
    </h2>
    <br />
    <li id="listing" v-for="(listing, index) in listingsArray" :key="index">
      {{ listing[1].model }}
      <div class="listingInfo">
        <br />
        <p>From {{ listing[1].rfrom }} to {{ listing[1].rto }}</p>
        <p>$ {{ listing[1].total }}</p>
        <div class="status">
          <p id="pending" v-if="listing[1].status === 'Pending'">
            Status: {{ listing[1].status }}
          </p>
          <p id="ongoing" v-else-if="listing[1].status === 'Ongoing'">
            Status: {{ listing[1].status }}
          </p>
          <p id="completed" v-else-if="listing[1].status === 'Completed'">
            Status: {{ listing[1].status }}
          </p>
          <p id="denied" v-else-if="listing[1].status === 'Denied'">
            Status: {{ listing[1].status }}
          </p>
          <p v-else>Status not Available</p>
        </div>
        <img v-if="listing[1].imageURL != ''" :src="listing[1].imageURL" />
        <br /><button
          v-if="listing[1].status == 'Pending'"
          v-bind:doc_id="listing[0]"
          v-on:click="approve($event)"
        >
          Approve
        </button>
        <br /><button
          v-if="listing[1].status == 'Pending'"
          v-bind:doc_id="listing[0]"
          v-on:click="reject($event)"
        >
          Reject
        </button>
        <button
          v-if="listing[1].status == 'Ongoing'"
          v-bind:doc_id="listing[0]"
          v-on:click="complete($event)"
        >
          Complete
        </button>
      </div>
      <button @click="chat">Chat with Renter</button>
    </li>

    <div></div>
  </div>
</template>


<script>
import firebase from "firebase";

export default {
  name: "Requests",
  data() {
    return {
      listingsArray: [],
      uid: "",
      username: "",
      listingStatus: "",
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
    fetchListings: function () {
      this.fetchUser();
      console.log("start fetching listings");
      firebase
        .firestore()
        .collection("rentalRequests")
        .where("ownerID", "==", this.uid)
        .get()
        .then((querySnapshot) => {
          console.log("start querySnapshot");
          querySnapshot.forEach((doc) => {
            console.log("start individual fetching ");
            // doc.data() is never undefined for query doc snapshots
            this.listingsArray.push([doc.id, doc.data()]);
            console.log(doc.id, " => ", doc.data());
          });
          console.log(this.listingsArray);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    approve: function (event) {
      console.log("🐻");
      const request_id = event.target.getAttribute("doc_id");
      console.log(request_id);
      firebase
        .firestore()
        .collection("rentalRequests")
        .doc(request_id)
        .update({ status: "Ongoing" })
        .then(() => {
          alert(
            "You have approved the request. Your renter will contact you shortly!"
          );
          location.reload();
        });
    },
    reject: function (event) {
      const request_id = event.target.getAttribute("doc_id");
      firebase
        .firestore()
        .collection("rentalRequests")
        .doc(request_id)
        .update({ status: "Denied" })
        .then(console.log("Rejected"));

      alert("You have rejected this request.");
    },
    complete: function (event) {
      const request_id = event.target.getAttribute("doc_id");
      firebase
        .firestore()
        .collection("rentalRequests")
        .doc(request_id)
        .update({ status: "Completed" })
        .then(console.log("Completed!"));

      alert("Congradulations! This rental is completed!");
    },
    chat: function () {
      this.$router.push("/chat");
    },
  },
  created: function () {
    this.fetchListings();
  },
  computed: function () {
    this.approve();
    this.reject();
    this.complete();
  },
};
</script>

<style scoped>
h1 {
  margin-top: 20px;
  margin-left: 50px;
}
h2 {
  margin-top: 20px;
  margin-left: 50px;
}

img {
  width: 200px;
  height: 120px;
  margin-top: 0px;
  margin-bottom: 20px;
}

li {
  margin-left: 50px;
  width: 80%;
  margin-top: 50px;
}
.listingInfo {
  margin-left: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 15px;
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