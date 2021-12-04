<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          :to="'/'"
          flat
          dense
          icon="arrow_back"
          label="back"
        />

        <q-toolbar-title class="absolute-center" :class="$route.fullPath.includes('/chat') && 'name'">
          {{ title }}
        </q-toolbar-title>

        <q-btn
          v-if="!getUserDetails?.userId"
          to="/auth"
          class="absolute-right q-pr-md"
          no-caps
          flat
          dense
          icon="account_circle"
          label="login"
        />
        <q-btn
          v-else
          class="absolute-right q-pr-md"
          @click="logoutUser"
          no-caps
          flat
          dense
          icon="account_circle"
          label="logout"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "MainLayout",

  computed: {
    ...mapGetters(["getUserDetails","users"]),
    title() {
      let currentPath = this.$route.fullPath;

      if (currentPath == "/") {
        return "myChat";
      } else if (currentPath == "/auth") {
        return "Auth";
      } else if (currentPath == `/chat/${this.$route.params.userId}`) {
        return `${this.users[this.$route.params.userId].name}`;
      } else {
        return "home";
      }
    },
  },
  methods: {
    ...mapActions(["logoutUser"]),
  },

  // components: {
  //   EssentialLink
  // },
  //
  // setup () {
  //   const leftDrawerOpen = ref(false)
  //
  //   return {
  //     essentialLinks: linksList,
  //     leftDrawerOpen,
  //     toggleLeftDrawer () {
  //       leftDrawerOpen.value = !leftDrawerOpen.value
  //     }
  //   }
  // }
};
</script>

<style>
  .name{
    font-size: 25px;
    font-weight: bold;
  }

</style>
