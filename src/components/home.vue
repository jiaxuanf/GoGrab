<template>
  <div>
      <div class="main">
        <h1 id="title">Drive anywhere you want 🚗</h1>
        <h2 id="subtitle">Book cars from trusted owners today!</h2>
        <img id="background" v-bind:src="''"
        style="width:100%"/>
        <form id="mainsearch">
          <label for="location">
            <div class="mainsearch_label">Location/</div>
            </label>
          <input class="inputs" type="text" placeholder="Enter location" >
          <label for="fromtime">
            <div class="mainsearch_label">From</div>
            </label>
          <input class="inputs" type="text"  placeholder="DD/MM/YY"> 
          <label for="totime">
            <div class="mainsearch_label">/To</div>
            </label>
          <input class="inputs" type="text"  placeholder="DD/MM/YY"> 
        </form>
          <button type="submit" form="mainsearch" value="Search"> Search</button>
            <div class="section">
              <h2 style="color: purple; font-size: 40px"> How car sharing with GoGrab works:</h2>
              <ul style="list-style-type: none;font-size: 30px;"> 
                <li class="bullets"> 1️⃣ Register as a host and list your car for FREE</li>
                <li class="bullets"> 2️⃣ Set your rules and the price for sharing </li>
                <li class="bullets"> 3️⃣ Welcome your guest</li>
                <li class="bullets"> 4️⃣ Sit back and see your car be put to good use! </li>
              </ul>
            </div>
      </div>
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
.navbar {
  overflow: hidden;
  background-color: #ded3ff;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
}

.navbar a {
  float: right;
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.navbar a:hover {
  background: #ddd;
  color: red;
}

.background {
  background-size: contain;
}

.main {
  margin-top: 60px; /* Add a top margin to avoid content overlay */
}

#title {

  color: black;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 60px;
}

#subtitle {

  color: black;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 36px;
}

#mainsearch {
  position:absolute;
  top: 45%;
  left: 10%;
  transform: translate(-10%, -50%);
  font-weight: bold;
}

.mainsearch_label {
  color: whitesmoke;
  font-size: 40px;
  font-family:monospace;
  float:left

}

.section {
  text-align: center;
}

button {
  color: black;
  background-color:lavender;
  border: none;
  text-align: center;
  border-radius: 12px;
  top:45%;
  left: 80%;
  font-size: 40px;
  height: 80px;
  width: 180px;
  position:absolute;
  transform: translate(-10%, -50%);

}

.inputs {
  height: 80px;
  width: 350px;
  font-size: 40px;
}

.bullets {
  padding: 40px 40px;
  font-family:Tahoma, sans-serif;
}
</style>