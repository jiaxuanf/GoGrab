<template>
    <div> 
        <b-card v-bind:id = "listing[0]" v-on:click = "moveIndividual">
            <b-card-img v-bind:src = "listing[1]['images'][0]" style = "max-width:500px; height:300px;"> </b-card-img>
            <b-card-title class = "mb-1">{{listing[1]['model']}}</b-card-title>
            <b-card-text class = "mb-0">{{listing[1]['brand']}}</b-card-text>
            <b-card-text class = "mb-0">Availale from: {{this.startDate}}</b-card-text>
            <b-card-text class = "mb-0">Available until: {{this.endDate}}</b-card-text>
            <hr>
            <b-card-text style ="text-align:right"><strong>${{listing[1]['price']}} SGD/Day</strong></b-card-text>
        </b-card>
    </div>
</template>

<script>
import moment from "moment"

export default {

    data() {
        return {
            startDate : moment(this.listing[1]['afrom']).format('Do MMMM YYYY'),
            endDate : moment(this.listing[1]['ato']).format('Do MMMM YYYY'),
        };
    },
    props: {
        listing: Array,
    },
    methods : {
        moveIndividual : function() {
            this.$router.push({
                name: "IndividualListed",
                query: { listing_id: this.listing[0]},
            })
        }
    }
}
</script>

<style scoped>

</style>
