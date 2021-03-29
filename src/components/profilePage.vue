<template>
  <div>
    <div id="profilePicture">profilePicture</div>
    <div id="stats">
      <p class="stat">Reviews:</p>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";
export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
    };
  },
  methods: {
    signUp: function () {
      this.$router.push({ path: "/signup" });
    },
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert("Successfully logged in");
          this.$router.push("/home");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>

<style scoped>
#profilePicture {
  float: left;
  width: 50%;
  padding: 20px;
}
#stats {
  float: right;
  width: 50%;
}
.stat {
  border: 2px solid black;
  border-radius: 4px;
}
</style>