<template>
  <HeroPattern />
  <div class="w-full flex justify-center flex-wrap pb-10">
    <div class="w-[90%] flex h-full gap-4 overflow-hidden mt-16">
      <div class="w-1/2">
        <SmallTitle :text="small_title" />
        <BigTitle :text="big_title" title_class="mt-4 w-[90%]" />
        <p class="w-3/4 mt-4">
          {{ hero_description }}
        </p>
        <div class="w-full flex flex-wrap mt-4">
          <div v-show="is_blog" class="w-full flex">
            <span class="bg-secondary rounded-full text-white pr-4 pl-4">
              {{ blog_category ? blog_category : blog_type }}
            </span>
            <div class="bg-secondary h-[20px] w-[1px] ml-6">
              <!-- this is the green line -->
            </div>
            <span class="ml-6"> {{ blog_date }} </span>
          </div>
          <!-- if it's a blog -->
          <div v-show="is_blog" class="w-full mt-10 flex flex-wrap">
            <div class="w-full">
              <router-link :to="read_more_link"
                ><Button variant="light"
                  >Read Full Blog
                  <i class="fa-solid fa-angle-right mt-[10%] icon"></i></Button
              ></router-link>
            </div>
            <a href="#blogs" class="mt-5 inline-block relative group pb-[1px]"
              ><div class="uppercase text-third text-sm">
                Read More Blogs
                <i class="fa-solid fa-arrow-down ml-2"></i>
              </div>
              <!-- Animated line -->
              <div
                class="absolute bottom-0 left-0 w-0 h-[2px] bg-third transition-all duration-300 ease-out group-hover:w-full"
              ></div
            ></a>
          </div>
          <!-- if it's a service -->
          <div v-show="is_service" class="w-full flex mt-10">
            <router-link :to="demo_link"
              ><Button variant="dark"
                >Book A Free Demo
                <i class="fa-solid fa-angle-right mt-[10%] icon"></i></Button
            ></router-link>
            <router-link to="/contact/get-started" class="ml-4"
              ><Button variant="light"
                >Talk to sales
                <i class="fa-solid fa-angle-right mt-[10%] icon"></i></Button
            ></router-link>
            <!-- <DarkButton
              :button_link="demo_link"
              button_text="Book A Free Demo"
            /> -->
            <!-- <LightButton
              button_link="/contact-us"
              button_text="Talk to sales"
              class="ml-4"
            /> -->
          </div>
          <div v-show="is_story" class="w-full mt-10 flex flex-wrap">
            <div class="w-full">
              <router-link :to="read_more_link"
                ><Button variant="light"
                  >Read Full Story
                  <i class="fa-solid fa-angle-right mt-[10%] icon"></i></Button
              ></router-link>
            </div>
            <a href="#stories" class="mt-5 inline-block relative group pb-[1px]"
              ><div class="uppercase text-third text-sm">
                Read More Stories
                <i class="fa-solid fa-arrow-down ml-2"></i>
              </div>
              <!-- Animated line -->
              <div
                class="absolute bottom-0 left-0 w-0 h-[2px] bg-third transition-all duration-300 ease-out group-hover:w-full"
              ></div
            ></a>
          </div>
          <!-- is case studies -->
          <div v-show="is_study" class="w-full mt-10 flex flex-wrap">
            <div class="w-full">
              <router-link :to="read_more_link"
                ><Button variant="light"
                  >Read Full Story
                  <i class="fa-solid fa-angle-right mt-[10%] icon"></i></Button
              ></router-link>
            </div>
            <a href="#studies" class="mt-5 inline-block relative group pb-[1px]"
              ><div class="uppercase text-third text-sm">
                Read More Studies
                <i class="fa-solid fa-arrow-down ml-2"></i>
              </div>
              <!-- Animated line -->
              <div
                class="absolute bottom-0 left-0 w-0 h-[2px] bg-third transition-all duration-300 ease-out group-hover:w-full"
              ></div
            ></a>
          </div>
          <!-- industry -->
          <div v-show="is_industry" class="w-full mt-10 flex flex-wrap">
            <div class="w-full">
              <router-link :to="read_more_link"
                ><Button variant="dark"
                  >Read Full Blog
                  <i class="fa-solid fa-angle-right mt-[10%] icon"></i></Button
              ></router-link>
            </div>
          </div>
          <!-- testimonials -->
          <div v-show="is_testimonial" class="w-full mt-6 flex flex-wrap">
            <div class="w-full">
              <router-link to="/contact/contact-us"
                ><Button variant="light"
                  >Find Your Solution
                  <i class="fa-solid fa-angle-right mt-[10%] icon"></i></Button
              ></router-link>
            </div>
            <a
              href="#testimonials"
              class="mt-5 inline-block relative group pb-[1px]"
              ><div class="uppercase text-third text-sm">
                Read Testimonials
                <i class="fa-solid fa-arrow-down ml-2"></i>
              </div>
              <!-- Animated line -->
              <div
                class="absolute bottom-0 left-0 w-0 h-[2px] bg-third transition-all duration-300 ease-out group-hover:w-full"
              ></div
            ></a>
          </div>
          <!-- contacts -->
          <div v-show="is_contact" class="w-full mt-6 flex flex-wrap">
            <!-- offices -->
            <div class="w-full flex flex-wrap mt-4">
              <div class="w-full flex flex-nowrap">
                <div
                  class="w-[30px] min-w-[e0px] h-[30px] max-h-[30px] flex justify-center p-4 rounded-sm bg-secondary"
                >
                  <div class="h-full flex flex-col justify-center">
                    <i class="fa-solid fa-envelope text-white"></i>
                  </div>
                </div>
                <!-- title -->
                <div class="w-full ml-4 h-full flex flex-col justify-end">
                  <h1 class="font-semibold">Offices</h1>
                </div>
              </div>

              <!-- emails -->
              <div class="w-full mt-4">
                <div
                  v-for="(office, index) in offices"
                  :key="index"
                  class="w-full"
                >
                  <p class="font-semibold">{{ office.name }}</p>
                  <p class="mb-2">{{ office.location }}</p>
                </div>
              </div>
            </div>
            <!-- phone -->
            <div class="w-1/2 flex flex-wrap mt-10">
              <div class="w-full flex flex-nowrap">
                <div
                  class="w-[30px] min-w-[e0px] h-[30px] max-h-[30px] flex justify-center p-4 rounded-sm bg-secondary"
                >
                  <div class="h-full flex flex-col justify-center">
                    <i class="fa-solid fa-phone text-white"></i>
                  </div>
                </div>
                <!-- title -->
                <div class="w-full ml-4 h-full flex flex-col justify-end">
                  <h1 class="font-semibold">Phone</h1>
                </div>
              </div>

              <!-- phone -->
              <div class="w-full mt-4">
                <p
                  v-for="(phone, index) in phones"
                  :key="index"
                  class="text-sm"
                >
                  <a :href="`tel:${phone.phone}`" class="custom-default-hover">
                    {{ phone.phone }}
                  </a>
                </p>
              </div>
            </div>
            <!-- emails -->
            <div class="w-1/2 flex flex-wrap mt-10">
              <div class="w-full flex flex-nowrap">
                <div
                  class="w-[30px] min-w-[e0px] h-[30px] max-h-[30px] flex justify-center p-4 rounded-sm bg-secondary"
                >
                  <div class="h-full flex flex-col justify-center">
                    <i class="fa-solid fa-envelope text-white"></i>
                  </div>
                </div>
                <!-- title -->
                <div class="w-full ml-4 h-full flex flex-col justify-end">
                  <h1 class="font-semibold">Email</h1>
                </div>
              </div>

              <!-- emails -->
              <div class="w-full mt-4">
                <p v-for="(email, index) in emails" :key="index">
                  <a
                    :href="`mailto:${email.email}`"
                    class="custom-default-hover"
                  >
                    {{ email.email }}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2 h-[55vh]">
        <div class="w-full h-full flex rounded-xl overflow-hidden">
          <div
            v-if="hero_small_image"
            class="h-full w-[30%] overflow-hidden rounded-xl"
          >
            <img
              :src="hero_small_image"
              alt="Blog image header"
              class="h-full min-w-full w-auto max-w-none max-h-none object-cover rounded-xl"
            />
          </div>
          <div
            class="h-full overflow-hidden rounded-xl"
            :class="hero_small_image ? 'w-[67%] ml-[3%]' : 'w-full ml-0'"
          >
            <img
              :src="hero_image"
              alt="Blog image header"
              class="w-full min-w-full max-w-none h-auto max-h-none object-cover rounded-xl"
              :class="hero_small_image ? 'min-h-full ' : ''"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//import RoundedButton from "./buttons/RoundedButton.vue";
