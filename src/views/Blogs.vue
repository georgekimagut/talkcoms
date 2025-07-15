<template>
  <!-- load spinner before -->
  <Spinner v-if="page_is_loading" />
  <div v-if="page_is_loading === false" class="w-full">
    <Navbar />
    <HeroSection
      v-for="(blog, index) in all_blog_tracker.slice(0, 1)"
      :key="index"
      small_title="BLOGS"
      :big_title="blog.Title"
      :hero_description="blog.Title"
      :blog_category="blog.category"
      :blog_type="blog.Type"
      :blog_date="format_date(blog.createdAt)"
      :read_more_link="`/resources/${is_blog}/${blog.slug}`"
      :hero_image="`${image_url}/${blog.hero_media.url}`"
      is_blog
    />
    <!-- blog panel -->
    <div
      class="w-full flex flex-wrap justify-center overflow-hidden top-56 mt-10"
      id="blogs"
    >
      <!-- panel -->
      <div class="w-[90%] flex flex-wrap justify-center">
        <div class="w-full flex justify-center">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="p-2 pr-4 pl-4 mr-2 rounded-full border border-[#82bc00] flex justify-center cursor-pointer"
            :class="category.category_class"
            @click="change_category(index, category.name, 'Type')"
          >
            {{ category.name }}
          </div>
        </div>
        <div class="w-full flex mt-10">
          <div class="w-1/2">
            <h1 class="text-2xl font-bold p-2 ml-[1%]">Talkcoms Blog</h1>
          </div>
          <div class="w-1/2 flex justify-end">
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
        <div class="w-full mt-10 flex flex-wrap">
          <CustomCard
            v-for="(blog, index) in blogs"
            :key="index"
            :card_pic="`${image_url}/${blog.hero_media.url}`"
            :card_title="blog.Title"
            :blog_category="blog.category ? blog.category : blog.Type"
            :blog_date="`${format_date(blog.createdAt)}`"
            card_class="w-[31%] min-w-[28%] m-[1%] mb-4"
            :link_to="`/resources/${is_blog}/${blog.slug}`"
            :writer="blog.author"
            :read_time="`${blog.read_time} mins`"
            is_blog
          />
        </div>
      </div>
    </div>

    <!-- cta -->
    <Cta class="mt-32" />
    <Footer />
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
    };
  },
  async created() {
    this.page_is_loading = true;

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
        const response = await fetch(apiEndpoint + "10");
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
