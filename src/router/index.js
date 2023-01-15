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
    params: true,
    component: () => import("../views/OneArticle.vue")
  },
  {
    path: `/:id:title(\\d+)*:img:text`,
    name: "OneArticle",
    params: true, 
    component: () => import("../views/TextOneArticle.vue")
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});

export default router;