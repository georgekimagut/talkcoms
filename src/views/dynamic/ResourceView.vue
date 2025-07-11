<template>
  <!-- load spinner before -->
  <Spinner v-if="page_is_loading" />
  <div v-if="page_is_loading === false" class="w-full bg-white">
    <Navbar />
    <div class="w-full flex justify-center flex-wrap">
      <div class="w-[90%] flex flex-wrap">
        <!-- Sticky sidebar -->
        <div class="w-[30%] sticky top-[15vh] self-start">
          <div class="w-full pt-4 pb-4">
            <div
              class="w-full overflow-y-scroll hide-scrollbar bg-white p-4 border-1 border-[#e3e3e3]"
            >
              <div class="w-full pb-4 border-b border-[#82bc00]">
                <p class="font-semibold">Table of Contents</p>
              </div>
              <ul class="content-body px-4 mt-4">
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
        <div class="w-[70%] pl-8">
          <div class="w-[95%] ml-[5%] mt-10 space-y-20">
            <!-- resource details -->
            <div class="w-full">
              <BigTitle :text="resource.Title" title_class="mt-4 text-2xl" />
              <!-- <p class="w-full mt-6">
                {{ resource.short_description ?? resource.description ?? "" }}
              </p> -->
              <!-- author -->
              <div class="w-full flex">
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
                :src="
                  !resource.hero_media.url
                    ? resource.pic
                    : `${resource_image_url}/${resource.hero_media.url}`
                "
                class="w-full h-auto object-cover"
              />
            </div>

            <!-- contents of the resource -->
            <div
              ref="content_body"
              v-html="
                sanitized_resource
                  ? sanitized_resource || sanitized_resource
                  : resource.content_body
              "
              class="w-full mt-10 block"
            ></div>
            <div class="w-full mt-20 flex justify-center flex-wrap">
              <p class="text-lg">Was this helpful?</p>
              <div class="w-full flex justify-center flex-nowrap mt-8">
                <Button
                  class="relative overflow-hidden p-5 px-8 bg-secondary text-white cursor-pointer group"
                >
                  <span class="relative z-10"
                    >Yes, Thank You!
                    <i class="fa-regular fa-paper-plane ml-3"></i
                  ></span>
                  <span
                    class="absolute inset-0 bg-default transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                  ></span>
                </Button>
                <Button
                  class="bg-secondary ml-4 text-white rounded-lg p-3 h-fit w-fit cursor-pointer group"
                >
                  <span class="relative z-10"
                    >No, not really
                    <i class="fa-regular fa-paper-plane ml-3"></i
                  ></span>
                  <span
                    class="absolute inset-0 bg-default transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                  ></span>
                </Button>

                <!-- <SquareButton
                  button_text="No, not really"
                  button_class="bg-secondary ml-4 text-white rounded-lg p-3 h-fit w-fit cursor-pointer"
                  hover_color="bg-default"
                /> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- related blogs -->
    <div
      class="w-full flex flex-wrap justify-center overflow-hidden mt-8 bg-white py-16"
    >
      <div class="w-[90%] flex justify-center flex-wrap">
        <div class="w-full flex">
          <div class="w-3/4">
            <h1 class="text-4xl font-bold mt-4 p-2 ml-[1%]">Recent Posts</h1>
          </div>
          <div class="w-1/4 flex justify-end">
            <Button @click="prevResourceSlide" variant="light" class="mt-4"
              ><i class="fa-solid fa-angle-left"></i
            ></Button>
            <Button @click="nextResourceSlide" variant="light" class="mt-4 ml-4"
              ><i class="fa-solid fa-angle-right"></i
            ></Button>
          </div>
        </div>

        <div class="w-full flex mt-16 overflow-hidden">
          <div
            class="flex flex-nowrap transition-transform duration-500 ease-in-out w-full"
            :style="{
              transform: `translateX(-${current_resource_slide * 100}%)`,
            }"
          >
            <Card
              v-for="(blog, index) in blogs"
              :key="index"
              class="w-[32%] mb-4 m-[1.2%] min-w-[31%] bg-white shadow-none rounded-xl border overflow-hidden zoom-animate"
            >
              <CardHeader class="p-0">
                <CardTitle class="h-[35vh] overflow-hidden"
                  ><img
                    :src="`${image_url}/${blog.hero_media.url}`"
                    class="h-full w-auto min-w-full max-w-none object-cover"
                  />
                </CardTitle>
              </CardHeader>
              <CardTitle class="custom-default-hover mt-4 p-4 text-xl"
                ><router-link :to="`/resources/${is_blog}/${blog.slug}`">{{
                  blog.Title
                }}</router-link></CardTitle
              >
              <CardDescription class="px-4 text-black">
                <div class="w-full flex pb-4 mt-4">
                  <div
                    class="w-[40px] h-[40px] bg-[#556080] rounded-full overflow-hidden flex justify-center"
                  >
                    <div class="h-full flex flex-col justify-center">
                      <i class="fa-solid fa-user text-white"></i>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="font-semibold">{{ blog.author }}</p>
                    <p class="text-sm">{{ `${blog.read_time} mins` }}</p>
                  </div>
                </div>
              </CardDescription>
            </Card>
          </div>
        </div>
      </div>
    </div>
    <!-- end -->
    <!-- footer  -->
    <Cta class="mt-20" />
    <Footer />
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
      is_blog: "blog",
      resource: "",
      sanitized_resource: "",
      resource_image_url: baseUrl,
      blogs: [],
      table_of_contents: [],
      image_url: baseUrl,
      /* resource carousel */
      current_resource_slide: 0,
      total_resource_slides: 2,
    };
  },
  async created() {
    this.page_is_loading = true;

    try {
      await this.get_resource();
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
    async get_resource() {
      try {
        //check the type of service before retrieval
        if (this.type === "story") {
          const { data, error } = await supabase
            .from("success_stories")
            .select("*")
            .eq("title", this.id)
            .limit(1);

          if (error) {
            console.log(error);
            return;
          }
          //map data
          this.resource = data[0];
        } else if (this.type === "blog") {
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
            //fetch other blogs
            this.fetch_blogs();
          } else {
            throw new Error("No data found in response");
          }
        } else if (this.type === "case-study") {
          const { data, error } = await supabase
            .from("case_studies")
            .select("*")
            .eq("title", this.id)
            .limit(1);

          if (error) {
            console.log(error);
            return;
          }
          //map data
          this.resource = data[0];
          console.log(this.resource);
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
