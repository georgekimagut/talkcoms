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
      small_title="ABOUT US"
      :big_title="about_page[0].title"
      hero_description="Talkcoms is a Leading IT Solutions Provider Incorporated in the UK in 2016."
      hero_image="/static/pic-3.png"
      hero_small_image="/static/about-us.png"
      hero_image_alt="About us - Talkcoms is a Leading IT Solutions Provider Incorporated in the UK in 2016. "
      has_pattern
    />
    <!-- main about us -->
    <div class="w-full flex justify-center mt-20 pb-20">
      <div class="w-[90%] flex justify-center about-page">
        <div class="w-1/2 to-full">
          <p class="text-secondary">OUR STORY</p>
          <h1 class="text-4xl font-bold mt-4 p-2">
            Leading IT
            <span class="text-secondary mr-2 ml-2">Solutions</span> Provider
            since 2016
          </h1>
          <div class="w-full mt-6">
            <!-- <p class="mt-2">
              {{ about_page[0].aboutstatement[0] }}
            </p> -->
            <div v-for="content in about_page" class="w-full">
              <div v-for="child in content.aboutstatement">
                <div v-for="inner in child.children" v-html="inner.text"></div>
              </div>
            </div>

            <!-- mission -->
            <div class="flex w-full mt-8 about-card">
              <div class="w-[80px] min-w-[80px]">
                <div class="w-[60px] h-[60px] relative">
                  <div
                    class="h-full w-full absolute bg-secondary rounded-full"
                  ></div>
                  <div class="absolute z-10 h-full w-full flex justify-center">
                    <div class="h-full flex flex-col justify-center">
                      <span class="font-bold text-2xl text-white">
                        <i class="fa-solid fa-bullseye"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-[70%] to-full">
                <h1 class="text-xl font-semibold">Mission</h1>
                <p class="mt-2">
                  {{ about_page[0].mission[0].children[0].text }}
                </p>
              </div>
            </div>
            <!-- vision -->
            <div class="flex w-full mt-8 about-card">
              <div class="w-[80px] min-w-[80px]">
                <div class="w-[60px] h-[60px] relative">
                  <div
                    class="h-full w-full absolute bg-secondary rounded-full"
                  ></div>
                  <div class="absolute z-10 h-full w-full flex justify-center">
                    <div class="h-full flex flex-col justify-center">
                      <span class="font-bold text-2xl text-white">
                        <i class="fa-solid fa-eye"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-[70%] to-full">
                <h1 class="text-xl font-semibold">Vision</h1>
                <p class="mt-2">
                  {{ about_page[0].vision[0].children[0].text }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/2 flex justify-center to-full">
          <div
            class="w-[80%] to-full flex justify-center overflow-hidden h-full rounded-2xl"
          >
            <img
              src="/static/why.png"
              class="h-full max-w-none min-w-full min-h-full max-h-none object-cover"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- {{ about_page[0].company_status?.clients }} -->
    <Partners
      has_numbers
      :projects="about_page[0].company_status?.complete_projects"
      :members="about_page[0].company_status?.team_members"
      :reviews="about_page[0].company_status?.reviews"
      :clients="about_page[0].company_status?.clients"
    />
    <!-- values -->
    <div class="w-full flex flex-wrap justify-center overflow-hidden mt-20">
      <div class="w-[90%] flex justify-center flex-wrap about-page">
        <div class="w-full">
          <p class="w-full text-secondary text-center">
            <router-link to="#">OUR VALUES</router-link>
          </p>

          <h1 class="text-4xl font-bold mt-4 text-center">
            The fundamental principles guiding our agency
          </h1>
        </div>
        <div class="w-full flex justify-center mt-16 about-page">
          <div class="w-1/2 flex justify-center to-full">
            <div
              class="w-[60%] flex justify-center overflow-hidden h-full rounded-2xl to-full"
            >
              <img
                src="/static/values.png"
                class="h-full max-w-none min-w-full min-h-full max-h-none object-cover"
              />
            </div>
          </div>
          <div class="w-1/2 to-full">
            <div
              v-for="(value, index) in about_page[0].ourValues"
              :key="index"
              class="flex w-full mt-8 about-card"
            >
              <div class="w-[80px] min-w-[80px]">
                <div class="w-[60px] h-[60px] relative">
                  <div
                    class="h-full w-full absolute bg-secondary rounded-full"
                  ></div>
                  <div class="absolute z-10 h-full w-full flex justify-center">
                    <div class="h-full flex flex-col justify-center">
                      <span class="font-bold text-2xl text-white">
                        <i class="fa-solid fa-handshake"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-[70%] to-full">
                <h1 class="text-xl font-semibold">
                  {{ value?.title }}
                </h1>
                <p class="mt-2">
                  {{ value?.content[0]?.children[0]?.text }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- solutions, what we offer -->
    <div class="w-full bg-white mt-20 p-4 pb-20 flex justify-center">
      <div class="w-[90%]">
        <div class="w-full flex">
          <div class="w-full flex justify-center flex-wrap">
            <p class="text-secondary text-center w-full mt-6">SOLUTIONS</p>
            <h1
              class="text-4xl font-extrabold text-default mt-4 text-center w-full"
            >
              What We Offer
            </h1>
          </div>
        </div>
        <!-- the services -->
        <div class="w-full flex justify-center mt-10 bg-white hero-component">
          <div class="w-full flex flex-wrap gap-4 hero-cards to-full">
            <div
              v-for="(solution, index) in solutions"
              :key="index"
              class="w-[24%] bg-body p-4 pb-16 flex-shrink-0 to-full duration-300 ease-in-out custom-card-hover to-full"
            >
              <router-link
                :to="`/service/${solution.product_name}`"
                class="w-full"
              >
                <img
                  :src="`${image_url}/${solution.icon?.url}`"
                  class="h-[50px] w-auto"
                />
                <h1 class="text-xl font-bold mt-8">
                  {{ solution.product_name }}
                </h1>
                <p class="mt-8">{{ solution.main_title }}</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- location -->
    <div class="w-full flex justify-center py-20 bg-fourth">
      <div class="w-[90%] flex flex-wrap about-page">
        <div class="w-full">
          <p class="text-secondary text-center w-full">OFFICES</p>
          <h1
            class="text-4xl font-extrabold text-default mt-4 text-center w-full"
          >
            Where to Find Us
          </h1>
        </div>
        <div class="mt-10 w-full h-[50vh]">
          <Maps map_class="w-full h-full" />
        </div>
        <div class="w-full flex flex-nowrap mt-10 gap-6 about-page">
          <div
            v-for="(office, index) in offices"
            :key="index"
            class="w-[33%] p-4 to-full"
          >
            <h1 class="text-2xl font-bold text-secondary">{{ office.name }}</h1>
            <p class="mt-8 text-xl">{{ office.location }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- CTA -->

    <Cta />
    <Footer :services="universal_services" :products="universal_products" />
  </div>
</template>
<script>
import Cta from "@/components/general/Cta.vue";
import Footer from "@/components/general/Footer.vue";
import HeroSection from "@/components/general/HeroSection.vue";
import Maps from "@/components/general/Maps.vue";
import Navbar from "@/components/general/Navbar.vue";
import Partners from "@/components/general/Partners.vue";
import Spinner from "@/components/general/Spinner.vue";
import { about_end_point, baseUrl } from "@/store/store";
import { universal_content } from "@/store/contentStore";

// const store = universal_content();

export default {
  name: "About",
  components: {
    Spinner,
    HeroSection,
    Navbar,
    Cta,
    Footer,
    Partners,
    Maps,
  },
  data() {
    return {
      page_is_loading: true,
      about_page: [],
      image_url: baseUrl,
      values: [],
      solutions: [],
      universal_services: [],
      universal_products: [],
      universal_industries: [],
      offices: [
        {
          name: "United Kingdom",
          location:
            "The Kings Centre Main Road, Barleythorpe Oakham, LE15 7WD, United Kingdom",
        },
        {
          name: "Nairobi",
          location:
            "Great Jubilee Center ( The Well), Karen, Nairobi 1’st Floor Unit No. 07, Kenya",
        },
        {
          name: "Edama Ravine",
          location:
            "3rd Floor, Skyrise Plaza, Eldama Ravine Township, Along Ravine - Nakuru Road",
        },
      ],
    };
  },
  async created() {
    document.title = "Talkcoms | About us";
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
      await Promise.all([this.fetch_about(), this.fetch_services()]);
    } catch (error) {
      console.error("Error fetching data: ", error);
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
    /* fetch about us */
    async fetch_about() {
      try {
        const response = await fetch(about_end_point);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData.data) {
          // const dataArray = Array.isArray(responseData.data)
          //   ? responseData.data
          //   : [responseData.data];

          // this.about_page = dataArray;
          this.about_page = responseData.data;
          console.log("About content", this.about_page);
        } else {
          console.error("Invalid response structure:", responseData);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    },

    /* fetch services */
    async fetch_services() {
      try {
        const response = await fetch(
          "https://cms.talkcoms.co.uk/api/service-pages?fields[0]=product_name&fields[1]=main_title&populate=icon"
        );
        const responseData = await response.json();
        if (responseData.data) {
          this.solutions = responseData.data;
          console.log("Json data for service names: ", this.solutions);
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
