<template>
<div>
    <h1>{{ this.listing.model }}</h1>

    <p id='scrolly'>
    <img src="https://cdn11.bigcommerce.com/s-yrkef1j7/images/stencil/1280x1280/products/1503/30661/QQ20190428230137__95937.1556517799.png?c=2" alt="Izoa">
    <img src="https://cdn11.bigcommerce.com/s-yrkef1j7/images/stencil/1280x1280/products/1503/30658/QQ20190428230027__93343.1556517796.png?c=2" alt="Izoa">
    <img src="https://cdn11.bigcommerce.com/s-yrkef1j7/images/stencil/1280x1280/products/1503/30663/QQ20190428230148__69023.1556517796.png?c=2" alt="Izoa">
    </p>
    <br><br><br>
  

<div class="flex-container">
  <div class="flex-child 1">
    <ul>
    
    <p>Price:  {{ this.listing.price }}</p>
    <p>Color:  {{ this.listing.color }}</p>
    <p>Age:  {{ this.listing.age }}</p> 
    <p>Defect:  {{ this.listing.defect }}</p>
    <p>Available:  {{ ' from ' + this.listing.afrom + " to " +  this.listing.ato}}</p>
    </ul>
    </div>

  <div class="flex-child 2">
    <ul>
    <h2>{{ this.username }}'s Car: </h2>
    <p>{{ this.listing.description }}</p>
    <h2>Owner's Rules: </h2>
    <p>{{ this.listing.rules }}</p>
    </ul>
    </div>
    </div>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'IndividualListed',
  props: {
    msg: String
  },
  data() {
    return {
      listing: {
        model:'',
        color:'',
        age:'',
        defect:'', 
        price: '',
        afrom:'',
        ato:'',
        location:'',
        description:'',
        rules:'',
        images:[],
        time: '',
      },
      uid: "",
      username: "",
      email: "",
      phoneNumber: "",
      img1: "",
      imageData: "",
      uploadValue: 0,
      carInfo:[]
    };
  },
  methods : {
        fetchItems : function() {
          const car = firebase.firestore().collection("listings").doc('GAnh5rlge1Udu3Z6STMR')
          console.log(car)
          car.get().then((doc) => {
              if (doc.exists) {
                  console.log("Document data:", doc.data());
                  
                  // this.listing.model = doc.get("model")
                  this.listing.price = doc.get("price")
                  this.listing.color = doc.get("color")
                  this.listing.age = doc.get("age")
                  this.listing.defect = doc.get("defect")
                  this.listing.description = doc.get("description")
                  this.listing.rules = doc.get("rules")
                  this.listing.afrom = doc.get("afrom")
                  this.listing.ato = doc.get("ato")
              } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
              }
          }).catch((error) => {
              console.log("Error getting document:", error);
          });
        }

    },
  created:function() {
      this.fetchItems();
  }
  }, 
}

</script>
<style scoped>
#scrolly {
            height: 300px;
            width: 800px;
            overflow: auto;
            overflow-y: hidden;
            margin: 0 auto;
            white-space: nowrap
        }

img {
            width: 525px;
            height: 300px;
            margin: 20px 10px;
            display: inline;
            margin-left: 40px;
            margin-right: 40px;
        }
ul {
            text-align: left;
            margin-left: 25%;

}
.flex-container {
    display: flex;
}

.flex-child {
    flex: 0.5;
}  

.flex-child:first-child {
    margin-left: 10px;
} 
</style>