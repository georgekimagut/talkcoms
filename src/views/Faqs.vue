<template>
  <!-- load spinner before -->
  <Spinner v-if="page_is_loading" />
  <div v-if="page_is_loading === false" class="w-full">
    <Navbar
      :services="universal_services"
      :products="universal_products"
      :industries="universal_industries"
    />
    <HeroSection
      small_title="FAQs"
      big_title="Got Questions? We’ve Got Answers"
      hero_description="Have a question in mind? You're not alone. Browse through the most common questions our users ask — and find the answers you need in seconds"
      hero_image="/static/faqs-banner-big.png"
      hero_small_image="/static/faqs-banner.png"
      hero_image_alt="Got Questions? We’ve Got Answers"
      has_pattern
    />

    <div class="mt-10 w-full flex flex-wrap justify-center">
      <div class="mt-0 w-[80%] flex overflow-x-scroll hide-scrollbar">
        <div
          v-for="(solution, index) in solutions_list"
          :key="index"
          class="p-2 pr-4 pl-4 mr-2 rounded-full border border-[#82bc00] flex justify-center cursor-pointer flex-shrink-0"
          :class="solution.solution_class"
          @click="change_solution(index, solution.name)"
        >
          {{ solution.name }}
        </div>
      </div>
      <!-- FAQs -->
      <div class="w-full mt-16 flex justify-center flex-wrap">
        <Accordion :faqs="faqs" />
      </div>
    </div>
    <!-- CTA -->
    <Cta />
    <!-- footer -->
    <Footer :services="universal_services" :products="universal_products" />
  </div>
</template>
<script>
import Accordion from "@/components/Accordion/Accordion.vue";
import Cta from "@/components/general/Cta.vue";
import Footer from "@/components/general/Footer.vue";
import HeroSection from "@/components/general/HeroSection.vue";
import Navbar from "@/components/general/Navbar.vue";
import Spinner from "@/components/general/Spinner.vue";
import { universal_content } from "@/store/contentStore";
import { faqs_end_point } from "@/store/store";

export default {
  name: "Faqs",
  components: {
    Navbar,
    Spinner,
    HeroSection,
    // DefaultInput,
    Footer,
    Cta,
    Accordion,
  },
  data() {
    return {
      page_is_loading: true,
      all_solutions: [],
      solutions_list: [],
      faqs: [],
      universal_services: [],
      universal_products: [],
      universal_industries: [],
      filtered_faqs: [],
      all_faqs_tracker: [],
    };
  },
  async created() {
    document.title = "Talkcoms | Frequently asked questions";
    this.page_is_loading = true;
    this.universal_services = universal_content().services;
    this.universal_products = universal_content().products;
    this.universal_industries = universal_content().industries;

    if (
      this.universal_services == "" ||
      this.universal_products == "" ||
      this.universal_industries == ""
    ) {
      this.fetch_service_names();
    }

    try {
      // await this.get_faqs();
      await Promise.all([this.fetch_faqs()]);
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
    async faqs_filtering() {
      this.filtered_faqs = [...this.faqs];
      this.all_faqs_tracker = [...this.faqs];
    },
    change_solution(item_index, item_name) {
      this.solutions_list = this.solutions_list.map((solution, index) => {
        return {
          ...solution,
          solution_class:
            index === item_index ? "bg-secondary text-white" : "text-secondary",
        };
      });
      //filter and show only specific faqs
      this.faqs = this.all_faqs_tracker;
      if (item_name == "All") {
        return;
      }
      const selected_category = item_name;
      this.filtered_faqs = this.faqs.filter(
        (faq) => faq.main_title === selected_category
      );
      // set faqs to filtered
      this.faqs = this.filtered_faqs;

      // actions for categories
    },

    /* fetch faqs */
    async fetch_faqs() {
      try {
        const response = await fetch(faqs_end_point);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData.data) {
          const dataArray = Array.isArray(responseData.data)
            ? responseData.data
            : [responseData.data];
          this.faqs = dataArray.flatMap((item) => {
            const mainTitle = item.main_title || "";
            return (item.FAQs || []).map((faq) => ({
              ...faq,
              main_title: mainTitle,
            }));
          });

          /* create filtering and categories */
          this.generate_services();
          this.faqs_filtering();
        } else {
          console.error("Invalid response structure:", responseData);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    },
    async generate_services() {
      const retrieved_services = [
        { name: "All", solution_class: "text-secondary" },
      ];

      this.faqs.forEach((service) => {
        //push types to types arrays
        retrieved_services.push({
          name: service.main_title,
          solution_class: "text-secondary",
        });
      });
      this.solutions_list = Object.values(
        retrieved_services.reduce((service, item) => {
          service[item.name] = item;
          return service;
        }, {})
      );
    },
  },
};
</script>
