import { createRouter, createWebHashHistory } from "vue-router";
import Routes from "./consts/Routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: Routes.INDEX,
      component: () => import("./pages/IndexPage.vue"),
    },
    {
      path: Routes.BOOKS,
      component: () => import("./pages/BookslistPages.vue"),
    },
    {
      path: Routes.LOGIN,
      component: () => import("./pages/UserLoginPage.vue"),
    },
    {
      path: Routes.REGISTER,
      component: () => import("./pages/UserRegisterPage.vue"),
    },
  ],
});
export default router;
