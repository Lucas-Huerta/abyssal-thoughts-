import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/article",
    name: "article",
    meta: { requireVisitor: true },
    params: true, 
    query: true, 
    component: () => import("../views/OneArticle.vue")
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});

export default router;