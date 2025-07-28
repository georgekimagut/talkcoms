<template>
  <!-- load spinner before -->
  <Spinner v-if="page_is_loading" />
  <div v-if="page_is_loading === false" class="w-full bg-white">
    <Navbar :services="universal_services" :products="universal_products" />
    <div class="w-full flex justify-center flex-wrap hero-component">
      <div class="w-[90%] flex flex-wrap hero-holder">
        <!-- Sticky sidebar -->
        <div class="w-[30%] sticky top-[15vh] self-start to-full tbc !h-fit">
          <div class="w-full pt-4 pb-4">
            <div
              class="w-full overflow-y-scroll hide-scrollbar bg-white p-4 border-1 border-[#e3e3e3]"
            >
              <div class="w-full pb-4 border-b border-[#82bc00]">
                <p
                  class="font-semibold cursor-pointer"
                  @click="toggle_tbc = !toggle_tbc"
                >
                  Table of Contents
                  <i
                    class="fa-solid"
                    :class="toggle_tbc ? 'fa-angle-up' : 'fa-angle-down'"
                  ></i>
                </p>
              </div>
              <ul
                v-if="toggle_tbc"
                class="content-body px-4 mt-4 border-b pb-10"
              >
                <li
                  v-for="(item, index) in table_of_contents"
                  :key="index"
                  class="list-disc"
                >
                  <a
                    :href="'#' + item.id"
                    class="custom-default-hover"
                    active-class="text-third"
                  >
                    {{ item.text }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Scrollable content -->
        <div class="w-[70%] pl-8 to-full resource">
          <div class="w-[95%] ml-[5%] mt-10 space-y-20 w-no-w">
            <!-- resource details -->
            <div class="w-full">
              <h1 v-if="resource?.Title" class="font-extrabold mt-4 text-2xl">
                {{ resource?.Title }}
              </h1>
              <!-- success story -->
              <h1 v-if="success_story" class="font-extrabold mt-4 text-2xl">
                {{ success_story?.description[0]?.children[0]?.text }}
              </h1>
              <!-- <p class="w-full mt-6">
                {{ resource.short_description ?? resource.description ?? "" }}
              </p> -->

              <!-- author -->
              <div v-if="resource" class="w-full flex">
                <div class="w-1/2">
                  <p class="w-full text-secondary mt-4">
                    <span v-if="type === 'blog'"
                      >By: {{ resource.author }} ,
                      {{ format_date(resource.createdAt) }}</span
                    >
                    <span v-else class="font-bold">{{ resource.client }}</span>
                  </p>
                </div>
                <div class="w-1/2 flex justify-end">
                  <p class="w-full text-end mt-4">
                    <span v-if="type === 'blog'">
                      {{ resource.read_time }} mins</span
                    >
                  </p>
                </div>
              </div>
            </div>
            <!-- image -->
            <div class="w-full h-[60vh] overflow-hidden mt-[-8vh]">
              <img
                v-if="resource"
                :src="
                  !resource.hero_media.url
                    ? resource.pic
                    : `${resource_image_url}/${
                        resource.hero_media?.formats?.large?.url ||
                        resource.hero_media?.url
                      }`
                "
                class="w-full h-auto object-cover"
              />
              <!-- success story -->
              <img
                v-if="success_story"
                :src="`${image_url}/${success_story?.image?.url}`"
                :alt="`${success_story?.description[0]?.children[0]?.text}`"
                class="w-full h-auto object-cover"
              />
            </div>

            <!-- contents of the resource -->
            <div
              v-if="resource"
              ref="content_body"
              v-html="
                sanitized_resource
                  ? sanitized_resource || sanitized_resource
                  : resource.content_body
              "
              class="w-full mt-10 block"
            ></div>
            <!-- success story -->
            <div ref="content_body" class="w-full">
              <div v-for="content in success_body" class="w-full">
                <div v-for="inner in content" v-html="inner.text"></div>
              </div>
            </div>

            <!-- review -->
            <div class="w-full mt-20 flex justify-center flex-wrap">
              <p class="text-lg">Was this helpful?</p>
              <div class="w-full flex justify-center gap-4 mt-8">
                <Button
                  class="relative overflow-hidden p-6 px-8 bg-default text-white cursor-pointer group"
                >
                  <span class="relative z-10">Yes. Thank you. </span>
                  <span
                    class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                  ></span>
                </Button>
                <Button
                  variant="ghost"
                  class="relative overflow-hidden p-6 px-8 text-secondary cursor-pointer group border border-[#82bc00]"
                >
                  <span class="relative z-10 hover:text-[#131f6b]"
                    >Not Really
                  </span>
                  <span
                    class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                  ></span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end -->
    <!-- footer  -->
    <Cta class="mt-20" />
    <Footer :services="universal_services" :products="universal_products" />
  </div>
</template>
<script>
import Footer from "@/components/general/Footer.vue";
import Navbar from "@/components/general/Navbar.vue";
import Spinner from "@/components/general/Spinner.vue";
import { supabase } from "@/lib/supabase";
import BigTitle from "../../components/text/BigTitle.vue";
import Cta from "@/components/general/Cta.vue";
import { apiEndpoint, baseUrl } from "@/store/store";
import { universal_content } from "@/store/contentStore";

//markup content
import DOMPurify from "dompurify";
import { marked } from "marked";
import CustomCard from "@/components/ui/card/CustomCard.vue";

export default {
  name: "ResourceView",
  props: ["id", "type"],
  components: {
    Navbar,
    Spinner,
    CustomCard,
    Footer,
    BigTitle,
    // SquareButton,
    Cta,
  },

  data() {
    return {
      page_is_loading: true,
      has_no_hero: false,
      toggle_tbc: true,
      is_blog: "blog",
      resource: "",
      success_story: "",
      sanitized_resource: "",
      resource_image_url: baseUrl,
      blogs: [],
      table_of_contents: [],
      image_url: baseUrl,
      /* resource carousel */
      current_resource_slide: 0,
      total_resource_slides: 2,
      universal_services: [],
      universal_products: [],
      success_body: [],
    };
  },
  async created() {
    document.title = `Talkcoms | ${this.id}`;
    this.page_is_loading = true;
    this.universal_services = universal_content().services;
    this.universal_products = universal_content().products;

    try {
      await this.fetch_resource();
    } catch (error) {
      console.error("Loading failed:", error);
    } finally {
      this.page_is_loading = false;
      this.$nextTick(() => {
        setTimeout(() => this.generate_table_of_contents(), 200);
      });
    }
  },
  methods: {
    //create table of contents
    generate_table_of_contents() {
      const headings = this.$refs.content_body.querySelectorAll("h1, h2, h3");
      this.table_of_contents = [];

      headings.forEach((heading, index) => {
        if (!heading.id) heading.id = `heading-${index}`;
        this.table_of_contents.push({
          id: heading.id,
          text: heading.innerText,
          level: heading.tagName,
        });
      });
      // console.log(this.table_of_contents);
    },
    nextResourceSlide() {
      if (this.current_resource_slide < this.total_resource_slides - 1) {
        this.current_resource_slide++;
      }
    },
    prevResourceSlide() {
      if (this.current_resource_slide > 0) {
        this.current_resource_slide--;
      } else {
        this.current_resource_slide = this.total_resource_slides - 1;
      }
    },
    async fetch_resource() {
      try {
        //check the type of service before retrieval
        if (this.type === "blog") {
          const response = await fetch(
            `${baseUrl}/api/blog-posts?filters[slug][$eq]=${this.id}&populate=*`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const response_data = await response.json();

          if (response_data.data) {
            const data = Array.isArray(response_data.data)
              ? response_data.data[0]
              : response_data.data;

            this.resource = data;
            let markdown = this.resource?.articles_section || "";
            marked.setOptions({
              headerIds: true,
              headerPrefix: "",
              mangle: false,
            });

            const html = marked.parse(markdown);
            this.sanitized_resource = DOMPurify.sanitize(html);
          } else {
            throw new Error("No data found in response");
          }
        } else if (this.type === "story") {
          const response = await fetch(
            `${baseUrl}/api/success-stories?filters[companyName][$eq]=${this.id}&populate=*`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const response_data = await response.json();

          if (response_data.data) {
            const data = Array.isArray(response_data.data)
              ? response_data.data[0]
              : response_data.data;

            this.success_story = data;
            this.success_story?.description.forEach((description) => {
              this.success_body.push(description?.children);
            });

            console.log("Success body: ", this.success_body);
            // const success_story_body =

            // let markdown = this.success_story_body?.description || "";
            // marked.setOptions({
            //   headerIds: true,
            //   headerPrefix: "",
            //   mangle: false,
            // });

            // const html = marked.parse(markdown);
            // this.sanitized_resource = DOMPurify.sanitize(html);
            // console.log("Story: ", this.sanitized_resource);
          } else {
            throw new Error("No data found in response");
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    /* fetch blogs */
    async fetch_blogs() {
      try {
        const response = await fetch(apiEndpoint + "6");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData.data) {
          const dataArray = Array.isArray(responseData.data)
            ? responseData.data
            : [responseData.data];

          this.blogs = dataArray;
          console.log(this.blogs);
        } else {
          console.error("Invalid response structure:", responseData);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
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
