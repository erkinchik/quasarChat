<template>
  <q-page class="flex q-pa-md">
    <q-card class="full-width">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <h5>Login</h5>
          <login-register :tab="tab"  />
        </q-tab-panel>

        <q-tab-panel name="register">
          <h5>Register</h5>
          <login-register :tab="tab" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";
import loginRegister from "../components/login-register";

export default {
  components: {
    loginRegister,
  },
  setup() {
    return {
      tab: ref("login"),
    };
  },
};
</script>
<style></style>
