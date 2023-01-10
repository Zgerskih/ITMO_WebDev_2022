<script setup lang="ts">
import { ref } from "vue";
defineProps<{ msg: string }>();
const inputUserName = ref(null);
const inputUserPassword = ref(null);
const onLoginClick = () => {
  console.log("> onLoginClick");
};
</script>

<template>
  <h1>Login</h1>

  <div>
    <label for="username">Username:</label>
    <input ref="inputUserName" id="username" />
  </div>
  <div>
    <label for="password">Password:</label>
    <input ref="inputUserPassword" id="password" />
  </div>
  <div><button @click="onLoginClick">send</button></div>
  <div>
    <RouterLink :to="Routes.REGISTER">
      <small>Register</small>
    </RouterLink>
  </div>
</template>

<style scoped></style>
