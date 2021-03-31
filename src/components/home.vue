<template>
  <div>
    <b-card text-variant="dark" class = "bg">
      <b-card-img :src = "require('../assets/gograb_cover1.png')" style = "border-radius:0px; height:600px;"></b-card-img>   
      <b-card-body overlay style="padding:0px"> 
        <div class = "titleText">
          <h1 style="text-shadow: 1px 1px #000000">Drive anywhere you want. </h1> <br>
          <h2 style="text-shadow: 1px 1px #000000">Book cards from trusted hosts around the world. </h2>
        </div>
        <div class = "inputForms" > 
          <b-container>
            <b-row no-gutters>
              <b-col sm = '1' class = "searchBar">Location </b-col>
              <b-col sm = '2'> <b-form-input style = ""> </b-form-input></b-col> 
              <b-col sm = '1' class= "searchBar"> From </b-col>
              <b-col><b-form-datepicker> </b-form-datepicker></b-col> 
              <b-col><b-form-timepicker></b-form-timepicker></b-col>
              <b-col sm = '1' class = "searchBar">To </b-col>
              <b-col><b-form-datepicker> </b-form-datepicker></b-col>
              <b-col><b-form-timepicker></b-form-timepicker></b-col>
            </b-row>  
          </b-container>
        </div>
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
export default {
    props: {},
  data() {
    return {};
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
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
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
  margin-left:5%;
  margin-top:20px;
  padding-bottom:0px;
}

</style>