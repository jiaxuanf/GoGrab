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
            await database
                .collection("listings")
                .doc()
                .where("uid", "==", this.uid)
                .get()
                .then((snapshot) => {
                    snapshot.docs.forEach(doc => {
                        this.datasets.data.push(doc.data().numberOfClicks);
                        this.labels.push(doc.data().model)
                    });
                });
            this.renderChart(this.datacollection, this.options)
        }
    },
    created() {
        this.fetchItems();
    }
}