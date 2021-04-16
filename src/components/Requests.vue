<template>
  <div>
    <div>
      <h3 style = "text-align:center" class = "mt-5">Manage all your rental requests! </h3>
      <b-tabs  content-class="mt-3" justified style = "margin: 0 auto;">
        <b-tab title = "Pending" style = "margin: 0 auto;">
          <h4 style = "text-align:center" v-if = "this.chunkedPendingArray.length === 0">You currently have no pending bookings. List your car now! </h4>
              <b-container style = "margin: 0 auto; overflow:auto; max-width:80%" class = "pt-5"> 
                  <b-row v-for = "(chunk,index) in chunkedPendingArray" :key = "index" class = "mb-4 align-self-stretch">
                      <b-col lg = '4' v-for="(requestData,index) in chunk" :key="index"><RequestsIcon v-bind:props = "{requests: requestData, listings : listingsArray}"></RequestsIcon></b-col>
                  </b-row>
              </b-container>     
        </b-tab>
        <b-tab title = "Ongoing"> 
          <h4 style = "text-align:center" v-if = "this.chunkedOngoingArray.length === 0">You currently have no ongoing bookings. List your car now! </h4>
              <b-container style = "margin: 0 auto; overflow:auto; max-width:80%" class = "pt-5"> 
                  <b-row v-for = "(chunk,index) in chunkedOngoingArray" :key = "index" class = "mb-4 align-self-stretch">
                      <b-col lg = '4' v-for="(requestData,index) in chunk" :key="index"><RequestsIcon v-bind:props = "{requests: requestData, listings : listingsArray}"></RequestsIcon></b-col>
                  </b-row>
              </b-container>  
        </b-tab>
        <b-tab title = "Completed"> 
          <h4 style = "text-align:center" v-if = "this.chunkedCompletedArray.length === 0">You currently have no completed bookings. List your car now! </h4>
              <b-container style = "margin: 0 auto; overflow:auto; max-width:80%" class = "pt-5"> 
                  <b-row v-for = "(chunk,index) in chunkedCompletedArray" :key = "index" class = "mb-4 align-self-stretch">
                      <b-col lg = '4' v-for="(requestData,index) in chunk" :key="index"><RequestsIcon v-bind:props = "{requests: requestData, listings : listingsArray}"></RequestsIcon></b-col>
                  </b-row>
              </b-container>    
        </b-tab>
        <b-tab title = "Denied">
          <h4 style = "text-align:center" v-if = "this.chunkedDeniedArray.length === 0">You currently have no denied bookings.</h4>
              <b-container style = "margin: 0 auto; overflow:auto; max-width:80%" class = "pt-5"> 
                  <b-row v-for = "(chunk,index) in chunkedDeniedArray" :key = "index" class = "mb-4 align-self-stretch">
                      <b-col lg = '4' v-for="(requestData,index) in chunk" :key="index"><RequestsIcon v-bind:props = "{requests: requestData, listings : listingsArray}"></RequestsIcon></b-col>
                  </b-row>
              </b-container> 
        </b-tab>
      </b-tabs>
    </div>
    
  </div>
</template>

<script>
import firebase from "firebase";
import RequestsIcon from "./RequestsIcon.vue"

export default {
  components : {
    RequestsIcon,
  },
  name: "Requests",
  data() {
    return {
      listingsArray: [],
      uid: "",
      username: "",
      listingStatus: "",
      listingsPendingArray : [],
      chunkedPendingArray : [],
      listingsOngoingArray : [],
      chunkedOngoingArray : [],
      listingsCompletedArray : [],
      chunkedCompletedArray : [],
      listingsDeniedArray : [],
      chunkedDeniedArray : [],
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
    },

    fetchListings: function () {
      this.fetchUser();
      firebase
        .firestore()
        .collection("rentalRequests")
        .where("ownerID", "==", this.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.listingsArray.push([doc.id, doc.data()]);
          });
          this.listingsCompletedArray = this.listingsArray.filter((rental) => rental[1]['status'] == "Completed")
          this.listingsOngoingArray = this.listingsArray.filter((rental) => rental[1]['status'] == "Ongoing")
          this.listingsPendingArray = this.listingsArray.filter((rental) => rental[1]['status'] == "Pending")
          this.listingsDeniedArray = this.listingsArray.filter((rental) => rental[1]['status'] == "Denied")
          this.chunkArrays();
        })
    },

    chunkArrays: function() {
      var temp = [];
            for (let i = 0; i < this.listingsCompletedArray.length; i++) {
                temp.push(this.listingsCompletedArray[i]);
                if (temp.length == 3) {
                    this.chunkedCompletedArray.push(temp);
                    temp = [];
                }
            } if (temp.length != 0) {
                this.chunkedCompletedArray.push(temp);
            }

        temp = [];
            for (let i = 0; i < this.listingsPendingArray.length; i++) {
                temp.push(this.listingsPendingArray[i]);
                if (temp.length == 3) {
                    this.chunkedPendingArray.push(temp);
                    temp = [];
                }
            } if (temp.length != 0) {
                this.chunkedPendingArray.push(temp);
            }

        temp = [];
            for (let i = 0; i < this.listingsOngoingArray.length; i++) {
                temp.push(this.listingsOngoingArray[i]);
                if (temp.length == 3) {
                    this.chunkedOngoingArray.push(temp);
                    temp = [];
                }
            } if (temp.length != 0) {
                this.chunkedOngoingArray.push(temp);
            }

        temp = [];
            for (let i = 0; i < this.listingsDeniedArray.length; i++) {
                temp.push(this.listingsDeniedArray[i]);
                if (temp.length == 3) {
                    this.chunkedDeniedArray.push(temp);
                    temp = [];
                }
            } if (temp.length != 0) {
                this.chunkedDeniedArray.push(temp);
            }
    }
  },
  created: function () {
    this.fetchListings();
  },
};
</script>

<style scoped>

</style>