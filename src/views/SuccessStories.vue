<template>
  <!-- load spinner before -->
  <Spinner v-if="page_is_loading" />
  <div v-if="page_is_loading === false" class="w-full">
    <Navbar />
    <!-- new hero -->
    <HeroSection
      v-for="(story, index) in all_stories_tracker.slice(0, 1)"
      :key="index"
      small_title="SUCCESS STORIES"
      :big_title="story.title"
      :hero_description="story.short_description"
      :read_more_link="`/resources/${success_story}/${story.title}`"
      :hero_image="story.pic"
      is_story
    />
    <!-- end of hero -->
    <!-- story body -->
    <div class="w-full flex justify-center flex-wrap mt-16" id="stories">
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
          class="mr-4 cursor-pointer rounded-full text-center py-1 flex flex-col justify-center px-4 border border-[#82bc00] text-sm"
          @click="change_category(index, service.id)"
          :class="service.active_category"
        >
          {{ service.name }}
        </div>
      </div>
      <div class="w-[90%] flex mt-16">
        <CustomCard
          v-for="(story, index) in success_stories"
          :key="index"
          :card_pic="story.pic"
          :card_title="story.client"
          :card_description="story.title"
          card_class="w-[31%] min-w-[28%] ml-[1.5%] mb-4"
          link_text="READ MORE"
          :link_to="`/resources/${success_story}/${story.title}`"
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
import { success_stories_end_point } from "@/store/store";

export default {
  name: "SuccesStories",
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
      success_stories: [],
      all_stories_tracker: [],
      filtered_stories: [],
      success_story: "story",
      services: [{ id: "0", name: "All", active_category: "" }],
    };
  },
  methods: {
    //change category
    change_category(item_index, item_id) {
      this.services = this.services.map((category, index) => {
        return {
          ...category,
          active_category:
            index === item_index ? "text-white bg-secondary" : "",
        };
      });
      // change categories
      this.success_stories = this.all_stories_tracker;
      if (item_id == "0") {
        return;
      }
      const selected_category = item_id;
      this.filtered_stories = this.success_stories.filter(
        (story) => story.service_id === selected_category
      );
      // set stories to filtered
      this.success_stories = this.filtered_stories;
    },
    //get stories
    async get_stories() {
      try {
        const { data, error } = await supabase
          .from("success_stories")
          .select("*");

        if (error) {
          console.log(error);
          return;
        }
        this.success_stories = data;
        this.all_stories_tracker = this.success_stories;
        this.filtered_stories = this.success_stories;
      } catch (error) {
        console.log(error);
      }
    },

    /* fetch stories */
    async fetch_stories() {
      const cacheKey = "storiesCache";
      let stories_page = "";
      const cacheExpiry = 10 * 60 * 1000; // 10 minutes

      const cachedData = localStorage.getItem(cacheKey);
      const now = Date.now();

      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (now - timestamp < cacheExpiry) {
          //map data
          stories_page = data;
          return;
        }
      }

      try {
        const response = await fetch(success_stories_end_point);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData.data) {
          const dataArray = Array.isArray(responseData.data)
            ? responseData.data
            : [responseData.data];

          stories_page = dataArray;

          localStorage.setItem(
            cacheKey,
            JSON.stringify({
              data: dataArray,
              timestamp: now,
            })
          );
        } else {
          console.error("Invalid response structure:", responseData);
          if (cachedData) {
            console.log("Falling back to stale cache");
            const { data } = JSON.parse(cachedData);
            stories_page = data;
          }
        }

        console.log("Stories content", stories_page);
      } catch (error) {
        console.error("Error fetching resources:", error);
        if (cachedData) {
          console.log("Using cached data after error");
          const { data } = JSON.parse(cachedData);
          this.blogs = data;
        }
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
  async mounted() {
    this.page_is_loading = true;

    try {
      await Promise.all([
        await this.get_stories(),
        await this.get_services(),
        await this.fetch_stories(),
      ]);
      // await this.get_stories();
      // await this.get_services();
      // await this.fetch_stories();
    } catch (error) {
      console.error("Loading failed:", error);
    } finally {
      this.page_is_loading = false;
    }
  },
};
</script>
