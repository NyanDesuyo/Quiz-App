import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/score",
    name: "Score",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Score.vue"),
  },
  {
    path: "/question",
    name: "Question",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Question.vue"),
  },
  {
    path: "/guess",
    name: "Guess",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Guess.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
