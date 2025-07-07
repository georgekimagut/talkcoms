import { createApp } from "vue";
import "@/assets/style/global.css";
import App from "./App.vue";
import router from "./router";

/* shadcn components */
import Button from "./components/ui/button/Button.vue";
import Input from "./components/ui/input/Input.vue";
import Textarea from "./components/ui/textarea/Textarea.vue";

createApp(App)
  .use(router)
  .component("Button", Button)
  .component("Input", Input)
  .component("Textarea", Textarea)
  .mount("#app");
