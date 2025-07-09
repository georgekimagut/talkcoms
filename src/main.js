import { createApp } from "vue";
import "@/assets/style/global.css";
import App from "./App.vue";
import router from "./router";

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
// import CardContent from "./components/ui/card/CardContent.vue";
// import CardDescription from "./components/ui/card/CardDescription.vue";
// import CardHeader from "./components/ui/card/CardHeader.vue";
// import CardTitle from "./components/ui/card/CardTitle.vue";
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
  .component("Select", Select)
  .component("SelectContent", SelectContent)
  .component("SelectGroup", SelectGroup)
  .component("SelectItem", SelectItem)
  .component("SelectLabel", SelectLabel)
  .component("SelectTrigger", SelectTrigger)
  .component("SelectValue", SelectValue)

  .mount("#app");
