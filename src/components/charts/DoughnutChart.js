import { Doughnut } from "vue-chartjs";
import firebase from "firebase";

export default {
  extends: Doughnut,
  data: function() {
    return {
      datacollection: {
        labels: ["1-star", "2-star", "3-star", "4-star", " 5-star"],
        datasets: [
          {
            label: "",
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
            ],
            data: [],
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Review Statistics",
          fontSize: 40
        },
        legend: {
          labels: {
            fontSize: 20
          }
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      chartData: {
        oneStar: 0,
        twoStar: 0,
        threeStar: 0,
        fourStar: 0,
        fiveStar: 0,
      },
    };
  },
  methods: {
    fetchRatings:  async function() {
      const user = firebase.auth().currentUser;
      console.log("current user inside Dashboard: " + user.uid);
      await firebase
        .firestore()
        .collection("reviews")
        .where("ownerID", "==", user.uid)
        .get()
        .then((snapshot) => {
          // var temp = [];
          snapshot
            .forEach((doc) => {
              console.log(doc.id + " ==>" + doc.data());
              //   if-else for various ratings, update datacollection data
              if (doc.data().reviewValue == 1) {
                this.chartData.oneStar += 1;
              } else if (doc.data().reviewValue == 2) {
                this.chartData.twoStar += 1;
                console.log("twoStar incremented: " + this.chartData.twoStar);
              } else if (doc.data().reviewValue == 3) {
                this.chartData.threeStar += 1;
                console.log("threeStar incremented: " + this.chartData.threeStar);
              } else if (doc.data().reviewValue == 4) {
                this.chartData.fourStar += 1;
                console.log("fourStar incremented: " + this.chartData.fourStar);
              } else {
                this.chartData.fiveStar += 1;
              }
            })
            
        })
        this.datacollection.datasets[0].data.push(this.chartData.oneStar);
        this.datacollection.datasets[0].data.push(this.chartData.twoStar);
        this.datacollection.datasets[0].data.push(this.chartData.threeStar);
        this.datacollection.datasets[0].data.push(this.chartData.fourStar);
        this.datacollection.datasets[0].data.push(this.chartData.fiveStar);
      console.log("chart data: " + this.datacollection.datasets[0].data);
      this.renderChart(this.datacollection, this.options);
    },
  },
  mounted() {
    this.fetchRatings();
  },

}
  


