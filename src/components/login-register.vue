<template>
  <q-form @submit="submitForm">
    <q-input
      v-if="tab == 'register'"
      class="q-mb-lg"
      v-model="formData.name"
      outlined
      label="name"
    />
    <q-input class="q-mb-lg" v-model="formData.email" outlined label="email" />
    <q-input
      v-model="formData.password"
      outlined
      label="password"
      type="password"
    />
    <div class="row">
      <q-space />
      <q-btn class="q-mt-lg" :label="tab" type="submit" />
    </div>
  </q-form>
</template>

<script>
  import {mapActions} from "vuex"

export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        name: "",
        email: "dan@email.com",
        password: "123321",
      },
    };
  },
  methods: {
    ...mapActions(["registerUser","loginUser"]),
    submitForm() {
      if (this.tab == "login") {
      this.loginUser(this.formData)
      }else {
       this.registerUser(this.formData)
      }
    },
  },
};
</script>

<style scoped></style>
