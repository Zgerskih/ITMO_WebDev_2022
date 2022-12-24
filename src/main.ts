import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const db = new PouchDB('http://localhost:5984/books', {skip_setup: true});
const app = createApp(App);
app.provide('db', db);
app.mount('#app');
