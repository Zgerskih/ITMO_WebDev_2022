<template>

  <p class='value'>
    <span style='color: #646cff'>{{ title }} </span>: {{ value }}
  </p>

</template>
<script>
export default {
  props:{
    title: "",
    value: 1,
  },
};
</script>>
<style scoped>
p.counter-value{
  color: rebeccapurple;
  font-size: 2rem;
  font-weight: normal;
}
</style>
