<template>
    <div style = "font-size : 20px">
        <b-card style = "width:80%; margin: 0 auto">
            <div style = "text-align:center;" class = "mb-3">
                <b-card-title class = "mb-0">{{model}} </b-card-title>
                <b-card-text>{{brand}}</b-card-text>
            </div>
            <b-img center :src  = "image" class = "mb-3" style = "margin:0 auto;" fluid alt = "Center image"></b-img>
            <b-form-rating readonly variant = "warning" v-model = "review['reviewValue']" style = "width:80%; margin: 0 auto;"> </b-form-rating>
            <b-card-text class = "mt-3"><strong> Rating: {{review['reviewValue']}}/5 </strong></b-card-text>
            <b-card-text class = "mb-0">Booked From: {{rentedFrom}}</b-card-text>
            <b-card-text>Booked To: {{rentedTo}}</b-card-text>
            <b-card-text>Rented By: <b-img :src = "userURL" style = "width:30px; height:30px;"></b-img> {{review['reviewerUserName']}}</b-card-text>
            <b-button v-b-toggle.collapse-2 class = "mb-3" variant = "primary" v-if = "!reviewText == ''">View Feedback</b-button>
            <b-collapse id="collapse-2">
                {{reviewText}}
            </b-collapse>
        </b-card>
    </div>
</template>

<script>
import firebase from "firebase";
import moment from "moment";

export default {
    data() {
        return {
            rentedFrom : null,
            rentedTo : null,
            image : null,
            model : null,
            brand : null,
            price: null,
            userURL : null,
            reviewText : null,
        } 
    },

    props : {
        review : Object,
    },

    created : function() {
        const listing_id = this.review['listingID'];
        firebase.firestore().collection('listings')
            .doc(listing_id)
            .get()
            .then((doc) => {
                const listingData = doc.data();
                this.rentedFrom = moment(listingData['afrom']).format('Do MMMM YYYY');
                this.rentedTo = moment(listingData['ato']).format('Do MMMM YYYY');
                this.image = listingData['images'][0];
                this.model = listingData['model'];
                this.brand = listingData['brand'];
                this.price = listingData['price'];
            })


        const reviewer_id = this.review['reviewerID']
        firebase.firestore().collection('userInfo')
            .doc(reviewer_id)
            .get()
            .then((doc) => {
                const userInfo = doc.data();
                this.userURL = userInfo['profilePictureURL']
            })
            this.reviewText = this.review['reviewText']
    },
    
}
</script>

<style scoped>

</style>