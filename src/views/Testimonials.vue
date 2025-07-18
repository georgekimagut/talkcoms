<template>
  <!-- load spinner before -->
  <Spinner v-if="page_is_loading" />
  <div v-if="page_is_loading === false" class="w-full">
    <Navbar :services="services" />
    <!-- new hero -->
    <HeroSection
      small_title="Testimonials"
      big_title="We have worked with thousands of amazing people"
      hero_description="We believe that the true measure of our success lies in the satisfaction and stories of the people we serve"
      hero_image="/static/pic-3.png"
      hero_small_image="/static/about-us.png"
      is_testimonial
    />
    <!-- end of hero -->
    <!-- testimonials -->
    <div class="w-full flex justify-center flex-wrap py-10" id="testimonials">
      <div class="w-[90%] flex flex-wrap">
        <Card
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="w-[30%] mb-4 m-[1.5%] p-4 zoom-animate border-1 bg-white shadow-lg rounded-xl"
        >
          <CardHeader>
            <CardTitle
              ><i
                class="fa-solid fa-quote-left p-4 rounded-full text-muted text-4xl"
              ></i
            ></CardTitle>
          </CardHeader>
          <CardContent>{{ testimonial.review }} </CardContent>
          <CardFooter>
            <div class="w-full flex border-t-2 pt-2">
              <div
                class="w-[50px] h-[50px] flex justify-center rounded-full border text-muted bg-body pt"
              >
                <div class="h-full flex flex-col justify-center">
                  <i class="fa-solid fa-user text-muted text-white text-xl"></i>
                </div>
              </div>
              <div class="ml-[10px]">
                <h4 class="text-lg font-bold text-secondary">
                  {{ testimonial.reviewer }}
                </h4>
                <h2>
                  {{ testimonial.company }}
                </h2>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
    <!-- footer & cta-->
    <Cta />
    <Footer :services="services" />
  </div>
</template>
<script>
import CustomCard from "@/components/ui/card/CustomCard.vue";
import Cta from "@/components/general/Cta.vue";
import Footer from "@/components/general/Footer.vue";
import HeroSection from "@/components/general/HeroSection.vue";
import Navbar from "@/components/general/Navbar.vue";
import Spinner from "@/components/general/Spinner.vue";
import BigTitle from "@/components/text/BigTitle.vue";
import SmallTitle from "@/components/text/SmallTitle.vue";
import { supabase } from "@/lib/supabase";
import { universal_content } from "@/store/contentStore";

export default {
  name: "Testimonials",
  components: {
    Spinner,
    Navbar,
    HeroSection,
    Footer,
    SmallTitle,
    BigTitle,
    CustomCard,
    Cta,
  },
  data() {
    return {
      page_is_loading: true,
      success_stories: [],
      testimonials: [],
      success_story: "story",
      services: [],
    };
  },
  methods: {
    //get stories
    async get_stories() {
      try {
        const { data, error } = await supabase
          .from("success_stories")
          .select("*")
          .limit(6);

        if (error) {
          console.log(error);
          return;
        }
        this.success_stories = data;
      } catch (error) {
        console.log(error);
      }
    },
    async get_testimonials() {
      try {
        const { data, error } = await supabase.from("testimonials").select("*");

        if (error) {
          console.log(error);
          return;
        }
        this.testimonials = data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    this.page_is_loading = true;
    this.services = universal_content().services;

    try {
      await this.get_stories();
      await this.get_testimonials();
    } catch (error) {
      console.error("Loading failed:", error);
    } finally {
      this.page_is_loading = false;
    }
  },
};
</script>
