import Vue from "vue";
import App from "./App.vue";
import axios, { AxiosStatic } from "axios";
import "./assets/scss/main.scss";
import "leaflet/dist/leaflet.css";
import { store } from "./store";

Vue.config.productionTip = false;

Vue.use({
  install(v) {
    v.prototype.$http = axios;
  }
});
declare module "vue/types/vue" {
  interface Vue {
    $http: AxiosStatic;
  }
}

new Vue({
  store,
  render: (h) => h(App)
}).$mount("#app");
