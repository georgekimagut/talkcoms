<template>
  <div
    class="w-full flex justify-center flex-wrap pb-10 hero-component universal_hero bg-fourth relative h-fit min-h-[80vh]"
    :class="has_pattern ? 'overflow-y-visible hide-scrollbar' : ''"
  >
    <HeroPattern class="hide-img" />
    <div
      class="w-[90%] flex gap-4 overflow-hidden mt-16 hero-holder absolute z-[10] h-fit universal_hero_holder"
    >
      <div class="w-1/2 to-full">
        <div
          class="w-full h-[50px] flex flex-nowrap to-full icon-holder"
          :class="service_icon ? 'gap-4' : ''"
        >
          <img :src="service_icon" />
          <div class="h-full flex flex-col justify-center">
            <p
              class="font-bold text-secondary text-xl uppercase"
              :class="service_icon ? '!text-left' : ''"
            >
              {{ small_title }}
            </p>
            <!-- <SmallTitle :text="small_title" class="font-bold" /> -->
          </div>
        </div>

        <BigTitle :text="big_title" title_class="mt-4 w-[88%]" />
        <p class="w-3/4 mt-6" :class="has_pattern ? 'text-secondary' : ''">
          {{ hero_description }}
        </p>
        <div class="w-full flex flex-wrap mt-4 btn-holder">
          <!-- about us & faq -->
          <div
            v-if="has_pattern"
            class="w-full h-[20vh] mt-6 relative hide-img"
          >
            <!-- center pattern -->
            <div class="w-full h-full absolute z-[15] overflow-y-visible">
              <div class="absolute w-fit h-full flex flex-col">
                <div
                  v-for="index in 6"
                  :key="index"
                  class="w-full h-[45px] flex flex-shrink-0 flex-row gap-6"
                >
                  <div
                    v-for="index in 6"
                    :key="index"
                    class="w-[5px] h-[5px] flex-shrink-0 rounded-full bg-third"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <!-- blog -->
          <div v-if="is_blog" class="w-full flex full-hero">
            <span class="bg-secondary rounded-full text-white pr-4 pl-4">
              {{ blog_category ? blog_category : blog_type }}
            </span>
            <div class="bg-secondary h-[20px] w-[1px] ml-6">
              <!-- this is the green line -->
            </div>
            <span class="ml-6"> {{ blog_date }} </span>
          </div>
          <!-- if it's a blog -->
          <div v-if="is_blog" class="w-full mt-10 flex flex-wrap full-hero">
            <div class="w-full flex full-hero">
              <router-link :to="read_more_link">
                <Button
                  variant="ghost"
                  class="relative overflow-hidden p-6 px-8 text-secondary cursor-pointer group border border-[#82bc00]"
                >
                  <span class="relative z-10 hover:text-[#131f6b]"
                    >Read Full Blog
                  </span>
                  <span
                    class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                  ></span>
                </Button>
              </router-link>
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
          <div v-if="is_service" class="w-full flex mt-10 full-hero">
            <router-link :to="demo_link">
              <Button
                class="relative overflow-hidden p-6 px-8 bg-default text-white cursor-pointer group"
              >
                <span class="relative z-10">Book A Demo </span>
                <span
                  class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                ></span>
              </Button>
            </router-link>
          </div>
          <div v-if="is_story" class="w-full mt-10 flex flex-wrap full-hero">
            <div class="w-full full-hero">
              <router-link :to="read_more_link">
                <Button
                  variant="ghost"
                  class="relative overflow-hidden p-6 px-8 text-secondary cursor-pointer group border border-[#82bc00]"
                >
                  <span class="relative z-10 hover:text-[#131f6b]"
                    >Read Full Story
                  </span>
                  <span
                    class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                  ></span>
                </Button>
              </router-link>
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
          <div v-if="is_study" class="w-full mt-10 flex flex-wrap full-hero">
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
          <div v-if="is_industry" class="w-full mt-10 flex flex-wrap full-hero">
            <div class="w-full full-hero">
              <router-link to="/contact/book-a-demo">
                <Button
                  class="relative overflow-hidden p-6 px-8 bg-default text-white cursor-pointer group"
                >
                  <span class="relative z-10">Book A Free Call </span>
                  <span
                    class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                  ></span>
                </Button>
              </router-link>
            </div>
          </div>
          <!-- testimonials -->
          <div
            v-if="is_testimonial"
            class="w-full mt-6 flex flex-wrap full-hero"
          >
            <div class="w-full full-hero">
              <router-link to="/contact/contact-us">
                <Button
                  variant="ghost"
                  class="relative overflow-hidden p-6 px-8 text-secondary cursor-pointer group border border-[#82bc00]"
                >
                  <span class="relative z-10 hover:text-[#131f6b]"
                    >Find Your Solution
                  </span>
                  <span
                    class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                  ></span>
                </Button>
              </router-link>
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
        </div>
      </div>
      <div class="w-1/2 h-[55vh] to-full">
        <div class="w-full h-full flex rounded-xl overflow-hidden relative">
          <div
            v-if="hero_small_image"
            class="h-full w-[30%] overflow-hidden rounded-xl small-img flex justify-center"
          >
            <!-- Shimmer Placeholder -->
            <div
              v-if="!imageLoaded"
              class="absolute inset-0 bg-gray-200 opacity-50 animate-shimmer"
            ></div>

            <!-- Actual Image -->
            <img
              v-show="imageLoaded"
              :src="hero_small_image"
              alt="Small hero image"
              @load="onImageLoad"
              class="h-full min-w-full w-auto max-w-none max-h-none object-cover rounded-xl transition-opacity duration-500"
            />
            <!-- <img
              :src="hero_small_image"
              alt="Blog image header"
              class="h-full min-w-full w-auto max-w-none max-h-none object-cover rounded-xl"
            /> -->
          </div>
          <!-- big image -->
          <div
            class="h-full overflow-hidden rounded-xl big-img"
            :class="hero_small_image ? 'w-[67%] ml-[3%]' : 'w-full ml-0'"
          >
            <!-- Shimmer Placeholder -->
            <div
              v-if="!imageLoaded"
              class="absolute inset-0 bg-gray-200 opacity-50 animate-shimmer"
            ></div>

            <!-- Actual Image -->
            <img
              v-show="imageLoaded"
              :src="hero_image"
              :alt="hero_image_alt"
              @load="onImageLoad"
              class="w-full min-w-full max-w-none h-full max-h-none object-cover rounded-xl transition-opacity duration-500"
              :class="hero_small_image ? 'min-h-full ' : ''"
            />
            <!-- <img
              :src="hero_image"
              :alt="hero_image_alt"
              class="w-full min-w-full max-w-none h-full max-h-none object-cover rounded-xl"
              :class="hero_small_image ? 'min-h-full ' : ''"
            /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeroPattern from "../patterns/HeroPattern.vue";
import BigTitle from "../text/BigTitle.vue";
import SmallTitle from "../text/SmallTitle.vue";

export default {
  name: "HeroSection",
  components: {
    HeroPattern,
    SmallTitle,
    BigTitle,
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
    has_pattern: Boolean,
    hero_image_alt: String,
    service_icon: String,
  },
  data() {
    return {
      imageLoaded: false,
    };
  },
  methods: {
    // load image animation
    onImageLoad() {
      this.imageLoaded = true;
    },
  },
};
</script>
