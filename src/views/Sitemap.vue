<template>
  <Spinner v-if="page_is_loading" />
  <div
    v-if="page_is_loading === false"
    class="w-full flex justify-center bg-white"
  >
    <div class="p-8 w-[90%] max-w-x flex flex-wrap">
      <h1
        class="w-full text-2xl font-semibold mb-6 border-b-2 pb-4 text-default"
      >
        Sitemap
      </h1>
      <div class="w-[25%]">
        <h2 class="text-xl">General</h2>
        <ul class="space-y-4 text-lg mt-4">
          <li>
            <router-link to="/" class="text-third hover:underline"
              >Home</router-link
            >
          </li>
          <li>
            <router-link to="/about" class="text-third hover:underline"
              >About Us</router-link
            >
          </li>
          <li>
            <router-link
              to="/contact/contact-us"
              class="text-third hover:underline"
              >Contact Us</router-link
            >
          </li>
          <li>
            <router-link
              to="/contact/get-started"
              class="text-third hover:underline"
              >Book a Demo</router-link
            >
          </li>
        </ul>
      </div>
      <!-- end -->
      <div class="w-[25%]">
        <h2 class="text-xl">Resources</h2>
        <ul class="space-y-4 text-lg mt-4">
          <li>
            <router-link to="/blogs" class="text-third hover:underline"
              >Blogs</router-link
            >
          </li>
          <li>
            <router-link
              to="/success-stories"
              class="text-third hover:underline"
              >Success Stories</router-link
            >
          </li>
          <li>
            <router-link to="/testimonials" class="text-third hover:underline"
              >Testimonials</router-link
            >
          </li>
          <li>
            <router-link to="/faqs" class="text-third hover:underline"
              >FAQs</router-link
            >
          </li>
        </ul>
      </div>
      <!-- end -->
      <div class="w-[25%]">
        <h2 class="text-xl">Product & Services</h2>
        <ul class="space-y-4 text-lg mt-4">
          <li v-for="(product, index) in universal_products" :key="index">
            <router-link
              :to="`/product/${product.product_name}`"
              class="text-third hover:underline"
              >{{ product.product_name }}</router-link
            >
          </li>
          <li v-for="(service, index) in universal_services" :key="index">
            <router-link
              :to="`/service/${service.product_name}`"
              class="text-third hover:underline"
              >{{ service.product_name }}</router-link
            >
          </li>
        </ul>
      </div>
      <!-- end -->
      <div class="w-[25%]">
        <h2 class="text-xl">Solutions By Industry</h2>
        <ul class="space-y-4 text-lg mt-4">
          <li v-for="(industry, index) in universal_industries" :key="index">
            <router-link
              :to="`/solution/${industry.main_title}`"
              class="text-third hover:underline"
              >{{ industry.main_title }}</router-link
            >
          </li>
        </ul>
      </div>
      <!-- end -->
    </div>
  </div>
</template>
<script>
import Spinner from "@/components/general/Spinner.vue";
import { universal_content } from "@/store/contentStore";
export default {
  name: "Sitemap",
  components: { Spinner },
  data() {
    return {
      universal_services: [],
      universal_products: [],
      universal_industries: [],
      solutions: [],
      page_is_loading: true,
    };
  },
  async created() {
    document.title = "Talkcoms | Sitemap";
    this.page_is_loading = true;
    this.universal_products = universal_content().products;
    this.universal_services = universal_content().services;
    this.universal_industries = universal_content().industries;

    if (
      this.universal_services == "" ||
      this.universal_products == "" ||
      this.universal_industries == ""
    ) {
      this.fetch_service_names();
    }
    try {
      //await Promise.all([this.get_solutions()]);
    } catch (error) {
      console.error("Loading failed:", error);
    } finally {
      this.page_is_loading = false;
    }
  },
  methods: {
    /* fetch service names */
    async fetch_service_names() {
      try {
        const response = await fetch(
          "https://cms.talkcoms.co.uk/api/service-pages/?fields[0]=product_name&fields[1]=is_product"
        );
        const responseData = await response.json();
        if (responseData.data) {
          const dataArray = Array.isArray(responseData.data)
            ? responseData.data
            : [responseData.data];
          const fetched_services = dataArray;
          /* store service universally */
          fetched_services.forEach((item) => {
            if (item.is_product === true) {
              this.universal_products.push({ product_name: item.product_name });
            } else {
              this.universal_services.push({ product_name: item.product_name });
            }
            /* store service names for navigation */
            const contentStore = universal_content();
            contentStore.setServices(this.universal_services);
            contentStore.setProducts(this.universal_products);
          });
        } else {
          console.error("Invalide service response structure: ", responseData);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    },
  },
};
</script>
