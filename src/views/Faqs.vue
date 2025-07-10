<template>
  <!-- load spinner before -->
  <Spinner v-if="page_is_loading" />
  <div v-if="page_is_loading === false" class="w-full">
    <Navbar />

    <HeroSection
      small_title="FAQs"
      big_title="Got Questions? We’ve Got Real Answers"
      hero_description="Have a question in mind? You're not alone. Browse through the most common questions our users ask — and find the answers you need in seconds"
      hero_image="/static/pic-3.png"
      hero_small_image="/static/about-us.png"
    />

    <div class="mt-32 w-full flex flex-wrap justify-center">
      <div class="w-[80%] flex justify-center">
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
      </div>
      <div class="mt-16 w-[80%] flex justify-center">
        <div
          v-for="(solution, index) in solutions_list"
          :key="index"
          class="p-2 pr-4 pl-4 mr-2 rounded-full border border-[#82bc00] flex justify-center cursor-pointer"
          :class="solution.solution_class"
          @click="change_solution(index)"
        >
          {{ solution.name }}
        </div>
      </div>
      <!-- FAQs -->
      <div class="w-full mt-16 flex justify-center flex-wrap">
        <Accordion has_chat :faqs="faqs" />
      </div>
    </div>
    <!-- CTA -->
    <Cta />
    <!-- footer -->
    <Footer />
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
      solutions_list: [
        { name: "All", solution_class: "text-secondary" },
        { name: "Omnichannel CC", solution_class: "text-secondary" },
        { name: "Outsourced CC", solution_class: "text-secondary" },
        { name: "PBX", solution_class: "text-secondary" },
        { name: "iTaaS", solution_class: "text-secondary" },
        { name: "Internet Solutions", solution_class: "text-secondary" },
        { name: "ERP", solution_class: "text-secondary" },
        { name: "CRM", solution_class: "text-secondary" },
      ],
      faqs: [],
    };
  },
  async mounted() {
    this.page_is_loading = true;

    try {
      await this.get_faqs();
    } catch (error) {
      console.error("Loading failed:", error);
    } finally {
      this.page_is_loading = false;
    }
  },
  methods: {
    change_solution(item_index) {
      this.solutions_list = this.solutions_list.map((solution, index) => {
        return {
          ...solution,
          solution_class:
            index === item_index ? "bg-secondary text-white" : "text-secondary",
        };
      });
    },
    async get_faqs() {
      try {
        const { data, error } = await supabase.from("faqs").select("*");

        if (error) {
          console.log(error);
          return;
        }
        this.faqs = data;
        console.log(this.faqs);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
