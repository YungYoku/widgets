import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import "./assets/scss/main.scss";
import "leaflet/dist/leaflet.css";

Vue.config.productionTip = false;

Vue.use({
  install(v) {
    v.prototype.$http = axios;
  },
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
