<template>
  <div>
    <h2>Summary</h2>
    <doughnut-chart> </doughnut-chart>
    <br />
    <br />
    <br />
    <bar-graph></bar-graph>
    <br />
    <br />
    <br />
    <table id="stats">
      <tr>
        <th>Statistic</th>
        <th>Quantity</th>
      </tr>
      <tr>
        <th>Total number of rentals completed:</th>
        <th>{{ this.totalNumRentals }} rentals</th>
      </tr>
      <tr>
        <th>Total earnings to date:</th>
        <th>${{ this.totalEarnings }}</th>
      </tr>
    </table>
  </div>
</template>

<script>
import firebase from "firebase";
import DoughnutChart from "./charts/DoughnutChart.vue";
import BarGraph from "./charts/BarGraph.vue";

export default {
  watch: {},
  created() {
    this.getTotalEarnings();
    this.getTotalCompletedRentals();
  },
  data() {
    return {
      totalEarnings: 0,
      totalNumRentals: 0,
      earningsArr: [],
    };
  },
  methods: {
    getTotalEarnings: async function () {
      const user = firebase.auth().currentUser;
      await firebase
        .firestore()
        .collection("rentalRequests")
        .where("ownerID", "==", user.uid)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.earningsArr.push([doc.data().status, doc.data().total]);
          });
        })
        .catch((error) => {
          console.log("error: " + error);
        });
      console.log(this.earningsArr);

      for (var i = 0; i < this.earningsArr.length; i++) {
        if (this.earningsArr[i][0] == "Completed") {
          this.totalEarnings += this.earningsArr[i][1];
        }
      }
    },
    getTotalCompletedRentals: async function () {
      const user = firebase.auth().currentUser;
      await firebase
        .firestore()
        .collection("rentalRequests")
        .where("ownerID", "==", user.uid)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            if (doc.data().status == "Completed") {
              this.totalNumRentals++;
            }
          });
        })
        .catch((error) => {
          console.log("error: " + error);
        });
      console.log("total num of rentals: " + this.totalNumRentals);
    },
  },
  components: {
    "doughnut-chart": DoughnutChart,
    "bar-graph": BarGraph,
  },
  //
};
</script>

<style scoped>
#routes {
  width: 100%;
  max-width: 100%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
h2 {
  font-size: 60px;
  background-color: blueviolet;
  color: rgb(224, 218, 209);
  text-align: center;
}

h3 {
  font-size: 60px;
  background-color: blueviolet;
  color: rgb(224, 218, 209);
  text-align: center;
}

#stats {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#stats td,
#stats th {
  border: 1px solid #ddd;
  padding: 8px;
}

#stats tr:nth-child(even) {
  background-color: #f2f2f2;
}

#stats tr:hover {
  background-color: #ddd;
}

#stats th {
  font-size: 20px;
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  color: black;
}
</style>