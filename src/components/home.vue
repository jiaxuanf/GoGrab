<template>
  <div>
    <b-card text-variant="dark" class = "bg">
      <b-card-img :src = "require('../assets/gograb_cover1.png')" style = "border-radius:0px; height:600px;"></b-card-img>   
      <b-card-body overlay style="padding:0px"> 
        <div class = "titleText">
          <h1 style="text-shadow: 1px 1px #000000">Drive anywhere you want. </h1> <br>
          <h2 style="text-shadow: 1px 1px #000000">Book cars from trusted hosts around the world. </h2>
        </div>
        <b-form @submit.prevent = "submitSearch"  style = "background-color:white; width:60%; margin:0 auto; height:50px;" class = "mt-5" inline>
          <label class = "ml-5">Start Date: </label> 
          <b-form-datepicker class = "searchBar ml-3" v-model = "startDate" required> </b-form-datepicker>
          <label class = "ml-5">End Date: </label>
          <b-form-datepicker class = "searchBar ml-3 mr-5" v-model = "endDate" required> </b-form-datepicker>
          <b-button type = "submit" variant = primary class = "ml-5">Search </b-button>
        </b-form>
      </b-card-body>
    </b-card>

    <div class = "instructions">
      <br> <br>
      <h1 style = "color:#5F2EEA">How car sharing works, in a few steps. </h1>
      <ul>
        <li><strong> Register as a host and list your car for FREE. </strong> </li>
        <li><strong> Set the price for sharing and your rules. </strong> </li>
        <li><strong> Welcome your guest.</strong></li>
        <li><strong> Sit back and earn.</strong></li>
      </ul>
    </div>
    <hr />
  </div>
</template>

<script>
//import moment from "moment";


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
        /*const a = startDate.concat(" ", startTime);
        const b = endDate.concat(" ", endTime);
        const startTimeStamp = moment(a).valueOf();
        const endTimeStamp = moment(b).valueOf();
        console.log(startTimeStamp);*/
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
  margin-top:50px;
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