import Vue from "vue";
import { firebaseDb, firebaseAuth } from "boot/firebase";

let messagesRef;

export default {
  actions: {
    registerUser({}, payload) {
      firebaseAuth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((resp) => {
          let userId = firebaseAuth.currentUser.uid;
          firebaseDb.ref("users/" + userId).set({
            name: payload.name,
            email: payload.email,
            online: true,
          });
        })
        .catch((err) => console.log(err.message));
    },
    loginUser({}, payload) {
      firebaseAuth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((err) => console.log(err.message));
    },
    logoutUser() {
      firebaseAuth.signOut();
    },
    handleAuthStateChanged({ commit, dispatch, state }) {
      firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          //user is logged in
          let userId = firebaseAuth.currentUser.uid;
          firebaseDb.ref("users/" + userId).once("value", (snapshot) => {
            let userDetails = snapshot.val();

            commit("setUserDetails", {
              name: userDetails.name,
              email: userDetails.email,
              userId: userId,
            });
          });
          dispatch("firebaseUpdateUser", {
            userId: userId,
            updates: {
              online: true,
            },
          });
          dispatch("firebaseGetUser");
          this.$router.push("/");
        } else {
          //user is logged out
          dispatch("firebaseUpdateUser", {
            userId: state.userDetails.userId,
            updates: {
              online: false,
            },
          });
          commit("setUserDetails", {});

          this.$router.replace("/auth");
        }
      });
    },
    firebaseUpdateUser({}, payload) {
      firebaseDb.ref("users/" + payload.userId).update(payload.updates);
    },
    firebaseGetUser({ commit }) {
      firebaseDb.ref("users").on("child_added", (snapshot) => {
        let userDetails = snapshot.val();
        let userId = snapshot.key;
        // console.log("userDetails", userDetails);
        // console.log("snapshot", snapshot);
        commit("addUser", {
          userId,
          userDetails,
        });
      });
      firebaseDb.ref("users").on("child_changed", (snapshot) => {
        let userDetails = snapshot.val();
        let userId = snapshot.key;
        // console.log("userDetails", userDetails);
        // console.log("snapshot", snapshot);
        commit("updateUser", {
          userId,
          userDetails,
        });
      });
    },
    firebaseGetMessages({ state, commit }, otherUserId) {
      let userId = state.userDetails.userId;
      messagesRef = firebaseDb.ref("chats/" + userId + "/" + otherUserId);
      messagesRef.on("child_added", (snapshot) => {
        let messageDetails = snapshot.val();
        let messageId = snapshot.key;
        commit("addMessages", {
          messageId,
          messageDetails,
        });
      });
    },
    firebaseStopGettingMessages({ commit }) {
      if (messagesRef) {
        messagesRef.off("child_added");
        commit("clearMessages");
      }
    },
    firebaseSendMessage({ state }, payload) {
      console.log(payload);
      firebaseDb
        .ref("chats/" + state.userDetails.userId + "/" + payload.otherUserId)
        .push(payload.message);

      payload.message.from = "them";
      firebaseDb
        .ref("chats/" + payload.otherUserId + "/" + state.userDetails.userId)
        .push(payload.message);
    },
  },
  mutations: {
    setUserDetails(state, payload) {
      state.userDetails = payload;
    },
    addUser(state, payload) {
      state.users[payload.userId] = payload.userDetails;
    },
    updateUser(state, payload) {
      Object.assign(state.users[payload.userId], payload.userDetails);
    },
    addMessages(state, payload) {
      state.messages[payload.messageId] = payload.messageDetails;
    },
    clearMessages(state) {
      state.messages = {};
    },
  },
  state: {
    userDetails: {},
    users: {},
    messages: {},
  },
  getters: {
    getUserDetails(state) {
      return state.userDetails;
    },
    messages(state) {
      return state.messages;
    },
    users(state) {
      let usersFiltred = {};
      Object.keys(state.users).forEach((key) => {
        if (key != state.userDetails.userId) {
          usersFiltred[key] = state.users[key];
        }
      });
      return usersFiltred;
    },
  },
};
