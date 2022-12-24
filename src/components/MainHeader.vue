<script setup lang="ts">
import { computed, ref } from "vue";
import Routes from "../consts/Routes";

const props = defineProps<{ userData?: any }>();
const isUserAuthenticated = computed(() => !!props.userData);
</script>

<template>
  <div>Header</div>
  <div v-if="isUserAuthenticated">{{ userData.username }}</div>
  <div v-else>
    <RouterLink :to="Routes.LOGIN">Login</RouterLink>
  </div>
</template>
<script Lang="ts"></script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
