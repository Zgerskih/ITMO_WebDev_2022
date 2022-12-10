import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Vuesax from 'vuesax3';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';
// import './assets/main.css';
import 'vuesax3/dist/vuesax.css';

const app = createApp(App);

app.use(Vuesax);
app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);
app.mount('#app');
