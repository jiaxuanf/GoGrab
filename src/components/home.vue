<template>
  <div>
    <b-card text-variant="dark" class = "bg">
      <b-card-img :src = "require('../assets/gograb_cover2.jpg')" style = "border-radius:0px;" fluid></b-card-img>   
      <b-card-body overlay style="padding:0px"> 
        <div class = "titleText">
          <h1 style="text-shadow: 1px 1px #000000">Drive anywhere you want. </h1> <br>
          <h2 style="text-shadow: 1px 1px #000000">Book cars from trusted hosts around the world. </h2>
        </div>
        <b-form @submit.prevent = "submitSearch"> 
        <b-container class = "mt-4">
          <b-row style = "background-color: white;  height:50px; border-radius: 2rem; width:90%"> 
            <b-col sm = "1" class = "my-auto" style = 'text-align:center; padding: 0px;'>Start Date:</b-col>
            <b-col sm = "4" class = "my-auto" style = 'padding: 0px;'><b-form-datepicker class = "searchBar" v-model = "startDate" :min = "new Date()" required> </b-form-datepicker> </b-col>
            <b-col sm = "1" class = "my-auto" style = 'text-align:center;padding: 0px;'>End Date:</b-col>
            <b-col sm = "4" class = "my-auto" style = 'padding: 0px;'><b-form-datepicker class = "searchBar" v-model = "endDate" :min = "new Date()" required> </b-form-datepicker> </b-col>
            <b-col sm = "2" class = "my-auto" style = 'text-align:center;padding: 0px;'><b-button type = "submit" style = "background-color:indigo">Search </b-button> </b-col>
          </b-row>
        </b-container>
        </b-form>
      </b-card-body>
    </b-card>

    <div class = "instructions">
      <br> <br>
      <h1 style = "color:#5F2EEA" class = "mb-4">How car sharing works, in a few steps. </h1>
      <b-container style = "margin-left:0px; font-size: 20px;">
        <b-row class = "mb-4">
         <b-col class = "align-middle"><b-img :src = "require('../assets/bullet.svg')" style = "width:50px; height:50px;"></b-img> <strong>Register as a host and list your car for FREE.</strong></b-col>
        </b-row>
        <b-row class = "mb-4">
         <b-col class = "align-middle"><b-img :src = "require('../assets/bullet.svg')" style = "width:50px; height:50px;"></b-img> <strong>Set the price for sharing and your rules.</strong></b-col>
        </b-row>
        <b-row class = "mb-4">
         <b-col class = "align-middle"><b-img :src = "require('../assets/bullet.svg')" style = "width:50px; height:50px;"></b-img> <strong>Manage your listings under the "My Bookings" tab</strong></b-col>
        </b-row>
        <b-row class = "mb-4">
         <b-col class = "align-middle"><b-img :src = "require('../assets/bullet.svg')" style = "width:50px; height:50px;"></b-img> <strong>Welcome your guest.</strong></b-col>
        </b-row>
        <b-row class = "mb-4">
         <b-col class = "align-middle"><b-img :src = "require('../assets/bullet.svg')" style = "width:50px; height:50px;"></b-img> <strong>Sit back and earn.</strong></b-col>
        </b-row>
      </b-container>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
    props: {},
  data() {
    return {
      rowStyle: "background:white; width: 100%; display:flex; text-align: center; justify-content:center; height:70px;",
      centerText: "margin:auto;",
      startDate : "",
      startTime : "",
      endDate : "",
      endTime : ""
    };
  },

  methods : {
    submitSearch : function() {
        const startDate = this.startDate;
        const endDate = this.endDate;
        if (this.startDate == "" || this.endDate == "") {
          alert("Please Enter a Start and End Date")
          return;
        }
        this.$router.push({name: 'CarListing',  params: { search:true, startTime : startDate, endTime : endDate}})
    }
  },

  
};
    

</script>

<style scoped>
.card-body {
  padding: 0px !important;
}

.searchBar {
  font-size: 1rem;
  color:#495057;
  background-color:#fff;
  background-clip: padding-box;
  border: none;
  border-color: transparent;
}


.inputForms {
  margin-top: 5%;
  margin-left:auto;
  margin-right:auto;
  width:100%;

}

.instructions {
  margin-left: auto;
  margin-right:auto;
  width:80%
}

.titleText {
  margin-top:2.5%;
  margin-left:auto;
  margin-right:auto;
  width:50%;
}

.bg {
  padding: 0px !important;
  margin:0px !important;
  border-radius:0px !important;
}

ul {
  list-style-image: url('../assets/bullet.svg');
}

li {
  margin-left:0px;
  margin-top:20px;
  padding-bottom:0px;
}

</style>