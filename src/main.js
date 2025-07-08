import { createApp } from "vue";
import "@/assets/style/global.css";
import App from "./App.vue";
import router from "./router";

/* shadcn components */
import Button from "./components/ui/button/Button.vue";
import Input from "./components/ui/input/Input.vue";
import Textarea from "./components/ui/textarea/Textarea.vue";
import Card from "./components/ui/card/Card.vue";
import CardContent from "./components/ui/card/CardContent.vue";
import CardDescription from "./components/ui/card/CardDescription.vue";
import CardHeader from "./components/ui/card/CardHeader.vue";
import CardTitle from "./components/ui/card/CardTitle.vue";
import { Search } from "lucide-vue-next";

createApp(App)
  .use(router)
  .component("Button", Button)
  .component("Input", Input)
  .component("Textarea", Textarea)
  .component("Card", Card)
  .component("CardContent", CardContent)
  .component("CardDescription", CardDescription)
  .component("CardHeader", CardHeader)
  .component("CardTitle", CardTitle)
  .component("Search", Search)
  .mount("#app");
