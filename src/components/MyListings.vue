<template>
<div>
   <h1> {{this.username}}'s Listings</h1>
   <h2 v-if="listingsArray.length == 0">You do not have any listings yet! </h2>
   <br>
   <li id="listing" v-for="(listing, index) in listingsArray" :key="index">
        {{ listing[1].model }}
      <div class="listingInfo">
        <br>
        <p >From {{listing[1].afrom}} to {{listing[1].ato}}</p>
        <!-- <div class="status">
          <p id = "pending" v-if="listing[1].status === 'pending'" >
            Status: {{listing[1].status}}</p>
          <p id = "completed" v-else-if="listing[1].status === 'completed'" >
            Status: {{listing[1].status}}</p>
          <p id = "ongoing" v-else-if="listing[1].status === 'ongoing'" >
            Status: {{listing[1].status}}</p>
          <p v-else>Status not Available</p>
        </div> -->
        <img v-if="listing[1].images.length != 0" :src='listing[1].images[0]'>
      </div>
    </li>

   <div>

   </div>


</div>
    
</template>


<script>
import firebase from 'firebase'

export default {
  name: 'MyListings',
  data() {
    return {
      listingsArray: [],
      uid:'',
      username:'',
      listingStatus:'',
    }
  },
  methods: {
    fetchUser: function () {
      var user = firebase.auth().currentUser;
      this.uid = user.uid;
      firebase.firestore()
        .collection("userInfo")
        .doc(this.uid)
        .get()
        .then((snapshot) => {
          this.username = snapshot.data().username;
        });
    },
    fetchListings: function () {
      this.fetchUser();
      firebase
        .firestore()
        .collection("listings")
        .where("ownerID", "==", this.uid)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              this.listingsArray.push([doc.id, doc.data()]);
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        },

  },
  created:function() {
      this.fetchListings();
  },

}

</script>

<style scoped>
h1 {
  margin-top: 20px;
  margin-left: 50px;
}
h2 {
  margin-top: 20px;
  margin-left: 50px;
}

img {
  width: 200px;
  height: 120px;
  margin-top: 0px;
  margin-bottom: 20px;
  
}

li {
  margin-left: 50px;
  width: 80%;
  margin-top: 50px;
}
.listingInfo {
 margin-left: 50px;
 margin-top: 10px;
 margin-bottom: 10px;
 font-size: 15px;
}
#pending {
  color:#EFC050
}
#completed {
  color:#88B04B
}
#ongoing {
  color:#7FCDCD
}

</style>