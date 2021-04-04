<template>
    <div v-bind:doc_id = "rental[0]" v-on:click = "moveIndividual($event)">
        <div v-bind:doc_id = "rental[0]" > <img id = "carImage" v-bind:doc_id = "rental[0]" v-bind:src = "rental[1]['images'][0]" /> </div>
        <p id="NameRating" v-bind:doc_id = "rental[0]" > <strong v-bind:doc_id = "rental[0]" >{{rental[1]['model']}}</strong> <br> {{rental[1]['age']}} Years Old </p> <br><br>
        <p id="Price" v-bind:doc_id = "rental[0]" >${{rental[1]['price']}} SGD/Day</p>
    </div>
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
        moveIndividual : function(event) {
            const listing_id = event.target.getAttribute("doc_id");
            this.$router.push({name: 'IndividualListed',  params: { listing_id: listing_id }})
        }
     },

    created:function() {
        console.log(this.rental[1]);
    }
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
