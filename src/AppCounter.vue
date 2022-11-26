<template>
  <h1>App Counter</h1>
  <p v-html='innerHTML'></p>
  <CounterValue v-for="obj in [  {index:1, text: 'Clicked', counter: counter}]"
  :title="obj.text"
  :value="counter"
  :key="obj.index"
  />

  <button v-on:click="onPlus($event, 1)">+</button>
  <button v-if="canRenderMinusButton > 0" @click="onMinus">-</button>
</template>
<script>

import CounterValue from '@/components/CounterValue.vue';
export default {
  components: { CounterValue },
  data() {
    return {
     counter: 0,
      innerHTML: `<h2>Hello</h2>`
              };
          },
          computed: {
    canRenderMinusButton(){
      return this.counter > -10;
     },
       },
          methods: {
            onPlus(event, index){
              this.counter++;
              console.log('>counter -> onPlus', this.counter, event, index);
        },
            onMinus(){
              this.counter--;
              console.log('>counter -> onMinus', this.counter);
        },
    }
}

</script>>
<style scoped>
p.counter-value{
  color: rebeccapurple;
  font-size: 2rem;
  font-weight: normal;
}
</style>
