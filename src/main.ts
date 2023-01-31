import { createApp } from "vue";
import App from "./App.vue";

// Tailwind
import "@/styles/tailwind.css";

// Element UI
import "@/styles/index.scss";
import ElementPlus from "element-plus";

// Vue Router
import router from "@/common/router";

const app = createApp(App);

app.use(router);
app.use(ElementPlus);

app.mount("#app");
