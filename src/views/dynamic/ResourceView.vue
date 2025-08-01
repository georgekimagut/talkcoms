<template>
  <!-- load spinner before -->
  <Spinner v-if="page_is_loading" />

  <div v-if="page_is_loading === false" class="w-full bg-white">
    <Navbar
      :services="universal_services"
      :products="universal_products"
      :industries="universal_industries"
    />
    <div class="w-full flex justify-center flex-wrap hero-component">
      <div class="w-[90%] flex flex-wrap hero-holder">
        <!-- Sticky sidebar -->
        <div class="w-[30%] sticky top-[15vh] self-start to-full tbc !h-fit">
          <div class="w-full pt-4 pb-4 border rounded-md shadow-sm bg-body">
            <div
              class="w-full overflow-y-scroll hide-scrollbar p-4 border-1 border-[#e3e3e3]"
            >
              <div class="w-full pb-4 border-b border-[#82bc00]">
                <p
                  class="font-bold text-default cursor-pointer text-xl"
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
                  class="list-disc hover:ml-2 duration-300 ease-in-out"
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
            <!-- top stories -->
            <div class="w-full p-4 pt-10">
              <div class="w-full pb-4 border-b border-[#82bc00]">
                <p
                  @click="related_story_in_view = !related_story_in_view"
                  class="font-bold text-default cursor-pointer text-xl"
                >
                  Top stories
                  <i
                    class="fa-solid"
                    :class="toggle_tbc ? 'fa-angle-up' : 'fa-angle-down'"
                  ></i>
                </p>
              </div>
              <ul
                v-if="related_story_in_view"
                class="content-body px-4 mt-4 border-b pb-10"
              >
                <li
                  v-for="(blog, index) in blogs"
                  :key="index"
                  class="list-disc hover:ml-2 duration-300 ease-in-out py-2 border-b"
                >
                  <router-link
                    :to="`/resources/${type}/${
                      type === 'blog'
                        ? blog?.attributes?.slug || blog?.slug
                        : encodeURIComponent(
                            blog?.attributes?.title || blog?.title
                          )
                    }`"
                    class="custom-default-hover"
                    active-class="text-third"
                  >
                    {{
                      blog?.attributes?.Title ||
                      blog?.Title ||
                      blog?.title ||
                      blog?.attributes?.title
                    }}
                  </router-link>
                  <div class="w-full mt-2">
                    <span
                      class="mt-2 w-full text-sm text-default text-semibold"
                      >{{
                        format_date(
                          blog?.attributes?.createdAt || blog?.createdAt
                        )
                      }}</span
                    >
                  </div>
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
              <h1
                v-if="resource?.attributes?.Title"
                class="font-extrabold mt-4 text-3xl"
              >
                {{ resource?.attributes?.Title }}
              </h1>
              <h1
                v-else-if="resource?.Title"
                class="font-extrabold mt-4 text-3xl"
              >
                {{ resource?.Title }}
              </h1>
              <!-- success story -->
              <h1
                v-if="success_story?.attributes?.title"
                class="font-extrabold mt-4 text-3xl"
              >
                {{ success_story?.attributes?.title }}
              </h1>
              <h1
                v-else-if="success_story?.title"
                class="font-extrabold mt-4 text-3xl"
              >
                {{ success_story?.title }}
              </h1>

              <!-- author -->
              <div v-if="resource" class="w-full flex">
                <div class="w-1/2">
                  <p class="w-full text-secondary mt-4">
                    <span v-if="type === 'blog'"
                      >By:
                      {{ resource?.attributes?.author || resource?.author }} ,
                      {{
                        format_date(
                          resource?.attributes?.createdAt || resource?.createdAt
                        )
                      }}</span
                    >
                    <span v-else class="font-bold">{{
                      resource?.attributes?.client || resource?.client
                    }}</span>
                  </p>
                </div>
                <div class="w-1/2 flex justify-end">
                  <p class="w-full text-end mt-4">
                    <span v-if="type === 'blog'">
                      {{
                        resource?.attributes?.read_time || resource?.read_time
                      }}
                      mins</span
                    >
                  </p>
                </div>
              </div>
            </div>
            <!-- image -->
            <div class="w-full h-auto overflow-hidden mt-[-8vh]">
              <img
                v-if="resource && (resource.attributes || resource)"
                :src="
                  resource?.attributes?.hero_media?.data?.attributes?.url
                    ? `${resource_image_url}/${resource.attributes.hero_media.data.attributes.url}`
                    : resource?.hero_media?.url
                    ? `${resource_image_url}/${resource.hero_media.url}`
                    : resource?.pic
                "
                class="w-full h-auto object-cover rounded-xl"
              />
              <!-- success story -->
              <img
                v-if="
                  success_story && (success_story.attributes || success_story)
                "
                :src="`${image_url}/${
                  success_story?.attributes?.image?.data?.attributes?.url ||
                  success_story?.image?.url
                }`"
                :alt="`${
                  success_story?.attributes?.description?.[0]?.children?.[0]
                    ?.text ||
                  success_story?.description?.[0]?.children?.[0]?.text
                }`"
                class="w-full h-auto object-cover rounded-xl"
              />
            </div>

            <!-- contents of the resource -->
            <div
              v-if="resource"
              ref="content_body"
              v-html="
                sanitized_resource
                  ? sanitized_resource
                  : resource?.attributes?.content_body || resource?.content_body
              "
              class="w-full mt-8 block"
            ></div>
            <!-- success story -->
            <div v-if="success_story" ref="content_body" class="w-full">
              <div
                v-for="(content, index) in success_body"
                :key="index"
                class="w-full"
              >
                <div
                  v-for="(inner, innerIndex) in content"
                  :key="innerIndex"
                  v-html="inner.text"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end -->
    <!-- footer  -->
    <Cta class="mt-32 bg-fourth border border-[#9ecce4] rounded-lg" />
    <Footer :services="universal_services" :products="universal_products" />
  </div>
</template>
<script>
import Footer from "@/components/general/Footer.vue";
import Navbar from "@/components/general/Navbar.vue";
import Spinner from "@/components/general/Spinner.vue";
import Cta from "@/components/general/Cta.vue";
import { baseUrl } from "@/store/store";
import { universal_content } from "@/store/contentStore";

//markup content
import DOMPurify from "dompurify";
import { marked } from "marked";

export default {
  name: "ResourceView",
  props: ["id", "type"],
  components: {
    Navbar,
    Spinner,
    Footer,
    Cta,
  },

  data() {
    return {
      page_is_loading: true,
      has_no_hero: false,
      toggle_tbc: true,
      is_blog: "blog",
      resource: null,
      success_story: null,
      sanitized_resource: "",
      resource_image_url: baseUrl,
      blogs: [],
      table_of_contents: [],
      image_url: baseUrl,
      current_resource_slide: 0,
      total_resource_slides: 2,
      universal_services: [],
      universal_products: [],
      universal_industries: [],
      success_body: [],
      related_story_in_view: true,
    };
  },
  async created() {
    document.title = `Talkcoms | ${this.id}`;
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
      await this.fetch_resource();
      await this.fetch_blogs();
    } catch (error) {
      console.error("Loading failed:", error);
    } finally {
      this.page_is_loading = false;
      this.$nextTick(() => {
        this.generate_table_of_contents();
      });
    }

    this.$watch(
      () => this.$route.params.id,
      async (newId, oldId) => {
        if (newId !== oldId) {
          document.title = `Talkcoms | ${newId}`;
          this.page_is_loading = true;
          this.universal_services = universal_content().services;
          this.universal_products = universal_content().products;
          this.universal_industries = universal_content().industries;

          try {
            await this.fetch_resource();
            await this.fetch_blogs();
          } catch (error) {
            console.error("Loading failed:", error);
          } finally {
            this.page_is_loading = false;
            this.$nextTick(() => {
              this.generate_table_of_contents();
            });
          }
        }
      }
    );
  },

  methods: {
    generate_table_of_contents() {
      if (!this.$refs.content_body) return;

      this.table_of_contents = [];
      const headings = this.$refs.content_body.querySelectorAll("h1, h2, h3");

      headings.forEach((heading, index) => {
        if (!heading.id) heading.id = `heading-${index}`;
        this.table_of_contents.push({
          id: heading.id,
          text: heading.innerText,
          level: heading.tagName,
        });
      });
    },

    async fetch_resource() {
      const encoded_title = encodeURIComponent(this.id);
      try {
        if (this.type === "blog") {
          const response = await fetch(
            `${baseUrl}/api/blog-posts?filters[slug][$eq]=${encoded_title}&populate=*`
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
            let markdown =
              this.resource?.attributes?.articles_section ||
              this.resource?.articles_section ||
              "";

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
            `${baseUrl}/api/success-stories?filters[title][$eq]=${encoded_title}&populate=*`
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
            this.success_body = [];

            const description =
              this.success_story?.attributes?.description ||
              this.success_story?.description ||
              [];

            description.forEach((desc) => {
              if (desc?.children) {
                this.success_body.push(desc.children);
              }
            });
          } else {
            throw new Error("No data found in response");
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    async fetch_service_names() {
      try {
        const response = await fetch(
          "https://cms.talkcoms.co.uk/api/service-pages/?fields[0]=product_name&fields[1]=is_product"
        );
        const responseData = await response.json();
        if (responseData.data) {
          const dataArray = Array.isArray(responseData.data)
            ? responseData.data
            : [responseData.data];
          const fetched_services = dataArray;

          this.universal_services = [];
          this.universal_products = [];

          fetched_services.forEach((item) => {
            if (item.attributes?.is_product || item.is_product) {
              this.universal_products.push({
                product_name:
                  item.attributes?.product_name || item.product_name,
              });
            } else {
              this.universal_services.push({
                product_name:
                  item.attributes?.product_name || item.product_name,
              });
            }
          });

          const contentStore = universal_content();
          contentStore.setServices(this.universal_services);
          contentStore.setProducts(this.universal_products);
        } else {
          console.error("Invalid service response structure: ", responseData);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    },

    async fetch_blogs() {
      try {
        let response = "";
        if (this.type === "blog") {
          response = await fetch(
            "https://cms.talkcoms.co.uk/api/blog-posts?fields[0]=Title&fields[1]=slug&fields[2]=createdAt&populate=*&sort=createdAt:desc&pagination[limit]=5"
          );
        } else {
          response = await fetch(
            "https://cms.talkcoms.co.uk/api/success-stories?fields[0]=title&fields[1]=title&populate=*&sort=createdAt:desc&pagination[limit]=5"
          );
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData.data) {
          this.blogs = Array.isArray(responseData.data)
            ? responseData.data
            : [responseData.data];
        } else {
          console.error("Invalid response structure:", responseData);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    },

    format_date(date_to_change) {
      if (!date_to_change) return "";
      const date = new Date(date_to_change);
      const date_options = { month: "long", day: "numeric", year: "numeric" };
      return date.toLocaleDateString("en-US", date_options);
    },
  },
};
</script>
