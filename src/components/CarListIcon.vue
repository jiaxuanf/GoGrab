<template>
    <b-card v-bind:id = "rental[0]" v-on:click = "moveIndividual">
        <b-card-img v-bind:src = "rental[1]['images'][0]" style = "max-width:500px; height:300px;"> </b-card-img>
        <b-card-title>{{rental[1]['model']}} </b-card-title>
        <b-card-text>${{rental[1]['price']}} SGD/Day</b-card-text>
    </b-card>
</template>

<script>
export default {
    data()  {
        return {
        }
    },
    props : {
        rental : Array,
    },

    methods : { 
        moveIndividual : function() {

            const listing_id = this.rental[0];
            this.$router.push({name: 'IndividualListed',  params: { listing_id: listing_id }})
        }
     },
}
</script>


<style scoped>
#NameRating {
    float:left;
    text-align: left;
}

#Price {
    float:right;
}

#carImage {
    width:200px;
    height:200px;
} 
</style>
