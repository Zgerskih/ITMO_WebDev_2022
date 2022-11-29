<template>
  <p class="value" :class="{ alert: isCounterAlert }">
    <span style="color: #646cff">{{ title }} </span>: {{ value }}
  </p>
</template>
<script>
export default {
  props: {
    title: '',
    value: 0,
  },
  computed: {
    isCounterAlert() {
      return this.value >= 10;
    },
  },
};
</script>
<style lang="scss" scoped>
p.counter-value {
  color: rebeccapurple;
  font-size: 2rem;
  font-weight: normal;
}
.alert {
  background: red;
}
</style>
