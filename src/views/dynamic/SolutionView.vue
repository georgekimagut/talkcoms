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
      :key="index"
      :small_title="this.id"
      :big_title="industry_solution[0]?.secondary_title"
      :hero_description="industry_solution[0]?.description_title"
      :read_more_link="`/demo/${this.id}`"
      :hero_image="`${image_url}/${
        industry_solution[0]?.formats?.large?.url ||
        industry_solution[0].hero_image?.url
      }`"
      is_industry
    />

    <!-- advantages section -->
    <div class="w-full flex justify-center mt-10 hero-component">
      <div class="w-[90%] flex flex-wrap relative hero-holder">
        <!-- Sticky sidebar -->
        <div class="w-[40%] sticky top-[15vh] self-start to-full">
          <div
            class="w-full overflow-hidden rounded-xl h-[80vh] to-h-fit hide-im"
          >
            <img
              :src="`${image_url}/${
                industry_solution[0]?.image?.formats?.large?.url ||
                industry_solution[0].image?.url
              }`"
              :alt="industry_solution[0]?.secondary_title"
              class="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        <!-- Scrollable content -->
        <div class="w-[60%] flex justify-end to-full autoShow">
          <div
            class="w-[80%] overflow-hidden transition-all duration-500 relative flex flex-col justify-center to-full"
          >
            <p class="text-secondary text-xl uppercase">Who we serve</p>
            <!-- <h1 class="text-5xl font-extrabold text-default sticky top-0 py-4">
              
            </h1> -->
            <div
              v-for="(who_is_served, index) in industry_solution[0].whoweserve"
              :key="index"
              class="w-[90%] py-1 border-b border-[#e3e3e3] flex flex-nowrap"
            >
              <i class="fa-solid fa-circle-check text-default mt-4 text-xl"></i>
              <p class="mt-4 ml-[5px]">
                <span></span>{{ who_is_served?.title }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- solutions -->
    <div class="w-full flex justify-center mt-10 bg-white py-16 hero-component">
      <div
        class="w-[90%] flex justify-center flex-wrap gap-2 hero-cards to-full"
      >
        <!-- solutions related -->
        <div
          v-for="(who_is_served, index) in industry_solution[0]?.cardbyindustry"
          :key="index"
          class="w-[24%] bg-body p-4 pb-16 flex-shrink-0 to-full duration-300 ease-in-out custom-card-hover to-full"
        >
          <router-link :to="`/service/${who_is_served?.title}`" class="w-full">
            <img
              :src="
                who_is_served?.icon?.url
                  ? `${image_url}/${who_is_served.icon.url}`
                  : '/icons/erp.svg'
              "
              class="h-[50px] w-auto"
            />

            <h1 class="text-xl font-bold mt-8">
              {{ who_is_served?.title }}
            </h1>
            <p class="mt-8">{{ who_is_served?.description }}</p>
          </router-link>
        </div>
        <!-- end of new -->
        <IconCard
          v-if="related_solutions.length >= 1"
          v-for="(related_solution, index) in related_solutions"
          :key="index"
          card_class="w-[24%] flex-shrink-0 to-full hover:shadow-md"
          :icon_class="related_solution.icon"
          :card_title="related_solution.name"
          :card_text="related_solution.title_description"
        />
      </div>
    </div>
    <!-- call to action -->
    <div class="w-full flex justify-center bg-white pb-20 has_demo">
      <div
        class="w-[80%] flex rounded-2xl h-[65vh] bg-[linear-gradient(to_top_right,_#007cba_75%,_#82bc00_110%)] mt-10 overflow-hidden"
      >
        <div class="w-1/2 h-full overflow-hidden img-holder relative p-8">
          <div
            class="w-[75%] h-[35vh] mt-[15vh] bg-[linear-gradient(to_top_right,_#82bc00_-10%,_#007cba_110%)] rounded-lg"
          ></div>
          <img
            src="/static/faqs-banner-big.png"
            class="object-cover absolute top-[10vh] left-[10%] w-[80%] rounded-lg h-[40vh]"
          />
        </div>
        <div
          class="w-1/2 mr-[1%] h-full p-4 flex flex-col justify-center to-full"
        >
          <h1 class="m-4 text-white text-5xl font-extrabold">
            Experience the Power—Live!
          </h1>
          <p class="text-xl m-4 text-white">
            Get in touch and see how our solution can simplify your workflow and
            boost efficiency-live and personalised.
          </p>

          <router-link to="/contact/contact-us"
            ><Button
              variant="ghost"
              class="ml-4 relative overflow-hidden p-6 px-8 text-secondary cursor-pointer group bg-white"
            >
              <span class="relative z-10">Book A Call </span>
              <span
                class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
              ></span> </Button
          ></router-link>
        </div>
      </div>
    </div>
    <!-- case study -->
    <div
      v-if="related_story"
      class="w-full flex justify-center mt-16 bg-white py-16 hero-component"
    >
      <div class="w-[90%] h-fit flex hero-holder">
        <div class="w-1/2 flex h-full justify-center to-full">
          <div class="w-[90%] flex flex-wrap justify-center">
            <div
              class="w-[80%] max-h-[50vh] rounded-2xl flex justify-center overflow-hidden to-full"
            >
              <img
                :src="`${image_url}/${related_story?.image?.url}`"
                :alt="`${related_story?.title} - related story image`"
                class="h-full max-w-none min-w-full min-h-full max-h-none object-cover"
              />
            </div>
          </div>
        </div>
        <div class="w-1/2 to-full">
          <div class="w-[90%] mt-6">
            <h1 class="text-5xl font-bold mt-4 text-default">
              {{ related_story?.title }}
            </h1>
            <p class="mt-4 text-xl">{{ related_story.companyName }}</p>

            <div
              class="w-full h-[26px] flex flex-col justify-center mt-10 to-next-line"
            >
              <p
                class="mt-2 p-1 px-2 border border-[#007cba] rounded-full w-fit"
              >
                {{ this.id }}
              </p>
            </div>
          </div>
          <div class="w-full mt-10 flex">
            <router-link
              :to="`/resources/${success_story}/${related_story.title}`"
              ><Button
                variant="ghost"
                class="relative overflow-hidden p-6 px-8 text-secondary cursor-pointer group border border-[#82bc00]"
              >
                <span class="relative z-10 hover:text-[#131f6b]"
                  >Read Full Story
                </span>
                <span
                  class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                ></span> </Button
            ></router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- footer and cta -->
    <Cta
      :service_cta="industry_solution[0].footer"
      :service_cta_description="industry_solution[0].footer_description"
    />
    <Footer :services="universal_services" :products="universal_products" />
  </div>
</template>
<script>
//new imports
import Spinner from "@/components/general/Spinner.vue";
import Navbar from "@/components/general/Navbar.vue";
// import SmallTitle from "@/components/text/SmallTitle.vue";
// import BigTitle from "@/components/text/BigTitle.vue";
import Footer from "@/components/general/Footer.vue";
import Cta from "@/components/general/Cta.vue";
import IconCard from "@/components/ui/card/IconCard.vue";
import HeroSection from "@/components/general/HeroSection.vue";
import { universal_content } from "@/store/contentStore";
import { baseUrl } from "@/store/store";

export default {
  name: "SolutionView",
  props: ["id"],
  components: {
    Spinner,
    Navbar,
    // SmallTitle,
    // BigTitle,
    Footer,
    Cta,
    IconCard,
    HeroSection,
  },
  data() {
    return {
      page_is_loading: true,
      related_story: [],
      success_story: "story",
      universal_services: [],
      universal_products: [],
      industry_solution: [],
      related_solutions: [],
      universal_industries: [],
      image_url: baseUrl,
      encoded_success_title: "",
    };
  },
  async created() {
    document.title = `Talkcoms | ${this.id}`;
    this.page_is_loading = true;
    this.universal_services = universal_content().services;
    this.universal_products = universal_content().products;
    this.universal_industries = universal_content().industries;

    try {
      await Promise.all([this.fetch_industry()]);
    } catch (error) {
      console.log("Loading error:", error);
    } finally {
      this.page_is_loading = false;
    }

    //watch route changes
    this.$watch(
      () => this.$route.params,
      async () => {
        document.title = `Talkcoms | ${this.id}`;
        this.page_is_loading = true;
        this.universal_services = universal_content().services;
        this.universal_products = universal_content().products;
        this.universal_industries = universal_content().industries;

        try {
          // await this.get_solution();
          await Promise.all([this.fetch_industry()]);
        } catch (error) {
          console.error("Loading failed:", error);
        } finally {
          this.page_is_loading = false;
        }
      }
    );
  },
  methods: {
    /* fetch industry */
    async fetch_industry() {
      const encoded_title = encodeURIComponent(this.id);
      try {
        const response = await fetch(
          `${baseUrl}/api/industries/?filters[main_title][$eq]=${encoded_title}&populate=*`
        );
        const responseData = await response.json();
        if (responseData.data) {
          const dataArray = Array.isArray(responseData.data)
            ? responseData.data
            : [responseData.data];
          // const fetched_industries = dataArray;
          this.industry_solution = dataArray;
          // Get the first success_stories title
          const stories = this.industry_solution[0].success_stories;
          if (Array.isArray(stories) && stories.length > 0) {
            this.encoded_success_title = encodeURIComponent(
              stories[0]?.title || ""
            );
          }
          console.log("Story title: ", this.encoded_success_title);
          this.fetch_related_story();
        } else {
          console.error("Invalid industry response structure: ", responseData);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    },
    /* fetch story */
    async fetch_related_story() {
      try {
        const response = await fetch(
          `${baseUrl}/api/success-stories/?filters[title][$eq]=${this.encoded_success_title}&populate=*`
        );
        const responseData = await response.json();
        if (responseData.data) {
          console.log("Json data for service names: ", responseData.data);

          const dataArray = Array.isArray(responseData.data)
            ? responseData.data
            : [responseData.data];

          this.related_story = dataArray[0];
        } else {
          console.error("Invalid response structure: ", responseData);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    },
  },
};
</script>
