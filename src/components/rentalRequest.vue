<template>
<div id="rentalForm">
<br>
<h1>Send A Rental Request</h1>
<form>
<h3>I have read the terms and conditions as stated by the renter: </h3>
    
    <input type="checkbox" id="read" value="read" required v-model="request.read">
    <label for="read"> check </label><br>
    

<h3>Any notes for the owner?</h3>
    <textarea id="note" name="note" rows="4" cols="50" v-model="request.note"/>
<h3>Choose the rental d do you intend to rent the car?</h3>
    <label for="rfrom">Rent From:  </label> <input type="date" id="rfrom" name="rfrom" v-model="request.rfrom" @change="calculateDays"> 
    <label for="rto"> To:  </label> <input type="date" id="rto" name="rto" v-model="request.rto" @change="calculateDays"><br><br>
<h3>Price/day</h3>
<p id="dailyPrice"> </p>
<h3>Total</h3>
<p id="numdays"> </p>


<h3>Payment Method</h3>
   
    <input type="radio" id="creditCard" name='paymentMethod' value=true v-model="request.paymentMethod.creditCard">
    <label for="creditCard"> Credit Card </label><br>
    <input type="radio" id="cash" name='paymentMethod' value=true v-model="request.paymentMethod.cash">
    <label for="cash"> Cash </label><br>
    

<button @click="submit">Rent</button>
</form>
</div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'RentalRequest',
  props: {
    listing_id: String
  },
  data(){
    return {
      request: {
        read:'',
        note:'',
        rfrom:'',
        rto:'', 
        total: '', //get from the collection parasm
        paymentMethod: {
            creditCard:'', // value = true if Chosen; value = '' if not Chosen
            cash:'',
        },
        ownerID:'',
        renterID:'',
        listing_id: this.listing_id,
        model:'',
        imageULR:'',
        price:'',
        status:'',

      },
      pickUpDate:Date(this.rfrom),
      returnDate:Date(this.rto),
  }},


  methods : {
    getCurrentUser: function() {
      var user = firebase.auth().currentUser;
      var uid

      if (user != null) {
        uid = user.uid;
        return uid;
      }
    },
    getOwnerID: function() {
        console.log("this.listed_id is : "+ this.listing_id)
        const car = firebase.firestore().collection("listings").doc(this.listing_id)
        car.get().then((doc) => {
              if (doc.exists) {
                  this.request.ownerID = doc.get("ownerID")
                  console.log("ownerID is " + this.request.ownerID)
 
              } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
              }
          }).catch((error) => {
              console.log("Error getting document:", error);
          });
    },

    submit : function() {
            console.log("read ✅" + this.request.read)
            this.request.renterID = this.getCurrentUser(); 
            this.request.status = "Pending" 
            console.log(this.request.renterID)
            firebase.firestore().collection("rentalRequests")
            .add(this.request)
            .then(() => {
                alert("Request submitted");
                this.$router.push("/MyRentals");
                })
                .catch((error) => {
                alert(error.message);
                });
            console.log("done");
    
    },
    getListingInfo: function() {
        console.log("start getListingInfo ✅")
        const car = firebase.firestore().collection("listings").doc(this.listing_id)
        car.get().then((doc) => {
              if (doc.exists) {                  
                  this.request.model = doc.get("model")
                  console.log(this.request.model)
                  this.request.price = doc.get("price")
                  document.getElementById("dailyPrice").innerText=this.request.price
                  var images = doc.get("images")
                  console.log("images is ")
                  console.log(images)
                  this.request.imageULR = images[0]
              } else {
                  console.log("No such document!");
              }
          }).catch((error) => {
              console.log("Error getting document:", error);
          });

    },

    calculateDays : function() {
        var rfrom = new Date(this.request.rfrom)
        var rto = new Date(this.request.rto)
        var days = parseInt( (rto - rfrom) / (24 * 3600 * 1000) )
        if (document.getElementById("rto")) {
            var total = days * this.request.price
            document.getElementById("numdays").innerText=total
            this.request.total = total
        } else {
            document.getElementById("numdays").innerText=0
        }
        
    },
    // calculateDays: function() {
    //     return Math.floor((Date.UTC(this.returnDate.getFullYear(), this.returnDate.getMonth(), this.returnDate.getDate()) - Date.UTC(this.pickUpDate.getFullYear(), this.pickUpDate.getMonth(), this.pickUpDate.getDate()) ) /(1000 * 60 * 60 * 24));
    // },

  },
  created:function() {
        this.getOwnerID();
        this.getListingInfo();
        console.log(typeof this.request.read)
  }

}

</script>

<style scoped>
label {
    margin: 20px;
}

#rentalForm {
    margin-left: 50px;
}
</style>
