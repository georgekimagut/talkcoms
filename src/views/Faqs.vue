<template>
  <!-- load spinner before -->
  <Spinner v-if="page_is_loading" />
  <div v-if="page_is_loading === false" class="w-full">
    <Navbar :services="universal_services" :products="universal_products" />
    <HeroSection
      small_title="FAQs"
      big_title="Got Questions? We’ve Got Answers"
      hero_description="Have a question in mind? You're not alone. Browse through the most common questions our users ask — and find the answers you need in seconds"
      hero_image="/static/faqs-banner-big.png"
      hero_small_image="/static/faqs-banner.png"
      has_pattern
    />

    <div class="mt-10 w-full flex flex-wrap justify-center">
      <!-- <div class="w-[80%] flex justify-center">
        <div class="relative w-full max-w-sm items-center">
          <Input
            id="search"
            type="text"
            placeholder="Search..."
            class="pl-10 py-6 w-full border-[#82bc00]"
          />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
          >
            <Search class="size-6 text-muted-foreground" />
          </span>
        </div>
      </div> -->
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
// import DefaultInput from "../components/ui/input/DefaultInput.vue";
import { supabase } from "@/lib/supabase";
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
      filtered_faqs: [],
      all_faqs_tracker: [],
    };
  },
  async created() {
    document.title = "Talkcoms | Frequently asked questions";
    this.page_is_loading = true;
    this.universal_services = universal_content().services;
    this.universal_products = universal_content().products;

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
      console.log("Solutions List: ", this.solutions_list);
    },
  },
};
</script>
