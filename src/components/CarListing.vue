<template>
    <div>
        
        <b-form inline style = "max-width:90%; margin: 0 auto; margin-top:40px; padding:0;" class = "mx-auto" v-on:submit.prevent = "applyFilter"> 
            <h3 >Filters </h3>
            <label class = "ml-4">Car Brand</label> 
            <b-form-select v-model = "filters.brand" :options = "brandOptions" placeholder = "Brands" class = "ml-2"> </b-form-select>
            <label class = "ml-4">Car Type</label>
            <b-form-select v-model = "filters.type" :options = "typeOptions" placeholder = "Car Type" class = "ml-2"> </b-form-select>
            <label class = "ml-4">Maximum Price </label>
            <b-form-input type = "number" v-model = "filters.maxPrice" min = "0" placeholder = "Maximum Price" class = "ml-2"> </b-form-input>
            <label class = "ml-4">Start Date </label>
            <b-form-datepicker class = "ml-2" v-model = "filters.startDate" :min = "new Date()" required> </b-form-datepicker>
            <label class = "ml-4">End Date </label>
            <b-form-datepicker class = "ml-2" v-model = "filters.endDate" :min = "filters.startDate" required>  </b-form-datepicker>
            <b-button type = "Submit" variant = primary class = "ml-4">Filter </b-button>
        </b-form>
        <div id = "carDisplay"> 
            <b-container class="bv-example-row"  style = "max-width:90%;" >
                <b-row v-for = "(chunk,index) in chunkedCarArray" :key = "index" class = "mb-4">
                    <b-col sm = '4' v-for="(carData,index) in chunk" :key="index"><car-list-icon v-bind:rental="carData"></car-list-icon></b-col>
                </b-row>
            </b-container>
        </div>
    </div>    
</template>

<script>
import CarListIcon from './CarListIcon.vue'
import database from '../main.js'
import moment from "moment";
import _ from "lodash";

