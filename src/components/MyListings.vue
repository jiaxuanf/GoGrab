<template>
<div>
   <h1> {{this.username}}'s Listings</h1>
   <h2 v-if="listingsArray.length == 0">You do not have any listings yet! </h2>
    <li id="listing" v-for="(listing, index) in listingsArray" :key="index">
        {{ listing[1].model }} <br />
        <img />
        <br />
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
      console.log("uid is "+ this.uid)
    },
    fetchListings: function () {
      this.fetchUser();
      console.log("start fetching listings")
      firebase
        .firestore()
        .collection("listings")
        .where("ownerID", "==", this.uid)
        .get()
        .then((querySnapshot) => {
            console.log("start  querySnapshot ")
            querySnapshot.forEach((doc) => {
              console.log("start individual fetching ")
              // doc.data() is never undefined for query doc snapshots
              this.listingsArray.push([doc.id, doc.data()]);
              console.log(doc.id, " => ", doc.data());
            });
            console.log(this.listingsArray)
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        },
  },
  created:function() {
      this.fetchListings();
      // this.fetchUser();

  }  
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
</style>