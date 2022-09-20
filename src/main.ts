import { createApp } from "vue";
import App from "./App.vue";
import "./assets/scss/main.scss";
import { store } from "@/store";

const app = createApp(App);

app.use(store);

app.mount("#app");