export default {
    components: {
        CarListIcon,
    },
    data()  {
        return {
            fullCarArray : [],
            chunkedCarArray : [],
            filters : {
                brand : null,
                type : null,
                maxPrice : null,
                startDate : null,
                endDate : null,
            },
            typeOptions : [
                {value : null, text : "None"},
                "SUV",
                "MPV",
                "Sedan",
                "Sports",
                "Mini"
            ],
            brandOptions : [{value : null, text : "None"},
                "Abarth",
                "Alfa Romeo",
                "Aston Martin",
                "Audi",
                "Bentley",
                "BMW",
                "Bugatti",
                "Cadillac",
                "Chevrolet",
                "Chrysler",
                "Citroën",
                "Dacia",
                "Daewoo",
                "Daihatsu",
                "Dodge",
                "Donkervoort",
                "DS",
                "Ferrari",
                "Fiat",
                "Fisker",
                "Ford",
                "Honda",
                "Hummer",
                "Hyundai",
                "Infiniti",
                "Iveco",
                "Jaguar",
                "Jeep",
                "Kia",
                "KTM",
                "Lada",
                "Lamborghini",
                "Lancia",
                "Land Rover",
                "Landwind",
                "Lexus",
                "Lotus",
                "Maserati",
                "Maybach",
                "Mazda",
                "McLaren",
                "Mercedes-Benz",
                "MG",
                "Mini",
                "Mitsubishi",
                "Morgan",
                "Nissan",
                "Opel",
                "Peugeot",
                "Porsche",
                "Renault",
                "Rolls-Royce",
                "Rover",
                "Saab",
                "Seat",
                "Skoda",
                "Smart",
                "SsangYong",
                "Subaru",
                "Suzuki",
                "Tesla",
                "Toyota",
                "Volkswagen",
                "Volvo"
            ],
        }
    },
    methods : {
        fetchItems : function() {
            database.collection('listings').get().then(snapshot => {
                var temp = [];
                snapshot.docs.forEach(doc => {
                    this.fullCarArray.push([doc.id, doc.data()]);
                    temp.push([doc.id, doc.data()]);
                    if (temp.length == 3) {
                        this.chunkedCarArray.push(temp);
                        temp = [];
                    }
                });
                if (temp.length != 0) {
                    this.chunkedCarArray.push(temp);
                }
            })
        },

        applyFilter : function() {
            var tempArray = _.cloneDeep(this.fullCarArray);
            console.log(tempArray);
            if (this.filters.startDate == null || this.filters.endDate == null) {
                alert("Please Enter a start and end date");
                return;
            }

            if (this.filters.brand != null) {
                tempArray = tempArray.filter((car) => car[1]['brand'] == this.filters.brand);
            } if (this.filters.carType != null) {
                tempArray = tempArray.filter((car) => car[1]['carType'] == this.filters.carType);
            } if (this.filters.maxPrice != null) {
                tempArray = tempArray.filter((car) => car[1]['price'] <= this.filters.maxPrice);
            }       
            tempArray = tempArray.filter((car) => {
                const docStartTime = moment(car[1]['afrom']).valueOf();
                const docEndTime = moment(car[1]['ato']).valueOf();
                const startTime = moment(this.filters.startDate).valueOf();
                const endTime = moment(this.filters.endDate).valueOf();
                return ((docStartTime <= startTime && docEndTime >= startTime) && (docStartTime <= endTime && docEndTime >= endTime));
            });
            console.log(tempArray);
            this.chunkedCarArray = [];
            //Chunk the array 
            var temp = [];
            for (let i = 0; i < tempArray.length; i++) {
                temp.push(tempArray[i]);
                if (temp.length == 3) {
                    this.chunkedCarArray.push(temp);
                    temp = [];
                }
            } if (temp.length != 0) {
                this.chunkedCarArray.push(temp);
            }
        },

        fetchItemsFromSearch : function(startTime, endTime) {
            database.collection('listings').get().then(snapshot => {
                var temp = [];
                snapshot.docs.forEach(doc => {
                    this.fullCarArray.push([doc.id, doc.data()]);
                    const docStartTime = moment(doc.data()['afrom']).valueOf();
                    const docEndTime = moment(doc.data()['ato']).valueOf();
                    if (docStartTime >= startTime && docEndTime <= endTime) {
                        temp.push([doc.id, doc.data()]);
                    }
                    if (temp.length == 3) {
                        this.chunkedCarArray.push(temp);
                        temp = [];
                    }
                });
                if (temp.length != 0) {
                    this.chunkedCarArray.push(temp);
                }
            })
        }
    },

    created:function() {
        if (this.$route.params.search) {
            const startTime = this.$route.params.startTimeStamp;
            const endTime = this.$route.params.endTimeStamp;
            this.fetchItemsFromSearch(startTime, endTime)
        } else {
            this.fetchItems()
        }
    }
}
</script>

<style scoped>

#carSearch {
    margin-top:20px;
}

#carSearch > input {
    float:left;
    width:75%;
    height:30px;
    border-radius:25px;
    box-shadow: inset 0 0 2px #000000;
    margin-right:0px;
    margin-top:auto;
    margin-bottom:auto;
    margin-left:20px;
    border-style:none;
    text-indent:20px;
}

#carSearch > button {
    margin-left:0px;
    margin-top:auto;
    margin-bottom:auto;
    width:100px;
    height:30px;
    background-color: darkviolet;
    color:white;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1)
}

#filter {
    margin-top:20px;
    background-color: darkviolet;
    width:100%;
    height:40px;
}

#filter > span {
    float:left;
    display: inline-flex;
    align-items:center;
    margin-left:20px;
    color:white;
    padding:0px;
    height:100%;
    
}

#filterChoice {
    list-style: none;
    text-align: center;
    height:100%;
}

#filterChoice > li {
    float:left;
    display:flex;
    align-items:center;
    height:100%;
    margin-left:30px;
    color:white;
}

#carDisplay {
    margin-top:20px;
}

.col {
    border:1px solid #000000 !important;
    margin:10px !important;
}




</style>