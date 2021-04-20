<template>
    <div> 
        <b-card> 
            <b-card-img v-bind:src = "booking[1]['imageURL']" style = "max-width:500px; height:300px;"> </b-card-img>
            <b-card-title class = "mb-1">{{booking[1]['model']}} </b-card-title>
            <b-card-text class = "mb-2">{{booking[1]['brand']}}</b-card-text>
            <b-card-text class = "mb-0">Booked From: {{startDate}} </b-card-text>
            <b-card-text>Booked To: {{endDate}} </b-card-text>
            <b-card-text>Hosted By : <b-img :src = "profilePictureURL" style = "width:30px; height:30px;"></b-img>{{ownerName}}</b-card-text>
            <b-card-text v-if = "booking[1]['status'] == 'Ongoing'">Contact {{ownerName}} at {{phoneNumber}} </b-card-text>
            <hr>
            <b-card-text style ="text-align:right"><strong>Total Cost: ${{booking[1]['total']}} SGD</strong></b-card-text>
            <b-button variant = "primary" class = "mr-4" v-on:click = "chat">Chat With Owner</b-button>
            <b-button variant = "secondary" v-if = "booking[1]['status'] == 'Completed' && booking[1]['reviewerID'] == null" v-on:click = "goReview">Review Now</b-button>
        </b-card>
    </div>
</template>

<script>
import database from "../main.js"
import moment from "moment"
import firebase from "firebase"

export default {
    data() {
        return {
            startDate :moment(this.booking[1]['rfrom']).format('Do MMMM YYYY'),
            endDate : moment(this.booking[1]['rto']).format('Do MMMM YYYY'),
            ownerName : null,
            profilePictureURL : null,
            phoneNumber : null,
        }
    },

    props : {
        booking: Array,
    },
    
    methods : {
        goReview: function () {
            const listing_ID = this.booking[1]["listing_id"]
            const owner_ID = this.booking[1]["ownerID"]
            const rentalRequest_ID = this.booking[0]
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
            this.$router.push({ name: "chats", query: { peerInfo: peerInfo } });
        },
    },
    
    created : function() {
        const ownerID = this.booking[1]['ownerID'];
        firebase.firestore().collection("userInfo")
            .doc(ownerID)
            .get()
            .then((doc) => {
                const data = doc.data();
                this.ownerName = data['username'];
                this.profilePictureURL = data['profilePictureURL']
                this.phoneNumber = data['phoneNumber']
            })
    }


}
</script>

<style scoped>

</style>