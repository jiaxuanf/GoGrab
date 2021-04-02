<template>
  <div class="wrapper">
    <!-- Sidebar  -->
    <nav style="color: white" id="sidebar">
      <div class="sidebar-header d-flex justify-content-around">
        <div
          class="d-flex pointer"
          style="margin-right: 25px; width: 160px"
          v-on:click="onProfileClick"
        >
          <img
            :src="photoURL"
            alt="user"
            width="50px"
            height="50px"
            style="border-radius: 50%; background: white;"
          />
        </div>
        <p style="font-size:30px; margin-right:60px"> {{currentUserName}} </p>
        <button type="button" class="btn btn-primary" v-on:click="logout">Logout</button>
      </div>
      <div style="height: 1px; border-bottom: 1px solid #00388b"></div>
      <ul class="list-unstyled components">
        <li
          class="active mb-3"
          v-on:click="letsChat(item)"
          v-for="item in searchUsers"
          :key="item.id"
          v-show="item.id != currentUserId"
        >
          <div class="d-flex" style="cursor: pointer; padding-bottom: 15px; width: 100%">
            <div style="width: 30%">
              <img
                :src="item.URL"
                alt="user"
                width="50px"
                height="50px"
                style="border-radius: 50%; background: white;"
              />
            </div>
            <div
              style="padding: 10px 0px 0px; width: 50%; display: flex; justify-content: space-between"
            >
              <h6 style="line-height: 2; font-weight: 600; color: white; font-size:25px;s">{{item.name}}</h6>
            </div>
          </div>
          <div style="height: 1px; border-bottom: 1px solid #00388b"></div>
        </li>
      </ul>
    </nav>

    <!-- Page Content  -->
    <div id="content" v-if="currentPeerUser===null">
      <div class="my-4">
        <img :src="photoURL" width="200px" class="br-50" />
      </div>
      <div>
        <h2>Welcome {{currentUserName}},</h2>
        <h3>Check your chats</h3>
      </div>
    </div>
    <div v-else class="header-width">
      <ChatBox v-bind:currentPeerUser="currentPeerUser" />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import ChatBox from "./ChatBox";

export default {
  app: "Chat",
  components: {
    ChatBox
  },
  data() {
    return {
      currentUserName: localStorage.getItem("name"),
      currentPeerUser: null,
      currentUserId: localStorage.getItem("id"),
      currentUserPhoto: localStorage.getItem("photoURL"),
      searchUsers: [],
      photoURL: localStorage.getItem("photoURL")
    };
  },
  methods: {
    onProfileClick() {
      this.$router.push("/profilePage");
    },
    logout() {
      firebase.auth().signOut();
      this.$router.push("/");
      localStorage.clear();
    },
    letsChat(item) {
      this.currentPeerUser = item;
    },
    async getUserList() {
      const result = await firebase
        .firestore()
        .collection("userInfo")
        .get();
      if (result.docs.length > 0) {
        let listUsers = [];
        listUsers = [...result.docs];
        listUsers.forEach((item, index) => {
          console.log("item", item.data());
          this.searchUsers.push({
            key: index,
            documentKey: item.id,
            id: item.data().id,
            name: item.data().username,
            URL: item.data().profilePictureURL,
            //description: item.data().description
          });
        });
      }
    }
  },
  created() {
    if (!Object.prototype.hasOwnProperty.call(localStorage,"id")) this.$router.push("/");
    this.getUserList();
    console.log("name is" + localStorage.getItem("name"))
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.br-50 {
  border-radius: 50%;
}
.header-width {
  width: calc(100% - 350px);
  min-height: 100vh;
  transition: all 0.3s;
  top: 0;
  right: 0;
}
.wrapper {
  display: flex;
  width: 100%;
}

#sidebar {
  width: 350px;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 999;
  background: rgb(117, 112, 117);
  color: black;
  transition: all 0.3s;
}

#sidebar.active {
  margin-left: -250px;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: rgb(117, 112, 117);
  border-color: black;
}

#sidebar ul.components {
  padding: 20px 0;
}

#sidebar ul p {
  color: #fff;
  padding: 10px;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}

#sidebar ul li a:hover {
  color: #7386d5;
  background: #fff;
}

#sidebar ul li.active > a,
a[aria-expanded="true"] {
  color: #fff;
  background: #6d7fcc;
}

a[data-toggle="collapse"] {
  position: relative;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #6d7fcc;
}

ul.CTAs {
  padding: 20px;
}

ul.CTAs a {
  text-align: center;
  font-size: 0.9em !important;
  display: block;
  border-radius: 5px;
  margin-bottom: 5px;
}

a.download {
  background: #fff;
  color: #7386d5;
}

a.article,
a.article:hover {
  background: #6d7fcc !important;
  color: #fff !important;
}
#content {
  width: calc(100% - 350px);
  padding: 40px;
  min-height: 100vh;
  transition: all 0.3s;
  top: 0;
  right: 0;
}

#content.active {
  width: 100%;
}

#sidebarCollapse span {
  display: none;
}

.container-fluid button {
  display: none;
}

</style>