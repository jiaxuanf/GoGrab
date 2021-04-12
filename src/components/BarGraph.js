import { Bar } from 'vue-chartjs'
import database from '../main.js'
import firebase from 'firebase'

export default {
    extends: Bar,
    data: function () {
        return {
            datacollection: {
                labels: [],
                datasets: [{
                    label: "Activity Status",
                    backgroundColor: [],
                    data: []
                }],
                uid: "",
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Number of Clicks for each post'
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        }
    }, methods: {
        async fetchItems() {
            var user = firebase.auth().currentUser;
            this.datacollection.uid = user.uid;
            console.log("uid is:" + this.datacollection.uid);
            await database
                .collection("listings")
                .where("uid", "==", this.datacollection.uid)
                .get()
                .then((snapshot) => {
                    snapshot.forEach(doc => {
                        this.datacollection.datasets[0].data.push(doc.data().numberOfClicks);
                        this.datacollection.labels.push(doc.data().model);
                        var col = this.getRandomColor();
                        console.log(col);
                        this.datacollection.datasets[0].backgroundColor.push(col);
                        console.log(this.datacollection.datasets[0].backgroundColor);

                    });
                    this.renderChart(this.datacollection, this.options)
                });
        },
        getRandomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    },
    mounted() {
        this.fetchItems();
    },
}

