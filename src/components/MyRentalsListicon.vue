<template>
    <div> 
        <b-card> 
            <b-card-img v-bind:src = "booking[1]['imageURL']" style = "max-width:500px; height:300px;"> </b-card-img>
            <b-card-title class = "mb-1">{{booking[1]['model']}} </b-card-title>
            <b-card-text class = "mb-2">{{booking[1]['brand']}}</b-card-text>
            <b-card-text class = "mb-0">Booked From: {{booking[1]['rfrom']}} </b-card-text>
            <b-card-text>Booked To: {{booking[1]['rto']}} </b-card-text>
            <hr>
            <b-card-text style ="text-align:right"><strong>Total Cost: ${{booking[1]['total']}} SGD</strong></b-card-text>
            <b-button variant = "primary" class = "mr-4" v-on:click = "chat">Chat With Owner</b-button>
            <b-button variant = "secondary" v-if = "booking[1]['status'] == 'Completed' && booking[1]['reviewerID'] == null" v-on:click = "goReview">Review Now</b-button>
        </b-card>
    </div>
</template>

<script>
import database from "../main.js"
//import firebase from "firebase"

export default {
    props : {
        booking: Array,
    },
    
    methods : {
        goReview: function () {
            const listing_ID = this.booking[1]["listing_id"]
            const owner_ID = this.booking[1]["ownerID"]
            const rentalRequest_ID = this.booking[0]
            console.log(listing_ID);
            this.$router.push({
                name: "reviewForm",
                params: {
                listingID: listing_ID,
                ownerID: owner_ID,
                rentalRequestID: rentalRequest_ID,
                },
            });
        },

        async chat() {
            const ownerID = this.booking[1]["ownerID"];
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
    
    created: function() {
        console.log(this.booking);
    } 


}
</script>

<style scoped>

</style>