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
    name: "Survey",
    component: () =>
      import(/* webpackChunkName: "survey" */ "../views/Survey.vue"),
  },
  {
    path: "/admin/audit/:audit_id",
    name: "Survey details",
    component: () =>
      import(
        /* webpackChunkName: "survey-details" */ "../views/SurveyDetails.vue"
      ),
  },
  {
    path: "/admin/user_management",
    name: "User management",
    component: () =>
      import(
        /* webpackChunkName: "user-management" */ "../views/UserManagement.vue"
      ),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
