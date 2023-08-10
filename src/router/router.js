import Main from "../pages/Main.vue";
import PostPage from "../pages/PostPage.vue"
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Main
  }, {
    path: "/posts",
    component: PostPage,
  }
]; 

const router = createRouter({
  routes, history: createWebHistory()
});

export default router;