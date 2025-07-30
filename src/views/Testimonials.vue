<template>
  <!-- load spinner before -->
  <Spinner v-if="page_is_loading" />
  <div v-if="page_is_loading === false" class="w-full">
    <Navbar
      :services="universal_services"
      :products="universal_products"
      :industries="universal_industries"
    />
    <!-- new hero -->
    <HeroSection
      v-for="(testimonial, index) in testimonials.slice(0, 1)"
      :key="index"
      :small_title="testimonial.title_h1"
      :big_title="testimonial.title_h2"
      :hero_description="testimonial.description"
      hero_image="/static/testimonials.jpg"
      hero_small_image="/static/testimonial-small-2.svg"
      is_testimonial
    />
    <!-- end of hero -->
    <!-- testimonials -->
    <div
      class="w-full flex justify-center flex-wrap py-10 hero-component"
      id="testimonials"
      h
    >
      <div class="w-[90%] flex flex-wrap">
        <div class="w-full flex flex-wrap hero-cards gap-4">
          <Card
            v-for="(testimonial, index) in testimonials[0]?.testimonial"
            :key="index"
            class="w-[32%] mb-4 p-4 zoom-animate border-1 bg-white shadow-none rounded-xl flex-shrink-0 to-full custom-card-hover"
          >
            <CardHeader>
              <CardTitle
                ><i
                  class="fa-solid fa-quote-left p-4 rounded-full text-muted text-4xl"
                ></i
              ></CardTitle>
            </CardHeader>
            <CardContent>{{ testimonial?.description }} </CardContent>
            <CardFooter>
              <div class="w-full flex border-t-2 pt-2">
                <div
                  class="w-[50px] h-[50px] flex justify-center rounded-full border text-muted bg-body pt"
                >
                  <div class="h-full flex flex-col justify-center">
                    <i
                      class="fa-solid fa-user text-muted text-white text-xl"
                    ></i>
                  </div>
                </div>
                <div class="ml-[10px]">
                  <h4 class="text-lg font-bold text-secondary">
                    {{ testimonial.name }}
                  </h4>
                  <h2>
                    {{ testimonial.company_name }}
                  </h2>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
    <!-- footer & cta-->
    <Cta />
    <Footer :services="universal_services" :products="universal_products" />
  </div>
</template>
<script>
import Cta from "@/components/general/Cta.vue";
import Footer from "@/components/general/Footer.vue";
import HeroSection from "@/components/general/HeroSection.vue";
import Navbar from "@/components/general/Navbar.vue";
import Spinner from "@/components/general/Spinner.vue";
import { universal_content } from "@/store/contentStore";
import { testimonials_end_point } from "@/store/store";

export default {
  name: "Testimonials",
  components: {
    Spinner,
    Navbar,
    HeroSection,
    Footer,
    Cta,
  },
  data() {
    return {
      page_is_loading: true,
      success_stories: [],
      testimonials: [],
      success_story: "story",
      universal_services: [],
      universal_products: [],
      universal_industries: [],
    };
  },
  methods: {
    /* fetch testimonials */
    async fetch_testimonials() {
      try {
        const response = await fetch(testimonials_end_point);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData.data) {
          const dataArray = Array.isArray(responseData.data)
            ? responseData.data
            : [responseData.data];

          this.testimonials = dataArray;
        } else {
          console.error("Invalid response structure:", responseData);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    },
  },
  async created() {
    document.title = "Talkcoms | Testimonials";
    this.page_is_loading = true;
    this.universal_services = universal_content().services;
    this.universal_products = universal_content().products;
    this.universal_industries = universal_content().industries;

    try {
      await Promise.all([this.fetch_testimonials()]);
    } catch (error) {
      console.error("Loading failed:", error);
    } finally {
      this.page_is_loading = false;
    }
  },
};
</script>
