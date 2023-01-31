import { createApp } from "vue";
import App from "./App.vue";

// Tailwind
import "@/styles/tailwind.css";

// Element UI
import "@/styles/index.scss";
import ElementPlus from "element-plus";

const app = createApp(App);

app.use(ElementPlus);

app.mount("#app");
