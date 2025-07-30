import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Faqs from "@/views/Faqs.vue";
import Blogs from "@/views/Blogs.vue";
import ServiceView from "@/views/dynamic/ServiceView.vue";
import SuccessStories from "@/views/SuccessStories.vue";
import ResourceView from "@/views/dynamic/ResourceView.vue";
import NotFound from "@/views/NotFound.vue";
import Contact from "@/views/Contact.vue";
import SolutionView from "@/views/dynamic/SolutionView.vue";
import Testimonials from "@/views/Testimonials.vue";
import Sitemap from "@/views/Sitemap.vue";

const routes = [
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title: "Home" },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: { title: "About Us" },
  },
  {
    path: "/contact/:type",
    name: "Contact",
    component: Contact,
    meta: { title: "Get in touch" },
    props: true,
  },
  {
    path: "/faqs",
    name: "Faqs",
    component: Faqs,
    meta: { title: "FAQs" },
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta: { title: "Blogs" },
  },
  {
    path: "/service/:id",
    name: "Single Service",
    component: ServiceView,
    meta: { title: "Services" },
    props: true,
  },
  {
    path: "/product/:id",
    name: "Single Product",
    component: ServiceView,
    meta: { title: "Products" },
    props: true,
  },
  {
    path: "/solution/:id",
    name: "Single Industry",
    component: SolutionView,
    meta: { title: "Solutions by Industry" },
    props: true,
  },
  {
    path: "/success-stories",
    name: "Success Stories",
    component: SuccessStories,
    meta: { title: "Success Stories" },
  },
  {
    path: "/resources/:type/:id",
    name: "Resource",
    component: ResourceView,
    meta: { title: "Resources" },
    props: true,
  },
  {
    path: "/testimonials",
    name: "Testimonials",
    component: Testimonials,
    meta: { title: "Testimonials" },
    props: true,
  },

  {
    path: "/sitemap",
    name: "Sitemap",
    component: Sitemap,
    meta: { title: "Sitemap" },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});

export default router;
