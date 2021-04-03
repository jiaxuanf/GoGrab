<template>
<div>
<br>
<h1>Send A Rental Request</h1>

<h3>I have read the terms and conditions as stated by the renter: </h3>
    <form>
    <input type="checkbox" id="read" value="read" v-model="request.read">
    <label for="read"> check </label><br>
    </form>

<h3>Any notes for the owner?</h3>
    <textarea id="note" name="note" rows="4" cols="50" v-model="request.note"/>
<h3>Choose the rental d do you intend to rent the car?</h3>
    <label for="rfrom">Rent From:  </label> <input type="date" id="rfrom" name="rfrom" v-model="request.rfrom">
    <label for="rto"> To:  </label> <input type="date" id="rto" name="rto" v-model="request.rto"><br><br>
<h3>Total</h3>
<p></p>
<h3>Payment Method</h3>

</div>
</template>

<script>
// import firebase from 'firebase'
export default {
  name: 'RentalRequest',
  props: {
    msg: String
  },
  data(){
    return {
      request: {
        read:'',
        note:'',
        rfrom:'',
        rto:'', 
        price: '', //get from the collection parasm
        location:'',
        description:'',
        rules:'',
        images:[],
        time: Date.now(), //number
      },
    }}
}

</script>

<style scoped>
label {
    margin: 20px;
}
</style>
