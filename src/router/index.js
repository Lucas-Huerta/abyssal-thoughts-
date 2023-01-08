import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: `/article-:index(\\d+)*`,
    name: "article",
    props:true, 
    params: true,
    component: () => import("../views/OneArticle.vue")
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});

export default router;