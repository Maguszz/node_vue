import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
// import Login from "../views/Login/login.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  // 重定向
  {
    path: "/admin",
    redirect: "Home"
  },
  {
    path: "/login",
    name: "Login",
    // 多写了一个空格就报错了
    component: ()=>import("../views/Login/login.vue")
  },
  // http://192.168.0.105:8080/#/about  是# 后面的进行匹配
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
