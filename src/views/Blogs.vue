<template>
  <!-- load spinner before -->
  <Spinner v-if="page_is_loading" />
  <div v-if="page_is_loading === false" class="w-full">
    <Navbar :services="universal_services" :products="universal_products" />
    <HeroSection
      v-for="(blog, index) in all_blog_tracker.slice(0, 1)"
      :key="index"
      small_title="BLOGS"
      :big_title="blog?.Title"
      hero_description=""
      :blog_category="blog?.category"
      :blog_type="blog?.Type"
      :blog_date="format_date(blog.createdAt)"
      :read_more_link="`/resources/${is_blog}/${blog?.slug}`"
      :hero_image="`${image_url}/${blog.hero_media?.url}`"
      is_blog
    />
    <!-- blog panel -->
    <div
      class="w-full flex flex-wrap justify-center overflow-hidden top-56 mt-10 overflow-x-scroll hide-scrollbar"
      id="blogs"
    >
      <!-- panel -->
      <div class="w-[90%] flex flex-wrap justify-center">
        <div class="w-full flex justify-center">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="p-2 px-4 mr-2 rounded-full border border-[#82bc00] flex justify-center cursor-pointer flex-shrink-0"
            :class="category.category_class"
            @click="change_category(index, category.name, 'Type')"
          >
            {{ category.name }}
          </div>
        </div>
        <div class="w-full flex mt-10 hero-component">
          <div class="w-1/2 to-full">
            <h1 class="text-2xl font-bold p-2 ml-[1%]">Talkcoms Blog</h1>
          </div>
          <div class="w-1/2 flex justify-end to-full">
            <div
              v-for="(category, index) in blog_categories"
              :key="index"
              class="mr-4 cursor-pointer font-semibold custom-default-hover"
              @click="change_category(index, category.name, 'category')"
              :class="category.active_category"
            >
              {{ category.name }}
            </div>
          </div>
        </div>
        <!-- other blogs -->
        <div class="w-full mt-10 flex flex-wrap hero-component">
          <div class="w-full flex flex-wrap gap-4 hero-cards">
            <Card
              v-for="(blog, index) in blogs"
              :key="index"
              class="w-[32%] border-0 shadow-none bg-body rounded-md flex-shrink-0 to-full cursor-pointer duration-300 ease-in custom-card-hover"
            >
              <router-link
                :to="`/resources/${is_blog}/${blog.slug}`"
                class="w-full flex-flex-wrap"
              >
                <CardHeader class="h-[40vh] p-0">
                  <img
                    :src="`${image_url}/${blog.hero_media.url}`"
                    class="min-h-full h-full min-w-full w-auto max-w-none rounded-md"
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
                <!-- <div
                  class="text-base text-gray-800 [&_*]:!m-0 [&_*]:!mt-0 [&_*]:!mb-0 [&_*]:!p-0 [&_*]:!font-normal [&_*]:!text-inherit [&_*]:!text-base [&_*]:!bg-transparent [&_*]:!border-none [&_*]:!shadow-none !p-2"
                  v-html="
                    blog.articles_section
                      .replace(/<br\s*\/?>/gi, '')
                      .split(' ')
                      .slice(0, 15)
                      .join(' ')
                  "
                ></div> -->
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
          <div class="w-full mt-10 flex justify-center">
            <Button
              class="relative overflow-hidden p-6 px-8 bg-default text-white cursor-pointer group"
            >
              <span class="relative z-10">Loard More</span>
              <span
                class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
              ></span>
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- cta -->
    <Cta class="mt-32" />
    <Footer :services="universal_services" :products="universal_products" />
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
import Link from "@/components/text/Link.vue";
import { supabase } from "@/lib/supabase";
import SmallTitle from "@/components/text/SmallTitle.vue";
import { apiEndpoint, baseUrl } from "@/store/store";
import { universal_content } from "@/store/contentStore";

