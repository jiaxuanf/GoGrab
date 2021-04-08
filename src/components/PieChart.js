import database from '../main.js'
import { Pie } from 'vue-chartjs'
import firebase from 'firebase'

export default {
    extends: Pie,
    data: function () {
        return {
            datacollection: {
                labels: [],
                datasets: [{
                    label: "Activity Status",
                    backgroundColor: ["#3e95cd", "#c45850"],
                    data: []
                }],
                uid: "",
            },
            options: {
                title: {
                    display: true,
                    text: 'Number of Clicks for each post'
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        async fetchItems() {
            var user = firebase.auth().currentUser;
            this.uid = user.uid;
            console.log("uid is:" + this.uid);
            await database
                .collection("listings")
                .where("uid", "==", this.uid)
                .get()
                .then((snapshot) => {
                    snapshot.forEach(doc => {
                        this.datacollection.datasets[0].data.push(doc.data().numberOfClicks);
                        this.datacollection.labels.push(doc.data().model)
                    });
                });
            this.renderChart(this.datacollection, this.options)
        }
    },
    created() {
        this.fetchItems();
    }
}