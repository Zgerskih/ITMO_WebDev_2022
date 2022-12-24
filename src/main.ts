import { createApp } from "vue";
import PocketBase from "pocketbase";
import "./style.css";
import router from "./router";
import App from "./App.vue";
import Routes from "./consts/Routes";

const pb = new PocketBase(import.meta.env.VITE_DATABASE_URL);

console.log("> pb.authStore.isValid", pb.authStore.isValid);

router.beforeEach((to, from, next) => {
  const authRoutes = [Routes.INDEX, Routes.LOGIN, Routes.REGISTER];
  const IndexOfAuthRoute = authRoutes.indexOf(to.path);
  if (IndexOfAuthRoute < 0 && !pb.authStore.isValid) {
    next({ path: to.path });
  } else next();
});

const app = createApp(App);
app.use(router);
app.provide("pb", pb);
app.mount("#app");
