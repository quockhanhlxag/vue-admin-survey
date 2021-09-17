import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
  },
  {
    path: "/admin/store",
    name: "Store",
    component: () =>
      import(/* webpackChunkName: "store" */ "../views/Store.vue"),
  },
  {
    path: "/admin/audit",
    name: "Audit",
    component: () =>
      import(/* webpackChunkName: "audit" */ "../views/Survey.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
