import { createApp } from "vue";
import App from "./App.vue";

// Tailwind
import "@/styles/tailwind.css";

// Element UI
import "@/styles/index.scss";
import ElementPlus from "element-plus";

// Vue Router
import router from "@/common/router";

// Pinia
import { createPinia } from "pinia";
const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(ElementPlus);

app.mount("#app");
