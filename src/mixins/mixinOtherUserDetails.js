export default {
  computed: {
    otherUserDetails() {
      return this.users[this.$route.params.userId].name;
    },
  },
};
