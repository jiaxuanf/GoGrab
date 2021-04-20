<template>
    <div>
        <b-card>
            <b-card-img v-bind:src = "requests[1]['imageURL']" style = "max-width:500px; height:300px;"> </b-card-img>
            <b-card-title class = "mb-1">{{requests[1]['model']}} </b-card-title>
            <b-card-text class = "mb-2">{{requests[1]['brand']}}</b-card-text>
            <b-card-text class = "mb-0">Booked From: {{startDate}} </b-card-text>
            <b-card-text>Booked To: {{endDate}} </b-card-text>
            <b-card-text>Requested By: <img :src = "profilePictureURL" style = "height: 30px; width:30px"/>{{renterName}} </b-card-text>
            <hr />
            <b-card-text style ="text-align:right"><strong>Total Cost: ${{requests[1]['total']}} SGD</strong></b-card-text>
            <b-button variant = "primary" class = "mr-4" v-on:click = "chat">Chat With Rider</b-button>
            <b-button v-on:click = "displayLicense = !displayLicense" v-if = "requests[1]['status'] == 'Pending'">View Driver's License </b-button>
            <b-modal v-model="displayLicense" title = "Check your rider's driver's license" style = "width:50%; height50%;">
                <b-img :src = "licenseURL" fluid-grow></b-img>
            </b-modal>
            <hr />
            <b-button variant = "success" v-if = "requests[1]['status'] == 'Pending'" v-on:click = "confirm" class = "mr-2">Confirm</b-button>
            <b-button variant = "danger" v-if = "requests[1]['status'] == 'Pending'" v-on:click = "reject" >Reject</b-button>
            <b-button variant = "primary" v-else-if= "requests[1]['status'] == 'Ongoing'" v-on:click = "complete">Complete </b-button>
        </b-card>
    </div>    
</template>

<script>
import database from "../main.js"
import firebase from "firebase"
import moment from "moment"
import _ from "lodash"


export default {

    data() {
        return  {
            requests : this.props['requests'],
            listingsArray : this.props['listings'],
            renterName : null,
            profilePictureURL : null,
            licenseURL : null,
            startDate :  moment(this.props['requests'][1]['rfrom']).format('Do MMMM YYYY'),
            endDate :  moment(this.props['requests'][1]['rfrom']).format('Do MMMM YYYY'),
            displayLicense: false,
        }
    },
    props: {
        props: Object,
    },

    methods: {
        async chat() {
            const renterID = this.requests[1]["renterID"];
            var username = "";
            var profileURL = "";
            await database
                .collection("userInfo")
                .where("id", "==", renterID)
                .get()
                .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    username = doc.data().username;
                    profileURL = doc.data().profilePictureURL;
                });
                });
            var peerInfo = {
                id: renterID,
                name: username,
                URL: profileURL,
            };
            this.$router.push({ name: "chats", query: { peerInfo: peerInfo } });
        },

        confirm : function() {
            const request_id = this.requests[0];
            const listing_id = this.requests[1]['listing_id'];
            firebase
                .firestore()
                .collection("rentalRequests")
                .doc(request_id)
                .update({ status: "Ongoing"})
                .then(() => {
                    this.disableListing(listing_id);
                    this.updateAllListings(listing_id, request_id);
                    location.reload();
                });
        },

        updateAllListings : function(listing_id, request_id) {
            var tempArray = _.cloneDeep(this.listingsArray);
            tempArray = tempArray.filter((rentalRequest) => rentalRequest[1]['listing_id'] == listing_id);
            tempArray = tempArray.filter((rentalRequest) => rentalRequest[0] != request_id)
            for (let i = 0; i < tempArray.length; i++) {
                var doc_id = tempArray[i][0]
                firebase.firestore().collection("rentalRequests").doc(doc_id).update({status: "Denied"});
            }
        },

        disableListing : function(listing_id) {
            firebase.firestore().collection("listings").doc(listing_id).update({status:"Completed"})
        },

        reject : function() {
            const request_id = this.requests[0];
            firebase
                .firestore()
                .collection("rentalRequests")
                .doc(request_id)
                .update({ status: "Denied" })
                .then(() => {location.reload()});
        },

        complete : function() {
            const request_id = this.requests[0];
            firebase.firestore().collection("rentalRequests")
                .doc(request_id)
                .update({status:"Completed"})
                .then(() => {location.reload()})                
        },
    },

    created : function() {
        const renterID = this.requests[1]['renterID'];
        firebase.firestore().collection("userInfo")
            .doc(renterID)
            .get()
            .then((doc) => {
                const data = doc.data();
                this.renterName = data['username'];
                this.profilePictureURL = data['profilePictureURL']
                this.licenseURL = data['licenseURL']
            })
    }
}
</script>


<style scoped>

</style>