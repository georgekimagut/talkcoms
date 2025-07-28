<template>
  <!-- load spinner before -->
  <Spinner v-if="page_is_loading" />
  <div v-if="page_is_loading === false" class="w-full">
    <Navbar :services="universal_services" :products="universal_products" />
    <!-- new hero -->
    <HeroSection
      v-for="(story, index) in stories_page.slice(0, 1)"
      :key="index"
      :small_title="story.companyName"
      :big_title="`${story?.description[0]?.children[0]?.text}`"
      hero_description=""
      :read_more_link="`/resources/${success_story}/${story.companyName}`"
      :hero_image="`${image_url}/${story?.image?.url}`"
      :hero_image_alt="`${story?.description[0]?.children[0]?.text} - Hero image`"
      is_story
    />
    <!-- end of hero -->
    <!-- story body -->
    <div class="w-full flex justify-center flex-wrap mt-16" id="stories">
      <div class="w-[90%]">
        <p class="text-secondary flex justify-center">STORIES</p>

        <h1 class="text-4xl font-bold mt-4 p-2 flex text-center">
          Stories from our clients
        </h1>
      </div>
      <div class="w-[90%] mt-8 flex overflow-x-scroll hide-scrollbar">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="mr-4 cursor-pointer rounded-full text-center py-2 flex flex-col justify-center px-4 border border-[#82bc00] text-sm flex-shrink-0"
          @click="change_category(index, service.id)"
          :class="service.active_category"
        >
          {{ service.name }}
        </div>
      </div>
      <div class="w-[90%] flex mt-16 hero-component">
        <div class="w-full flex flex-wrap hero-cards gap-4">
          <Card
            v-for="(story, index) in stories_page"
            :key="index"
            class="w-[32%] border-0 shadow-none bg-body rounded-md flex-shrink-0 to-full cursor-pointer duration-300 ease-in custom-card-hover"
          >
            <router-link
              :to="`/resources/${success_story}/${story.companyName}`"
              class="w-full flex-flex-wrap"
            >
              <CardHeader class="h-[40vh] p-0">
                <img
                  :src="`${image_url}/${story?.image?.url}`"
                  :alt="`${story?.description[0]?.children[0]?.text}`"
                  class="min-h-full h-full min-w-full w-auto max-w-none rounded-md"
                />
              </CardHeader>
              <CardTitle class="p-2 text-2xl text-default pt-2 font-bold">{{
                story.companyName
              }}</CardTitle>
              <CardDescription class="p-2">{{
                story?.description[0]?.children[0]?.text
              }}</CardDescription>
              <CardFooter>
                <div
                  class="flex flex-nowrap relative gap-2 text-secondary p-2 pb-4 h-[40px] flex-col justify-center read-more-hover"
                >
                  <div
                    class="h-[30px] w-[30px] absolute flex bg-transparent border-2 rounded-full border-[#82bc00] duration-300 ease-in-out to-cover"
                  >
                    <div class="h-full flex-col justify-center">
                      <i
                        class="fa-solid fa-arrow-right ml-[6px] text-secondary duration-300 ease-in-out"
                      ></i>
                    </div>
                  </div>

                  <span class="font-semibold ml-[35px]">Read More</span>
                </div>
              </CardFooter>
            </router-link>
          </Card>
        </div>
      </div>
    </div>
    <!-- footer -->
    <Footer :services="universal_services" :products="universal_products" />
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
import { baseUrl, success_stories_end_point } from "@/store/store";
import { universal_content } from "@/store/contentStore";
import { CardDescription } from "@/components/ui/card";

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
      universal_services: [],
      universal_products: [],
      stories_page: [],
      image_url: baseUrl,
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

          this.stories_page = dataArray;
        } else {
          console.error("Invalid response structure:", responseData);
        }

        console.log("Stories content", this.stories_page);
      } catch (error) {
        console.error("Error fetching resources:", error);
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
  async created() {
    document.title = "Talkcoms | Success stories";
    this.page_is_loading = true;
    this.universal_services = universal_content().services;
    this.universal_products = universal_content().products;

    try {
      await Promise.all([
        await this.get_stories(),
        await this.get_services(),
        await this.fetch_stories(),
      ]);
    } catch (error) {
      console.error("Loading failed:", error);
    } finally {
      this.page_is_loading = false;
    }
  },
};
</script>
