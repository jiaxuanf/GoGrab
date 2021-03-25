<template>
    <div>
        <div> <img id = "carImage" v-bind:src = "rental['Image']" /> </div>
        <p id="NameRating"> <strong>{{rental['Name']}}</strong> <br> {{rental['Rating']}} </p> <br><br>
        <p id="Price">${{rental['Price']}} SGD/Day</p>
    </div>
</template>

<script>
export default {
    data()  {
        return {
        }
    },
    props : {
        rental : Object,
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
    width:75%;
    height:75%;
} 
</style>
