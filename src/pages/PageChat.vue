<template>
  <q-page ref="pageChat" class="flex">
    <div
      class="q-pa-md column col justify-end"
      :class="{ invisable: !showMessages }"
    >
      <q-chat-message
        v-for="(message, key) in messages"
        :key="key"
        :name="message.from !== 'me' ? otherUserDetails : 'me'"
        :text="[message.text]"
        :stamp="message.time"
        :sent="message.from == 'me' ? true : false"
      />
    </div>

    <q-footer elevated>
      <q-toolbar>
        <q-form @submit="sendMessage" class="full-width">
          <q-input
            v-model="newMessage"
            bg-color="white"
            class="full-width"
            outlined
            rounded
            label="message"
            dense
          >
            <template v-slot:after>
              <q-btn
                round
                dense
                flat
                @click="sendMessage"
                icon="send"
                type="submit"
                color="white"
              />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
// import { defineComponent } from 'vue';
//
import { mapActions, mapState, mapGetters } from "vuex";
import mixinOtherUserDetails from "src/mixins/mixinOtherUserDetails";
export default {
  mixins: [mixinOtherUserDetails],
  data() {
    return {
      newMessage: "",
      showMessages: false,
      // messages: [
      //   { text: "hey", from: "me" },
      //   { text: "yo", from: "them" },
      //   { text: "whats up?", from: "me" },
      // ],
    };
  },
  computed: {
    ...mapGetters(["messages", "users"]),
  },
  watch: {
    messages(val) {
      console.log("VAL", val);
      if (Object.keys(val).length) {
        this.scrollToBottom();
        // setTimeout(() => {
        //   this.showMessages = true;
        // },200);
      }
    },
  },
  methods: {
    ...mapActions([
      "firebaseGetMessages",
      "firebaseStopGettingMessages",
      "firebaseSendMessage",
    ]),
    scrollToBottom() {
      let chatPage = this.$refs.pageChat.$el;

      setTimeout(() => {
        window.scrollTo(0, chatPage.scrollHeight);
      }, 20);
    },
    sendMessage() {
      if (this.newMessage !== "") {
        let date = new Date();
        this.firebaseSendMessage({
          message: {
            text: this.newMessage,
            from: "me",
            time: `${date.getHours()}:${
              parseInt(date.getMinutes()) < 10
                ? "0" + date.getMinutes()
                : date.getMinutes()
            }`,
          },
          otherUserId: this.$route.params.userId,
        });
        this.newMessage = "";
        this.scrollToBottom();
      }
    },
  },
  unmounted() {
    this.firebaseStopGettingMessages();
  },
  mounted() {
    this.firebaseGetMessages(this.$route.params.userId);
  },
};
</script>
<style>
.pageChat {
  background-color: lightblue;
}
</style>
