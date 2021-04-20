import { Bar } from 'vue-chartjs'
import database from '../../main.js'
import firebase from 'firebase'

export default {
    extends: Bar,
    data: function () {
        return {
            datacollection: {
                labels: [],
                datasets: [{
                    label: "Number of Clicks",
                    backgroundColor: [],
                    data: []
                }],
                uid: "",
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    fontSize: 25,
                    text: 'Number of Clicks per Car Listing'
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontSize: 20
                        }
                    }],
                }
            }
        }
    }, methods: {
        async fetchItems() {
            var user = firebase.auth().currentUser;
            this.datacollection.uid = user.uid;
            await database
                .collection("listings")
                .where("ownerID", "==", user.uid)
                .get()
                .then((snapshot) => {
                    snapshot.forEach(doc => {
                        this.datacollection.datasets[0].data.push(doc.data().numberOfClicks);
                        this.datacollection.labels.push(doc.data().model);
                        var col = this.getRandomColor();
                        this.datacollection.datasets[0].backgroundColor.push(col);

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

