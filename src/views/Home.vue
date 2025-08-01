<template>
  <Spinner v-if="page_is_loading" />
  <div v-if="page_is_loading === false" class="w-full">
    <Navbar
      :services="universal_services"
      :products="universal_products"
      :industries="universal_industries"
    />
    <!-- new hero section -->
    <div class="w-full h-[80vh] flex relative new-hero">
      <div
        class="w-3/4 h-full absolute bg-linear-secondary z-[10] opacity-80 to-full"
      >
        <!-- background -->
      </div>
      <div class="w-full h-full absolute overflow-hidden">
        <!-- Shimmer Placeholder -->
        <div
          v-if="!imageLoaded"
          class="absolute inset-0 bg-gray-200 opacity-50 animate-shimmer"
        ></div>

        <!-- Actual Image -->
        <img
          v-show="imageLoaded"
          src="/static/hero-pic.png"
          alt="Talkcoms limited hero image"
          @load="onImageLoad"
          class="w-full h-auto max-h-none object-cover transition-opacity duration-500"
        />
      </div>
      <!-- front panel -->
      <div class="w-full h-full absolute z-[20] flex content-holder">
        <div class="w-[35%] ml-[5%] flex flex-col py-4 justify-center to-full">
          <h1 class="text-4xl font-extrabold text-white">
            Powering Digital Transformation Across Finance, Healthcare, Legal
            Sectors & Other Industries
          </h1>
          <h2 class="font-semibold text-secondary mt-8 text-xl">
            Talkcoms is a Leading IT Solutions Provider Incorporated in the UK
            in 2016.
          </h2>
          <router-link to="/about" class="mt-4">
            <Button
              class="relative bg-third overflow-hidden p-6 px-10 text-white cursor-pointer group"
            >
              <span class="relative z-10">Go to about </span>
              <span
                class="absolute inset-0 bg-default transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
              ></span>
            </Button>
          </router-link>
        </div>
      </div>
      <!-- center pattern -->
      <div class="w-full h-[60vh] absolute z-[15] overflow-hidden">
        <div class="absolute w-fit h-full flex flex-col justify-end ml-[47%]">
          <div
            v-for="index in 6"
            :key="index"
            class="w-full h-[45px] flex flex-row gap-6"
          >
            <div
              v-for="index in 6"
              :key="index"
              class="w-[5px] h-[5px] rounded-full bg-third"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <!-- hero section -->
    <!-- <div class="w-full">{{ services }}</div> -->
    <div class="w-full h-[90vh] hero bg-fourth overflow-show pt-[3vh]">
      <div class="w-full h-full flex flex-wrap justify-center overflow-hidden">
        <div class="w-[90%] flex flex-wrap mt-8 relative overflow-hidden">
          <!-- {{ services.services }} -->

          <div
            class="h-[70vh] w-full flex overflow-y-hidden hero-inner hide-scrollbar overflow-x-scroll snap-x snap-mandatory"
          >
            <div
              v-for="(slide, index) in services.services"
              :key="index"
              @mouseenter="pauseAutoSlide()"
              @mouseleave="resumeAutoSlide()"
              class="w-full flex-shrink-0 h-full transition-transform duration-500 ease-in-out snap-center"
              :style="{ transform: `translateX(-${current_slide * 100}%)` }"
            >
              <!-- {{ slide.hero_media }} -->
              <div class="carousel-holder flex flex-nowrap w-full h-[60vh]">
                <div class="w-full flex-shrink-0 h-full flex">
                  <div
                    class="w-1/2 h-full flex flex-col justify-center block c-half"
                  >
                    <p class="text-lg w-3/4 uppercase text-xl font-bold">
                      {{ slide.product_name }}
                    </p>
                    <h1
                      class="text-4xl font-extrabold mt-6 w-3/4 text-secondary"
                    >
                      {{ slide.main_title }}
                    </h1>
                    <p class="w-3/4 mt-6 description text-xl">
                      {{ slide.second_title }}
                    </p>
                    <div class="w-full flex mt-10 btn-holder">
                      <router-link to="/contact/contact-us">
                        <Button
                          class="relative overflow-hidden p-6 px-8 bg-default text-white cursor-pointer group"
                        >
                          <span class="relative z-10">Talk to Sales</span>
                          <span
                            class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                          ></span>
                        </Button>
                      </router-link>
                      <router-link
                        :to="`/service/${slide.main_title}`"
                        class="ml-4"
                      >
                        <Button
                          variant="ghost"
                          class="relative overflow-hidden p-6 px-8 text-secondary cursor-pointer group border border-[#82bc00]"
                        >
                          <span class="relative z-10 hover:text-[#131f6b]"
                            >Learn More
                          </span>
                          <span
                            class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                          ></span>
                        </Button>
                      </router-link>
                    </div>
                  </div>
                  <div class="w-1/2 h-full c-half">
                    <div class="w-full h-full relative">
                      <div
                        class="img-holder h-[60vh] overflow-hidden rounded-2xl"
                      >
                        <!-- Shimmer Placeholder -->
                        <div
                          v-if="!imageLoaded"
                          class="absolute inset-0 bg-gray-200 opacity-50 animate-shimmer"
                        ></div>

                        <!-- Actual Image -->
                        <img
                          v-show="imageLoaded"
                          :src="`${image_url}/${
                            slide.hero_media?.formats?.large?.url ||
                            slide.hero_media?.url
                          }`"
                          :alt="`${slide.product_name} - image`"
                          @load="onImageLoad"
                          class="rounded-2xl min-w-full min-h-full max-h-none object-cover transition-opacity duration-500"
                        />
                        <!-- <img
                          v-lazy="
                            `${image_url}/${
                              slide.hero_media?.formats?.large?.url ||
                              slide.hero_media?.url
                            }`
                          "
                          :alt="`${slide.product_name} - image`"
                          class="rounded-2xl min-w-full min-h-full max-h-none object-cover"
                        /> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-full flex justify-center gap-1 mt-4"
          @mouseenter="pauseAutoSlide()"
          @mouseleave="resumeAutoSlide()"
        >
          <div
            v-for="(item, index) in services.services"
            :key="index"
            @click="current_slide = index"
            class="w-[16px] h-[16px] rounded-full cursor-pointer"
            :class="current_slide === index ? 'bg-default' : 'bg-gray-400'"
          ></div>
        </div>
      </div>
    </div>
    <!-- end -->
    <!-- success stories  -->
    <div class="w-full flex flex-wrap justify-center overflow-hidden py-16">
      <div class="w-[90%] flex justify-center flex-wrap gap-1 hero-component">
        <div class="w-full">
          <p class="text-secondary text-center text-lg">
            <router-link to="/success-stories">SUCCESS STORIES</router-link>
          </p>

          <h1 class="text-5xl font-extrabold mt-4 p-2 text-center text-default">
            Success Stories from our clients
          </h1>
        </div>
        <div
          class="w-full flex flex-nowrap mt-10 overflow-scroll hide-scrollbar stories snap-x snap-mandatory gap-4 hero-cards"
        >
          <Card
            v-for="(item, index) in portfolio"
            :key="index"
            class="w-[32%] mb-4 border-0 shadow-none rounded-none bg-body overflow-hidden flex-shrink-0 to-full duration-300 ease-in custom-card-hover snap-center"
            :class="
              index === 0
                ? 'bg-secondary'
                : index === 1
                ? 'bg-third'
                : 'bg-default'
            "
          >
            <CardHeader class="h-[30vh] p-0 overflow-hidden">
              <!-- Shimmer Placeholder -->
              <div
                v-if="!imageLoaded"
                class="absolute inset-0 bg-gray-200 opacity-50 animate-shimmer"
              ></div>

              <!-- Actual Image -->
              <img
                v-show="imageLoaded"
                :src="`${image_url}/${
                  item?.image?.formats?.large?.url || item.image?.url
                }`"
                :alt="item?.projectDescription[0]?.children[0]?.text"
                @load="onImageLoad"
                class="w-full h-auto max-h-none object-cover transition-opacity duration-500"
              />
              <!-- <img :src="item.pic" class="w-full h-auto max-h-none" /> -->
            </CardHeader>
            <div class="w-full flex flex-wrap justify-center mt-6">
              <div class="w-[60%] flex justify-center">
                <img
                  :src="`${image_url}/${
                    item?.logo?.formats?.large?.url || item.logo?.url
                  }`"
                  :alt="item?.companyName"
                  class="h-[70px] w-auto max-w-none object-cover"
                />
              </div>
              <div class="w-[90%] text-white mt-4 pb-4">
                <p class="text-center w-full">
                  {{ item?.projectDescription[0]?.children[0]?.text }}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
    <!-- end -->
    <!-- industry -->
    <div
      class="w-full flex justify-center mt-8 pt-10 pb-32 bg-fourth border border-[#9ecce4] rounded-lg"
    >
      <div class="w-[90%]">
        <div class="w-full">
          <h1 class="text-5xl font-extrabold mt-10 text-center text-default">
            Select your industry. Discover our impact.
          </h1>
        </div>
        <!-- {{ industries }} -->
        <div class="w-full flex flex-wrap mt-16 w730">
          <div
            v-for="(industry, index) in industries"
            :key="index"
            class="industry-card w-[49%] ml-[1%] flex flex-nowrap cursor-pointer pt-3 pb-3 px-2 ease-in-out border-b border-[#dfdfdf] hover:bg-white c-half"
          >
            <router-link
              :to="`/solution/${industry?.main_title}`"
              class="w-full flex"
              ><div class="w-[90%] flex flex-nowrap">
                <div class="w-[20px]">
                  <img
                    src="/icons/next.png"
                    class="mt-2 w-[30px]"
                    alt="Industry icon"
                  />
                </div>

                <p class="ml-4 text-2xl">{{ industry?.main_title }}</p>
              </div>
              <div class="w-[10%] flex justify-end">
                <i
                  class="fa-solid fa-arrow-right mr-6 opacity-0 mt-2 text-xl text-default"
                ></i>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- partners/companies -->
    <Partners class="mt-0" />
    <!-- blogs -->
    <!-- blogs -->
    <div
      class="w-full flex justify-center flex-wrap mt-10 p-4 pb-20 hero-component"
    >
      <div class="w-[90%]">
        <p class="text-secondary w-full flex justify-center">
          <router-link to="/blogs" class="text-lg">BLOG</router-link>
        </p>
        <h1 class="text-3xl font-extrabold mt-3 w-full flex justify-center">
          Tech <span class="text-secondary mx-1">Tips</span> &
          <span class="text-secondary mx-1">Trends</span>
        </h1>
      </div>
      <div
        class="w-full flex gap-4 mt-8 flex-nowrap pb-4 overflow-x-scroll hide-scrollbar snap-x snap-mandatory hero-cards"
      >
        <Card
          v-for="(blog, index) in blogs"
          :key="index"
          class="w-[32%] border-0 shadow-none bg-body rounded-md flex-shrink-0 to-full cursor-pointer duration-300 ease-in custom-card-hover snap-center"
        >
          <router-link
            :to="`/resources/${is_blog}/${blog.slug}`"
            class="w-full flex-flex-wrap"
          >
            <CardHeader class="h-[40vh] p-0">
              <!-- Shimmer Placeholder -->
              <div
                v-if="!imageLoaded"
                class="absolute inset-0 bg-gray-200 opacity-50 animate-shimmer"
              ></div>

              <!-- Actual Image -->
              <img
                v-show="imageLoaded"
                :src="`${image_url}/${
                  blog.hero_media?.formats?.large?.url || blog.hero_media?.url
                }`"
                :alt="blog.Title"
                @load="onImageLoad"
                class="min-h-full h-full min-w-full w-auto max-w-none rounded-md object-cover transition-opacity duration-500"
              />
            </CardHeader>
            <CardTitle class="p-2 text-2xl text-default pt-2 font-bold">{{
              blog.Title
            }}</CardTitle>
            <div class="w-full p-2"></div>
            <div class="w-full p-2 flex">
              <div class="w-1/2">
                <p class="font-bold text-sm text-gray-500">
                  Author: {{ blog.author }}
                </p>
              </div>
              <div
                class="w-1/2 flex justify-end font-bold text-sm text-gray-500"
              >
                {{ blog.category ? blog.category : blog.Type }}/
                {{ format_date(blog.createdAt) }}
              </div>
            </div>
            <div
              class="text-base text-gray-800 [&_*]:!m-0 [&_*]:!mt-0 [&_*]:!mb-0 [&_*]:!p-0 [&_*]:!font-normal [&_*]:!text-inherit [&_*]:!text-base [&_*]:!bg-transparent [&_*]:!border-none [&_*]:!shadow-none !p-2"
              v-html="
                blog.articles_section
                  .replace(/<br\s*\/?>/gi, '')
                  .substring(blog.articles_section.indexOf('.') + 1)
                  .trim()
                  .split(' ')
                  .slice(0, 15)
                  .join(' ') + '...'
              "
            ></div>
            <!-- <div class="w-full">{{ blog.articles_section }}</div> -->
            <CardFooter>
              <div
                class="flex flex-nowrap relative gap-2 text-secondary p-2 h-[40px] flex-col justify-center read-more-hover"
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
    <!-- cta -->
    <Cta />
    <!-- footer -->
    <Footer :services="universal_services" :products="universal_products" />
    <!-- end of classes -->
  </div>
</template>
<script>
import Cta from "@/components/general/Cta.vue";
import Footer from "@/components/general/Footer.vue";
import Navbar from "@/components/general/Navbar.vue";
import Partners from "@/components/general/Partners.vue";
import Spinner from "@/components/general/Spinner.vue";
import ExternalLink from "@/components/text/ExternalLink.vue";
// import CardDescription from "@/components/ui/card/CardDescription.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CustomCard from "@/components/ui/card/CustomCard.vue";
import {
  apiEndpoint,
  baseUrl,
  home_end_point,
  portfolio_end_point,
  home_services_end_point,
  industries_end_point,
} from "@/store/store.js";
/* global values */
import { universal_content } from "@/store/contentStore";

export default {
  name: "Home",
  components: {
    Navbar,
    Spinner,
    CustomCard,
    ExternalLink,
    Partners,
    Cta,
    Footer,
  },
  data() {
    return {
      //spinner
      page_is_loading: true,
      current_slide: 0,
      total_slides: "", // Number of slides
      imageLoaded: false,
      /* pause on hover */
      interval: null,
      isPaused: false,
      //service carousel
      // success_story: "story",
      is_blog: "blog",
      image_url: baseUrl,
      carousel_data: [],
      // home_services: [],
      portfolio_items: [],
      success_stories: [],
      blogs: [],
      landing_page_content: [],
      industries: [],
      services: [],
      universal_services: [],
      universal_products: [],
      universal_industries: [],
      products: [],
      // service_in_view: 0,
      portfolio: [],
    };
  },
  async created() {
    document.title = "Talkcoms | Stay Connected";
    this.page_is_loading = true;
    try {
      await Promise.all([
        this.fetch_homepage(),
        this.fetch_blogs(),
        this.fetch_service_names(),
        this.fetch_service_carousel(),
        this.fetch_industry_names(),
        this.fetch_portfolios(),
      ]);
    } catch (error) {
      console.error("Loading failed:", error);
    } finally {
      this.page_is_loading = false;
      this.startAutoSlide();
    }
  },
  methods: {
    /* toggle service */
    toggle_service(index) {
      this.service_in_view = index;
    },
    startAutoSlide() {
      this.interval = setInterval(() => {
        if (!this.isPaused) {
          this.nextSlide();
          this.nextServiceSlide();
        }
      }, 15000); // 30 seconds
    },
    pauseAutoSlide() {
      this.isPaused = true;
    },
    resumeAutoSlide() {
      this.isPaused = false;
    },

    nextSlide() {
      if (this.current_slide < this.total_slides - 1) {
        this.current_slide++;
      } else {
        this.current_slide = 0; // Loop back to first
      }
    },
    prevSlide() {
      if (this.current_slide > 0) {
        this.current_slide--;
      }
    },
    // nextServiceSlide() {
    //   if (this.current_service_slide < this.total_service_slides - 1) {
    //     this.current_service_slide++;
    //   }
    // },
    // prevServiceSlide() {
    //   if (this.current_service_slide > 0) {
    //     this.current_service_slide--;
    //   } else {
    //     this.current_service_slide = this.total_service_slides - 1;
    //   }
    // },
    //fetch home
    async fetch_homepage() {
      try {
        const response = await fetch(home_end_point);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData.data) {
          const dataArray = Array.isArray(responseData.data)
            ? responseData.data
            : [responseData.data];

          // this.landing_page_content = dataArray;
          this.landing_page_content = dataArray;
        } else {
          console.error("Invalid response structure:", responseData);
        }

        console.log("Home content", this.landing_page_content);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    },
    /* fetch home service carousel */
    async fetch_service_carousel() {
      try {
        const response = await fetch(home_services_end_point);

        const responseData = await response.json();
        if (responseData.data) {
          const fetched_carousel = responseData.data;
          this.services = fetched_carousel[0];
          this.total_slides = this.services.services.length;
        }
      } catch (error) {
        console.error("Error fecthing carousel: ", error);
      }
    },

    /* fetch services */
    async fetch_service_names() {
      try {
        const response = await fetch(
          "https://cms.talkcoms.co.uk/api/service-pages/?fields[0]=product_name&fields[1]=is_product"
        );
        const responseData = await response.json();
        if (responseData.data) {
          console.log("Json data for service names: ", responseData.data);

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
    /* fetch portfolio*/
    async fetch_portfolios() {
      try {
        const response = await fetch(portfolio_end_point);
        const responseData = await response.json();
        if (responseData.data) {
          console.log("Json data for service names: ", responseData.data);

          const dataArray = Array.isArray(responseData.data)
            ? responseData.data
            : [responseData.data];
          this.portfolio = dataArray;
          console.log("Portfolios: ", this.portfolio);
        } else {
          console.error(
            "Invalide portfolio response structure: ",
            responseData
          );
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    },
    /* fetch industry names */
    async fetch_industry_names() {
      try {
        const response = await fetch(industries_end_point);
        const responseData = await response.json();
        if (responseData.data) {
          console.log("Json data for service names: ", responseData.data);

          const dataArray = Array.isArray(responseData.data)
            ? responseData.data
            : [responseData.data];
          const fetched_industries = dataArray;
          this.industries = dataArray;
          /* store industry universally */
          fetched_industries.forEach((item) => {
            this.universal_industries.push({ main_title: item.main_title });

            const contentStore = universal_content();
            contentStore.setIndustries(this.universal_industries);
            console.log("Industries: ", this.universal_industries);
          });
        } else {
          console.error("Invalide industry response structure: ", responseData);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    },
    //GET BLOGS
    async fetch_blogs() {
      try {
        const response = await fetch(apiEndpoint + "3");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData.data) {
          const dataArray = Array.isArray(responseData.data)
            ? responseData.data
            : [responseData.data];

          this.blogs = dataArray;
          this.blogs.forEach((blog) => {
            // console.log(blog.articles_section);
            const word_count = blog.articles_section.split(" ");
            console.log(word_count.filter((word) => word !== " ").length);
          });
        } else {
          console.error("Invalid response structure:", responseData);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    },

    /* dae formate */
    format_date(date_to_change) {
      const date = new Date(date_to_change);
      const date_options = { month: "long", day: "numeric", year: "numeric" };
      return date.toLocaleDateString("en-US", date_options);
    },
    // load image animation
    onImageLoad() {
      this.imageLoaded = true;
    },
  },
};
</script>
