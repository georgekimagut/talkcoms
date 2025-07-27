<template>
  <!-- load spinner before -->
  <Spinner v-if="page_is_loading" />
  <div v-if="page_is_loading === false" class="w-full">
    <Navbar />
    <!-- new hero -->
    <HeroSection
      v-for="(study, index) in all_cases_tracker.slice(0, 1)"
      :key="index"
      small_title="CASE STUDIES"
      :big_title="study.title"
      :hero_description="study.short_description"
      :read_more_link="`/resources/${case_study}/${study.title}`"
      :hero_image="study.pic"
      is_study
    />
    <!-- end of hero -->
    <!-- story body -->
    <div class="w-full flex justify-center flex-wrap mt-16" id="studies">
      <div class="w-[90%]">
        <p class="text-secondary flex justify-center">STORIES</p>

        <h1 class="text-4xl font-bold mt-4 p-2 flex justify-center">
          Stories from our clients
        </h1>
      </div>
      <div class="w-[90%] mt-8 flex justify-end">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="mr-4 cursor-pointer font-semibold custom-default-hover"
          @click="change_category(index, service.id)"
          :class="service.active_category"
        >
          {{ service.name }}
        </div>
      </div>
      <div class="w-[90%] flex gap-4 mt-16">
        <CustomCard
          v-for="(story, index) in case_studies"
          :key="index"
          :card_pic="story.pic"
          :card_title="story.client"
          :card_description="story.title"
          card_class="w-[31%] min-w-[28%] ml-[1.5%] mb-4"
          link_text="READ MORE"
          :link_to="`/resources/${case_study}/${story.title}`"
          has_link
        />
      </div>
    </div>
    <!-- footer -->
    <Footer />
  </div>
</template>
<script>
import CustomCard from "@/components/ui/card/CustomCard.vue";
import Footer from "@/components/general/Footer.vue";
import HeroSection from "@/components/general/HeroSection.vue";
import Navbar from "@/components/general/Navbar.vue";
import Spinner from "@/components/general/Spinner.vue";
import BigTitle from "@/components/text/BigTitle.vue";
import SmallTitle from "@/components/text/SmallTitle.vue";
import { supabase } from "@/lib/supabase";

export default {
  name: "CaseStudies",
  components: {
    Spinner,
    Navbar,
    HeroSection,
    Footer,
    SmallTitle,
    BigTitle,
    CustomCard,
  },
  data() {
    return {
      page_is_loading: true,
      case_studies: [],
      all_cases_tracker: [],
      filtered_cases: [],
      case_study: "case-study",
      services: [{ id: "0", name: "All", active_category: "" }],
    };
  },
  async created() {
    document.title = "Talkcoms | Get started";
    this.page_is_loading = true;

    try {
      await this.get_studies();
      await this.get_services();
    } catch (error) {
      console.error("Loading failed:", error);
    } finally {
      this.page_is_loading = false;
    }
  },
  methods: {
    //change category
    change_category(item_index, item_id) {
      this.services = this.services.map((category, index) => {
        return {
          ...category,
          active_category: index === item_index ? "text-secondary" : "",
        };
      });
      // change categories
      this.case_studies = this.all_cases_tracker;
      if (item_id == "0") {
        return;
      }
      const selected_category = item_id;
      this.filtered_cases = this.case_studies.filter(
        (story) => story.service_id === selected_category
      );
      // set stories to filtered
      this.case_studies = this.filtered_cases;
    },
    //get stories
    async get_studies() {
      try {
        const { data, error } = await supabase.from("case_studies").select("*");

        if (error) {
          console.log(error);
          return;
        }
        this.case_studies = data;
        this.all_cases_tracker = this.case_studies;
        this.filtered_cases = this.case_studies;
        console.log(this.case_studies);
      } catch (error) {
        console.log(error);
      }
    },
    async get_services() {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("id, name")
          .order("created_at", { ascending: false });
        data.forEach((service) => {
          this.services.push({
            id: service.id,
            name: service.name,
            active_category: false,
          });
        });
        if (error) {
          console.log(error);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
