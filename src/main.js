import { createApp } from "vue";
import "@/assets/style/global.css";
import App from "./App.vue";
import router from "./router";
/* pinia */
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

/* lazy load */
import VueLazyLoad from "vue3-lazy";
/* shadcn components */
import Button from "./components/ui/button/Button.vue";
import Input from "./components/ui/input/Input.vue";
import Textarea from "./components/ui/textarea/Textarea.vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Search } from "lucide-vue-next";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

createApp(App)
  .use(pinia)
  .use(router)
  .use(VueLazyLoad, {
    loading: "loading-placeholder.jpg",
    error: "/icons/image_load.gif",
  })
  .component("Button", Button)
  .component("Input", Input)
  .component("Textarea", Textarea)
  .component("Card", Card)
  .component("CardContent", CardContent)
  .component("CardDescription", CardDescription)
  .component("CardHeader", CardHeader)
  .component("CardTitle", CardTitle)
  .component("Search", Search)
  .component("Select", Select)
  .component("SelectContent", SelectContent)
  .component("SelectGroup", SelectGroup)
  .component("SelectItem", SelectItem)
  .component("SelectLabel", SelectLabel)
  .component("SelectTrigger", SelectTrigger)
  .component("SelectValue", SelectValue)

  .mount("#app");
