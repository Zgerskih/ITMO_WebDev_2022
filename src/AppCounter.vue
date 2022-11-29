<template>
  <h1 ref="Header">App Counter</h1>
  <button v-on:click="ADD">кнопка жмяк</button>
  <input v-model="message" placeholder="editMe" />

  <p v-html="innerHTML"></p>
  <CounterValue
    class="counter"
    v-for="obj in [{ index: 1, text: 'Clicked', counter: counter }]"
    :title="obj.text"
    :value="counter"
    :key="obj.index"
  />
  <button v-on:click="onPlus($event, 1)">+</button>
  <button v-if="canRenderMinusButton > 0" @click="onMinus">-</button>
</template>
<script>
import CounterValue from './components/CounterValue.vue';

const LOCAL_KEY_COUNTER = 'counter';
const saveCounter = (value) => localStorage.setItem(LOCAL_KEY_COUNTER, value);
let counterWatcher = null;

export default {
  components: { CounterValue },
  data() {
    return {
      counter: 0,
    };
  },
  created() {
    console.log('> created:', this.counter);
    this.counter = localStorage.getItem(LOCAL_KEY_COUNTER) || 0;
    counterWatcher = this.$watch(
      () => this.counter,
      (newValue, oldValue) => {
        console.log('> counter watched:', { newValue, oldValue });
        saveCounter(newValue);
      },
    );
  },
  mounted() {
    console.log('> created: ', this.counter);
  },
  unmounted() {
    counterWatcher();
    console.log('> created: ', this.counter);
  },

  computed: {
    canRenderMinusButton() {
      return this.counter > -10;
    },
  },

  methods: {
    onPlus(event, index) {
      this.counter++;
      if (this.counter > 13) this.$destroy();
      saveCounter(this.counter);
      console.log('>counter -> onPlus', this.counter, this);
    },
    onMinus() {
      this.counter--;
      if (this.counter === 0) {
        this.$refs.header.innerHTML = `<b>Header:</b>;`;
        saveCounter(this.counter);
      }
      console.log('>counter -> onMinus', this.counter);
    },
    editMe(e) {
      this.values();
      console.log('values -> editMe', this.values);
    },
  },
};
</script>
<style lang="scss" scoped>
.counter {
  color: green;
}
</style>
