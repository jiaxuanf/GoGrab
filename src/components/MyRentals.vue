<template>
  <div>
    <div style = "text-align:center" class = "mt-5">
      <h3>View your Bookings</h3>
    </div>
    <div class = "mt-4"> 
        <b-tabs  content-class="mt-3" justified style = "margin: 0 auto;">
          <b-tab title = "Pending" style = "margin: 0 auto;">
              <h4 style = "text-align:center" v-if = "this.chunkedPendingArray.length === 0">You currently have no pending bookings. Book your next trip today! </h4>
              <b-container style = "margin: 0 auto; overflow:auto; max-width:80%" class = "pt-5"> 
                  <b-row v-for = "(chunk,index) in chunkedPendingArray" :key = "index" class = "mb-4 align-self-stretch">
                      <b-col sm = '4' v-for="(bookingData,index) in chunk" :key="index"><RentalsIcon v-bind:booking = "bookingData"></RentalsIcon></b-col>
                  </b-row>
              </b-container>
          </b-tab>
          <b-tab title = "Denied" style = "margin: 0 auto;">
              <h4 style = "text-align:center" v-if = "this.chunkedDeniedArray.length === 0">You currently have no denied requests.</h4>
              <b-container style = "margin: 0 auto; overflow:auto; max-width:80%" class = "pt-5"> 
                  <b-row v-for = "(chunk,index) in chunkedDeniedArray" :key = "index" class = "mb-4 align-self-stretch">
                      <b-col sm = '4' v-for="(bookingData,index) in chunk" :key="index"><RentalsIcon v-bind:booking = "bookingData"></RentalsIcon></b-col>
                  </b-row>
              </b-container>
          </b-tab>
          <b-tab title = "Ongoing" style = "margin: 0 auto;">
              <h4 style = "text-align:center" v-if = "this.chunkedOngoingArray.length === 0">You currently have no ongoing bookings. Book your next trip today! </h4>
              <b-container style = "margin: 0 auto; overflow:auto; max-width:80%" class = "pt-5"> 
                  <b-row v-for = "(chunk,index) in chunkedOngoingArray" :key = "index" class = "mb-4 align-self-stretch">
                      <b-col sm = '4' v-for="(bookingData,index) in chunk" :key="index"><RentalsIcon v-bind:booking = "bookingData"></RentalsIcon></b-col>
                  </b-row>
              </b-container> 
          </b-tab>
          <b-tab title = "Completed" style = "margin: 0 auto;">
              <h4 style = "text-align:center" v-if = "this.chunkedCompletedArray.length === 0">You currently have no completed bookings. Book your next trip today!</h4>
              <b-container style = "margin: 0 auto; overflow:auto; max-width:80%" class = "pt-5"> 
                  <b-row v-for = "(chunk,index) in chunkedCompletedArray" :key = "index" class = "mb-4 align-self-stretch">
                      <b-col sm = '4' v-for="(bookingData,index) in chunk" :key="index"><RentalsIcon v-bind:booking = "bookingData"></RentalsIcon></b-col>
                  </b-row>
              </b-container>
          </b-tab>
          
        </b-tabs>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import RentalsIcon from "./MyRentalsListicon.vue"

export default {
  components: {
    RentalsIcon,
  },
  data() {
    return {
      rentalsArray: [],
      rentalsPendingArray : [],
      chunkedPendingArray : [],
      rentalsOngoingArray : [],
      chunkedOngoingArray : [],
      rentalsCompletedArray : [],
      chunkedCompletedArray : [],
      rentalsDeniedArray : [],
      chunkedDeniedArray : [],
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
    },
    fetchRentals: function () {
      this.fetchUser();
      firebase
        .firestore()
        .collection("rentalRequests")
        .where("renterID", "==", this.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.rentalsArray.push([doc.id, doc.data()]);
          });
          this.rentalsCompletedArray = this.rentalsArray.filter((rental) => rental[1]['status'] == "Completed")
          this.rentalsOngoingArray = this.rentalsArray.filter((rental) => rental[1]['status'] == "Ongoing")
          this.rentalsPendingArray = this.rentalsArray.filter((rental) => rental[1]['status'] == "Pending")
          this.rentalsDeniedArray = this.rentalsArray.filter((rental) => rental[1]['status'] == "Denied")
          this.chunkArrays();

        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },

    chunkArrays: function() {
        var temp = [];
            for (let i = 0; i < this.rentalsCompletedArray.length; i++) {
                temp.push(this.rentalsCompletedArray[i]);
                if (temp.length == 3) {
                    this.chunkedCompletedArray.push(temp);
                    temp = [];
                }
            } if (temp.length != 0) {
                this.chunkedCompletedArray.push(temp);
            }
        temp = [];
            for (let i = 0; i < this.rentalsPendingArray.length; i++) {
                temp.push(this.rentalsPendingArray[i]);
                if (temp.length == 3) {
                    this.chunkedPendingArray.push(temp);
                    temp = [];
                }
            } if (temp.length != 0) {
                this.chunkedPendingArray.push(temp);
            }
        temp = [];
            for (let i = 0; i < this.rentalsOngoingArray.length; i++) {
                temp.push(this.rentalsOngoingArray[i]);
                if (temp.length == 3) {
                    this.chunkedOngoingArray.push(temp);
                    temp = [];
                }
            } if (temp.length != 0) {
                this.chunkedOngoingArray.push(temp);
            }
        temp = [];
            for (let i = 0; i < this.rentalsDeniedArray.length; i++) {
                temp.push(this.rentalsDeniedArray[i]);
                if (temp.length == 3) {
                    this.chunkedDeniedArray.push(temp);
                    temp = [];
                }
            } if (temp.length != 0) {
                this.chunkedDeniedArray.push(temp);
            }
    },  
  },
  created: function () {
    this.fetchRentals();
  },
};
</script>

<style scoped>

</style>