export default {
  name: "Blogs",
  components: {
    HeroSection,
    Navbar,
    Spinner,
    Cta,
    Footer,
    Link,
    BigTitle,
    CustomCard,
    SmallTitle,
  },
  data() {
    return {
      page_is_loading: true,
      blogs: [],
      filtered_blogs: [],
      all_blog_tracker: [],
      categories: [],
      blog_categories: [],
      posts: [],
      is_blog: "blog",
      image_url: baseUrl,
      universal_services: [],
      universal_products: [],
    };
  },
  async created() {
    document.title = "Talkcoms | Blog";
    this.page_is_loading = true;
    this.universal_services = universal_content().services;
    this.universal_products = universal_content().products;

    try {
      // await this.get_blogs();
      await this.fetch_blogs();
      await Promise.all([this.blog_filtering(), this.generate_types()]);
    } catch (error) {
      console.error("Loading failed:", error);
    } finally {
      this.page_is_loading = false;
    }
  },
  methods: {
    /* strapi methods */
    async fetch_blogs() {
      try {
        const response = await fetch(apiEndpoint + "9");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData.data) {
          const dataArray = Array.isArray(responseData.data)
            ? responseData.data
            : [responseData.data];

          this.blogs = dataArray;
        } else {
          console.error("Invalid response structure:", responseData);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    },
    async blog_filtering() {
      this.filtered_blogs = [...this.blogs];
      this.all_blog_tracker = [...this.blogs];
    },
    async generate_types() {
      const retrieved_types = [
        { name: "All", category_class: "text-secondary" },
      ];
      /* blgo categories */
      const retrieved_blog_categories = [
        { name: "All", active_category: "text-secondary" },
      ];
      this.blogs.forEach((blog) => {
        //push types to types arrays
        retrieved_types.push({
          name: blog.Type,
          category_class: "text-secondary",
        });
        retrieved_blog_categories.push({
          name: blog.category,
          active_category: "",
        });
      });
      this.categories = Object.values(
        retrieved_types.reduce((blog_type, item) => {
          blog_type[item.name] = item;
          return blog_type;
        }, {})
      );
      this.blog_categories = Object.values(
        retrieved_blog_categories.reduce((blog_category, item) => {
          blog_category[item.name] = item;
          return blog_category;
        }, {})
      );
    },
    /* end of strapi */
    change_category(item_index, item_name, action_type) {
      if (action_type == "Type") {
        this.categories = this.categories.map((category, index) => {
          return {
            ...category,
            category_class:
              index === item_index
                ? "bg-secondary text-white"
                : "text-secondary",
          };
        });
        //filter and show only specific blogs
        this.blogs = this.all_blog_tracker;
        if (item_name == "All") {
          return;
        }
        const selected_category = item_name;
        this.filtered_blogs = this.blogs.filter(
          (blog) => blog.Type === selected_category
        );
        // set blogs to filtered
        this.blogs = this.filtered_blogs;
        console.log("Blog types :", this.blogs);

        // actions for categories
      } else if (action_type == "category") {
        this.blog_categories = this.blog_categories.map((category, index) => {
          return {
            ...category,
            active_category: index === item_index ? "text-secondary" : "",
          };
        });
        this.blogs = this.all_blog_tracker;
        if (item_name == "All") {
          return;
        }
        const selected_category = item_name;
        this.filtered_blogs = this.blogs.filter(
          (blog) => blog.category === selected_category
        );
        // set blogs to filtered
        this.blogs = this.filtered_blogs;
      }
    },
    //get blogs
    async get_blogs() {
      try {
        const { data, error } = await supabase.from("blogs").select("*");

        if (error) {
          console.log(error);
          return;
        }

        this.blogs = data;
        this.filtered_blogs = [...data]; // or data.slice()
        this.all_blog_tracker = [...data];

        const retrieved_types = [
          { name: "All", category_class: "text-secondary" },
        ];
        const retrieved_categories = [
          { name: "All", category_class: "text-secondary" },
        ];
        //take blog categories from blogs
        this.blogs.forEach((blog) => {
          //push types to types arrays
          retrieved_types.push({
            name: blog.blog_type,
            category_class: "text-secondary",
          });
          //push categories to categories array
          retrieved_categories.push({
            name: blog.category,
            active_category: false,
          });
        });
        // filter blogs with similar types
        this.categories = Object.values(
          retrieved_types.reduce((blog_type, item) => {
            blog_type[item.name] = item;
            return blog_type;
          }, {})
        );
        //filter blogs with similary
        this.blog_categories = Object.values(
          retrieved_categories.reduce((category, item) => {
            category[item.name] = item;
            return category;
          }, {})
        );
      } catch (error) {
        console.log(error);
      }
    },
    //change date format
    format_date(date_to_change) {
      const date = new Date(date_to_change);
      const date_options = { month: "long", day: "numeric", year: "numeric" };
      return date.toLocaleDateString("en-US", date_options);
    },
  },
};
</script>
