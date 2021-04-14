<template>
  <div style="display: flex; flex-direction: column; height: 200vh">
    <header>
      <div style="height: 60px; background: lightgrey">
        <img
          :src="currentPeerUser.URL"
          width="50px"
          height="45px"
          style="margin-left: 20px"
          class="br-50 header-image"
        />
        <div class="header-image">
          <h6 class="mt-2" style="font-weight: 600">
            {{ currentPeerUser.name }}
          </h6>
        </div>
      </div>
    </header>
    <div style="background: #efe9e2; flex: 1; overflow-y: auto">
      <h2 class="welcome" style="margin-left: 20px">
        Chat with {{ currentPeerUser.name }}
      </h2>
      <div class="text-outer">
        <div
          :class="item.idFrom === currentUserId ? 'textFrom' : 'textTo'"
          class="text-inner"
          v-for="item in listMessage"
          :key="item.id"
        >
          <h6>{{ item.content }}</h6>
        </div>
      </div>
    </div>
    <footer>
      <div style="min-height: 60px; background: lightgrey">
        <div style="display: flex; padding: 15px">
          <img
            class="mr-3 pointer"
            src="../assets/picture.png"
            alt="select picture"
            width="30px"
            height="30px"
          />
          <img
            class="mr-3 pointer"
            src="../assets/sticker.png"
            alt="select sticker"
            width="30px"
            height="30px"
          />
          <input
            type="text"
            style="
              width: 85%;
              border: 1px solid transparent;
              border-radius: 4px;
              padding: 5px 10px;
            "
            class="mr-3"
            v-model="inputValue"
            v-on:keyup.enter="sendMessage(inputValue)"
          />
          <img
            class="mr-2 pointer"
            src="../assets/send.png"
            alt="select sticker"
            width="30px"
            height="30px"
            v-on:click="sendMessage(inputValue)"
          />
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import firebase from "firebase";
import moment from "moment";
import database from "../main.js";

export default {
  app: "ChatBox",
  props: {
    currentPeerUser: Object,
    userChats: Array,
  },
  data() {
    return {
      currentUserName: localStorage.getItem("name"),
      currentUserId: localStorage.getItem("id"),
      currentUserPhoto: localStorage.getItem("photoURL"),
      inputValue: "",
      photoURL: localStorage.getItem("photoURL"),
      listMessage: [],
      groupChatId: null,
    };
  },
  watch: {
    currentPeerUser: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getMessages();
      }
    },
  },
  methods: {
    async sendMessage(content) {
      if (content.trim() === "") {
        return;
      }
      console.log("current peer user is: " + this.currentPeerUser.id);

      if (!this.userChats.includes(this.currentPeerUser)) {
        console.log("ran");
        this.userChats.push(this.currentPeerUser);
        console.log("pushing happened");
        var currentUserChat = [];
        var peerUserChat = [];
        console.log("currenUserChat array is:")
        console.log(currentUserChat)
        await database
          .collection("userInfo")
          .doc(this.currentUserId)
          .get()
          .then((doc) => {
            console.log("entered doc part");
            currentUserChat = doc.data().chatList;
          });
        console.log("finding whats current user chat");
        console.log(currentUserChat);
        currentUserChat.push(this.currentPeerUser);
        console.log(currentUserChat);
        for (var x in currentUserChat) {
          console.log(x);
        }
        console.log("before updating");
        await database.collection("userInfo").doc(this.currentUserId).update({
          chatList: currentUserChat,
        });
        console.log("after updating");
        /*await database
          .collection("userInfo")
          .doc(this.currentPeerUser.id)
          .get()
          .then((doc) => {
            peerUserChat = doc.data().chatList;
            peerUserPhoto = doc.data().profilePictureURL;
            peerUserName = doc.data().username;
          });*/
        console.log("after line 149");
        console.log(peerUserChat)
        peerUserChat.push({
          id: this.currentUserId,
          name: this.currentUserName,
          URL: this.currentUserPhoto,
        });
        console.log("after pushign into peeruserchat")
        console.log(peerUserChat)
        await database
          .collection("userInfo")
          .doc(this.currentPeerUser.id)
          .update({
            chatList: peerUserChat,
          });
      }
      const timestamp = moment().valueOf().toString();
      const message = {
        id: timestamp,
        idFrom: this.currentUserId,
        idTo: this.currentPeerUser.id,
        timestamp: timestamp,
        content: content.trim(),
      };

      firebase
        .firestore()
        .collection("Messages")
        .doc(this.groupChatId)
        .collection(this.groupChatId)
        .doc(timestamp)
        .set(message)
        .then(() => {
          this.inputValue = "";
        });
    },
    getMessages() {
      console.log("call coming");
      this.listMessage = [];
      let groupChatId = `${this.currentPeerUser.id} + ${this.currentUserId}`;
      firebase
        .firestore()
        .collection("Messages")
        .doc(groupChatId)
        .collection(groupChatId)
        .onSnapshot((Snapshot) => {
          if (Snapshot.docChanges().length > 0) {
            this.groupChatId = groupChatId;
            Snapshot.docChanges().forEach((res) => {
              this.listMessage.push(res.doc.data());
            });
          } else {
            this.groupChatId = `${this.currentUserId} + ${this.currentPeerUser.id}`;
            firebase
              .firestore()
              .collection("Messages")
              .doc(this.groupChatId)
              .collection(this.groupChatId)
              .onSnapshot((Snapshot) => {
                Snapshot.docChanges().forEach((res) => {
                  console.log("res", res);
                  if (res.type === "added") {
                    this.listMessage.push(res.doc.data());
                  }
                });
              });
          }
        });
    },
  },
  mounted() {
    if (this.currentPeerUser) {
      this.getMessages();
    }
  },
};
</script>

<style scoped>
.welcome {
  color: #635a5a;
  font-weight: 600;
  margin: 10px 0px 32px;
}
.br-50 {
  border-radius: 50%;
}
.header-image {
  float: left;
  margin-left: 10px;
  margin-top: 10px;
}
.text-outer {
  display: flex;
  flex-direction: column;
}
.text-inner {
  padding: 10px 10px 2px;
  border-radius: 0.5rem;
  width: 20%;
}
.textFrom {
  background: teal;
  color: white;
  margin: 0% 0% 20px 70%;
}
.textTo {
  background: lightcoral;
  color: black;
  margin: 0% 0% 20px 5%;
}
.pointer {
  cursor: pointer;
}
</style>