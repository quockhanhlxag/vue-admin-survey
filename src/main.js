import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Axios from "axios";
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";
import "./assets/styles/main.scss";

Vue.use(VueViewer);
Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