// import HeroPattern from "./patterns/HeroPattern.vue";
import HeroPattern from "../patterns/HeroPattern.vue";
import BigTitle from "../text/BigTitle.vue";
import SmallTitle from "../text/SmallTitle.vue";
//import DarkButton from "./ui/button/DarkButton.vue";
//import LightButton from "./ui/button/LightButton.vue";

export default {
  name: "HeroSection",
  components: {
    // RoundedButton,
    HeroPattern,
    SmallTitle,
    BigTitle,
    // DarkButton,
    // LightButton,
  },
  props: {
    small_title: String,
    big_title: String,
    hero_description: String,
    is_blog: Boolean,
    blog_category: String,
    blog_type: String,
    blog_date: String,
    read_more_link: String,
    demo_link: String,
    hero_image: String,
    is_service: Boolean,
    is_industry: Boolean,
    has_double_images: Boolean,
    hero_small_image: String,
    is_contact: Boolean,
    button_text: String,
    is_testimonial: Boolean,
    is_story: Boolean,
    is_study: Boolean,
  },
  data() {
    return {
      phones: [{ phone: "+2547 592 009 98" }, { phone: "+254 746 433 163" }],
      emails: [
        { email: "support@talkcoms.co.uk" },
        { email: "solutions@talkcoms.co.uk" },
      ],
      offices: [
        {
          name: "UK OFFICE",
          location:
            "The Kings Centre Main Road, Barleythorpe Oakham, LE15 7WD, United Kingdom",
        },
        {
          name: "NAIROBI OFFICE",
          location:
            "Great Jubilee Center ( The Well), Karen, Nairobi 1’st Floor Unit No. 07, Kenya",
        },
        {
          name: "ELDAMA RAVINE OFFICE",
          location:
            "3rd Floor, Skyrise Plaza, Eldama Ravine Township, Along Ravine - Nakuru Road",
        },
      ],
    };
  },
};
</script>
