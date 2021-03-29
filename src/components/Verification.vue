<template>
    <div>
        <div class = "border"> 
            <div class = "license">
                <h1>Get Approved to Drive Now! <br><br></h1>
                <h3>Driver's License </h3>
                <p> Upload a photo of your driver's license so that we know that you are able to drive </p>
                <b-form-file v-model = "license" accept = "image/*" placeholder = "Upload your license" @change="displayLicense"/>
                <br><br>
                <b-button v-on:click="clearSelection">Clear Selection </b-button><br> <br>
                <b-img v-if="licensePresent" id = "licensePreview" :src = "image" /> 
            </div>
            <hr />
            <b-button v-on:click = "updateInformation" :disabled = "buttonStatus"> Update </b-button>
        </div>
    </div>
</template>

<script>
import firebase from "firebase"

export default ({
    data() {
        return {
            image : null,
            imageFile : null, 
            license : null,
            licensePresent : false,
            buttonStatus : true,
        }
    }, 
    methods : {
        displayLicense: function(e) {
            this.licensePresent = true;
            this.buttonStatus = false;
            var input = e.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.image = e.target.result;
                } 
            }
            this.imageFile = input.files[0];
            reader.readAsDataURL(input.files[0])
        },

        clearSelection: function() {
            this.image = null;
            this.license = null;
            this.licensePresent = false;
            this.buttonStatus = true;
        },

        updateInformation: function() {
            console.log(this.image);
            var storageRef = firebase.storage().ref();
            var image_id = storageRef.child('test1.jpg')
            image_id.put(this.imageFile).then((snapshot) => {
                console.log('Uploaded');
                console.log(snapshot);
            })
        }
    }
})
</script>


<style scoped>
.border {
    margin:20px;
    border-style: none !important
}

.license {
    width: 70% !important;
}

#licensePreview {
    width:60%;
    height:60%;
}

</style>