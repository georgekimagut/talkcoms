<template>
  <!-- load spinner before -->
  <Spinner v-if="page_is_loading && !unaivailable_service" />
  <div v-if="unaivailable_service" class="w-full">
    <Navbar
      :services="universal_services"
      :products="universal_products"
      :industries="universal_industries"
    />
    <div class="w-full h-[40vh] flex justify-center relative">
      <HeroPattern />
      <div class="h-full flex flex-col justify-center">
        <h1 class="text-default font-bold text-5xl">
          Service details be upload soon
        </h1>
        <router-link to="/" class="mt-10 flex justify-center"
          ><Button
            class="relative overflow-hidden p-6 px-8 bg-default text-white cursor-pointer group"
          >
            <span class="relative z-10">Go Home</span>
            <span
              class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
            ></span> </Button
        ></router-link>
      </div>
    </div>
    <Footer :services="universal_services" :products="universal_products" />
  </div>
  <div v-if="!page_is_loading && !unaivailable_service" class="w-full">
    <Navbar
      :services="universal_services"
      :products="universal_products"
      :industries="universal_industries"
    />
    <HeroSection
      :small_title="this.id"
      :big_title="single_service.main_title"
      :hero_description="
        single_service.secondary_title
          ? single_service.secondary_title
          : single_service.main_title
      "
      :read_more_link="`/demo/${this.id}`"
      :hero_image="`${image_url}/${
        single_service?.formats?.large?.url || single_service.hero_media?.url
      }`"
      :hero_image_alt="`${single_service.main_title} - Hero image`"
      :demo_link="`/contact/${this.id}`"
      is_service
      :service_icon="`${image_url}/${single_service.icon?.url}`"
    />
    <!-- main features -->
    <div
      v-if="single_service?.main_features"
      class="w-full flex flex-wrap justify-center bg-white !py-10 main-features"
    >
      <div
        class="w-[90%] flex overflow-x-scroll hide-scrollbar relative snap-x snap-mandatory"
      >
        <div
          v-for="(channel, index) in channels"
          :key="index"
          class="shift-hover w-[18%] m-1 p-4 rounded-xl flex-shrink-0 flex-grow min-w-[250px] snap-center card"
        >
          <div
            class="w-[50px] h-[50px] min-w-[50px] min-h-[50px] flex justify-center rounded-sm mt-6 relative overflow-hidden"
          >
            <div
              class="w-full h-full absolute z-5 opacity-30"
              :style="{ backgroundColor: random_bg }"
            ></div>
            <div class="h-full w-full absolute flex justify-center z-10">
              <div class="h-full flex flex-col justify-center">
                <i :style="{ color: random_bg }" :class="channel.icon"></i>
              </div>
            </div>
          </div>
          <div class="bottom-part">
            <h1 class="font-semibold text-xl mt-4 text-default">
              {{ channel.name }}
            </h1>
            <p class="mt-4">
              {{ channel.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- portfolio -->
    <div
      v-if="single_service?.portfolio"
      class="w-full flex justify-center mt-4 hero-component"
    >
      <div class="w-[90%] flex justify-center flex-wrap">
        <div class="w-full flex justify-center">
          <SmallTitle text="PORTFOLIO" text_class="text-center w-full" />
        </div>
        <div class="w-full flex justify-center">
          <BigTitle
            text="For a Clean & Professional Look"
            title_class="text-default text-center mt-6"
          />
        </div>
        <!-- portfolio -->
        <div
          class="w-full flex flex-nowrap mt-4 overflow-scroll hide-scrollbar stories snap-x snap-mandatory gap-4 hero-cards"
        >
          <Card
            v-for="(item, index) in portfolio"
            :key="index"
            class="w-[32%] mb-4 border-0 shadow-none rounded-none bg-body overflow-hidden flex-shrink-0 to-full cursor-pointer duration-300 ease-in custom-card-hover snap-center"
            :class="
              index === 0
                ? 'bg-secondary'
                : index === 1
                ? 'bg-third'
                : 'bg-default'
            "
          >
            <CardHeader class="h-[30vh] p-0 overflow-hidden">
              <img :src="item.pic" class="w-full h-auto max-h-none" />
            </CardHeader>
            <div class="w-full flex flex-wrap justify-center mt-6">
              <div class="w-[60%] flex justify-center">
                <img
                  :src="item.icon"
                  class="h-[70px] w-auto max-w-none object-cover"
                />
              </div>
              <div class="w-[90%] text-white mt-4 pb-4">
                <p class="text-center w-full">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>

    <!-- description -->
    <!-- css only scroll -->
    <div class="w-full flex justify-center py-20 hero-component">
      <div class="w-[90%] flex flex-wrap relative hero-holder">
        <!-- <ScrollPattern :bg_color="random_bg" /> -->
        <!-- Sticky sidebar -->
        <div class="w-[45%] sticky top-[15vh] self-start to-full">
          <div class="w-full overflow-hidden rounded-xl h-[80vh] to-h-fit g">
            <img
              :src="`${image_url}/${
                single_service.feature_section_image?.formats?.large?.url ||
                single_service.feature_section_image?.url
              }`"
              :alt="`${this.id} - Service section image`"
              class="w-full h-full object-cover rounded-xl service-pic"
            />
          </div>
        </div>

        <!-- Scrollable content -->
        <div class="w-[55%] justify-end flex autoShow to-full">
          <div
            class="w-[90%] overflow-hidden transition-all duration-500 relative to-full"
          >
            <h1
              class="text-5xl font-extrabold text-default sticky top-0 self-start py-4"
            >
              {{ this.id }}
              <span class="text-secondary static">Features</span>
            </h1>
            <div class="w-full to-cards">
              <div
                v-for="(feature, index) in single_service.Features"
                :key="index"
                class="w-[90%] py-4 border-b border-[#e3e3e3] card"
              >
                <h1 class="text-xl font-bold mt-4 text-default">
                  {{ feature.title }}
                </h1>
                <p class="text-lg font-semibold mt-4">
                  {{ feature.short_description }}
                </p>
                <p
                  v-for="(child, index) in feature.description"
                  :key="index"
                  class="mt-2 text-[#696969]"
                >
                  <span v-for="(text, index) in child.children" :key="index">
                    {{ text.text }}
                  </span>
                </p>
              </div>
            </div>
            <!-- call to action -->
            <div class="w-full flex mt-8 full-hero">
              <router-link :to="`contact/${this.id}`">
                <Button
                  class="relative overflow-hidden p-6 px-8 bg-default text-white cursor-pointer group"
                >
                  <span class="relative z-10">Request Free Demo</span>
                  <span
                    class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                  ></span>
                </Button>
              </router-link>

              <a
                v-if="single_service.downloadable_files"
                :href="single_service.downloadable_files"
                target="_blank"
              >
                <Button
                  variant="ghost"
                  class="relative overflow-hidden p-6 px-8 text-secondary cursor-pointer group border border-[#82bc00]"
                >
                  <span class="relative z-10 hover:text-[#131f6b]"
                    >Download Material
                  </span>
                  <span
                    class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                  ></span>
                </Button>
              </a>
            </div>
          </div>
        </div>
        <!-- end of sticky -->
      </div>
    </div>
    <!-- end of new scroll -->
    <!-- intergrations -->
    <div
      v-if="single_service.intergration.length > 0"
      class="w-full flex justify-center mt-10 py-28 hero-component"
    >
      <div class="w-[90%] flex gap-4 hero-holder">
        <div class="w-[40%] to-full">
          <div class="w-[90%] flex flex-wrap">
            <SmallTitle text="INTERGRATIONS" />
            <BigTitle
              title_class="mt-10"
              text="Customize your customer experience with custom intergrations"
            />
            <p class="mt-10">
              Create a unique customer experience, customized to your contact
              center operations. Our tools range from fully integrated partners
              like CRMs to digital channels and custom workflow builders.
            </p>
          </div>

          <div class="w-[90%] flex mt-20 full-hero gap-2">
            <router-link to="/contact/get-started">
              <Button
                class="relative overflow-hidden p-6 px-8 bg-default text-white cursor-pointer group"
              >
                <span class="relative z-10">Get Started </span>
                <span
                  class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                ></span>
              </Button>
            </router-link>
            <router-link to="/contact/contact-us">
              <Button
                variant="ghost"
                class="relative overflow-hidden p-6 px-8 text-secondary cursor-pointer group border border-[#82bc00]"
              >
                <span class="relative z-10 hover:text-[#131f6b]"
                  >Learn More
                </span>
                <span
                  class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                ></span>
              </Button>
            </router-link>
          </div>
        </div>
        <div class="w-[60%] to-full">
          <div class="w-full flex flex-wrap to-cards">
            <div
              v-for="(intergration, index) in intergrations"
              :key="index"
              class="shift-hover w-[48%] mr-[2%] p-4 rounded-xl mb-4 card"
            >
              <div
                class="w-[50px] h-[50px] min-w-[50px] min-h-[50px] flex justify-center rounded-sm mt-6 relative overflow-hidden"
              >
                <div
                  class="w-full h-full absolute z-5 opacity-30"
                  :style="{ backgroundColor: random_bg }"
                ></div>
                <div class="h-full w-full absolute flex justify-center z-10">
                  <div class="h-full flex flex-col justify-center">
                    <i
                      :style="{ color: random_bg }"
                      class="fa-solid fa-check"
                    ></i>
                  </div>
                </div>
              </div>
              <div class="bottom-part">
                <h1 class="font-semibold text-xl mt-4 text-default">
                  {{ intergration.feature_name }}
                </h1>
                <p class="mt-4">
                  {{ intergration.feature_description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- PBX -->
    <!-- benefits -->

    <div
      class="w-full flex justify-center py-20 bg-fourth border border-[#007cba] rounded-xl orverflow-hidden hero-component"
    >
      <div class="w-[90%] flex flex-wrap relative hero-holder">
        <!-- <ScrollPattern :bg_color="random_bg" /> -->
        <!-- Scrollable content -->
        <div class="w-[50%] flex justify-end to-full">
          <div
            class="w-[90%] overflow-hidden transition-all duration-500 relative autoShow to-full"
          >
            <h1 class="text-5xl font-extrabold text-default sticky top-0 py-4">
              Here’s Why You’ll Love Talkcoms'
              <span class="text-default">{{ this.id }}</span>
            </h1>
            <div class="w-full to-cards">
              <div
                v-for="(benefit, index) in single_service.benefits"
                :key="index"
                class="w-[90%] flex card"
              >
                <div
                  v-if="benefit.title"
                  class="w-full flex flex-nowrap py-4 border-b border-[#e3e3e3] gap-4"
                >
                  <div class="">
                    <i
                      class="fa-regular fa-circle-check mt-6 text-2xl text-secondary"
                    ></i>
                  </div>
                  <div class="">
                    <h1 class="text-xl font-semibold text-default mt-4">
                      {{ benefit.title }}
                    </h1>
                    <p class="mt-4">
                      {{ benefit.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- call to action -->
            <div class="w-full flex mt-8 full-hero">
              <router-link to="/contact/get-started">
                <Button
                  class="relative overflow-hidden p-6 px-8 bg-default text-white cursor-pointer group"
                >
                  <span class="relative z-10">Get Started </span>
                  <span
                    class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                  ></span>
                </Button>
              </router-link>
            </div>
          </div>
        </div>
        <!-- Sticky sidebar -->
        <div class="w-[50%] sticky top-[15vh] self-start to-full">
          <div class="w-full overflow-hidden rounded-xl h-[80vh]">
            <div class="w-full absolute">
              <div
                class="w-[300px] h-[300px] rounded-xl custom-linear-bg p-5 -z-10"
              ></div>
            </div>
            <div
              class="w-full h-full flex justify-end absolute pattern-to-hide"
            >
              <div class="h-full flex flex-col justify-end">
                <div
                  class="w-[300px] h-[300px] rounded-xl custom-linear-bg p-5 -z-10"
                ></div>
              </div>
            </div>

            <div class="h-full w-full p-8 absolute z-20 to-h-fit">
              <img
                :src="`${image_url}/${
                  single_service.benefits_section_image?.formats?.large?.url ||
                  single_service.benefits_section_image?.url
                }`"
                :alt="`${this.id} - Benefits section image`"
                class="w-full h-full object-cover rounded-xl imageReveal service-pic"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end of content wrapper -->
    <!-- if has free demo -->
    <div class="w-full flex justify-center bg-white pb-20 has_demo">
      <div
        class="w-[80%] flex rounded-2xl h-[65vh] bg-[linear-gradient(to_top_right,_#007cba_75%,_#82bc00_110%)] mt-10 overflow-hidden"
      >
        <div class="w-1/2 h-full overflow-hidden img-holder relative p-8">
          <div
            class="w-[75%] h-[35vh] mt-[15vh] bg-[linear-gradient(to_top_right,_#82bc00_-10%,_#007cba_110%)] rounded-lg"
          ></div>
          <img
            :src="`${image_url}/${
              single_service?.formats?.large?.url ||
              single_service.hero_media?.url
            }`"
            class="object-cover absolute top-[10vh] left-[10%] w-[80%] rounded-lg h-[40vh]"
          />
        </div>
        <div
          class="w-1/2 mr-[1%] h-full p-4 flex flex-col justify-center to-full"
        >
          <BigTitle
            text="Experience the Power—Live!"
            title_class="m-4 text-white text-5xl"
          />
          <p class="text-xl m-4 text-white">
            Get in touch and see how our solution can simplify your workflow and
            boost efficiency-live and personalised.
          </p>

          <router-link :to="`/contact/${this.id}`"
            ><Button
              variant="ghost"
              class="ml-4 relative overflow-hidden p-6 px-8 text-secondary cursor-pointer group bg-white"
            >
              <span class="relative z-10">Book A Call </span>
              <span
                class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
              ></span> </Button
          ></router-link>
        </div>
      </div>
    </div>
    <!-- <div class="w-full flex justify-center bg-white pb-20 has_demo">
      <div
        class="w-[80%] flex rounded-2xl h-[50vh] border border-[#82bc00] mt-32 overflow-hidden"
      >
        <div
          class="w-[64%] mr-[1%] h-full p-4 flex flex-col justify-center to-full"
        >
          <BigTitle text="Experience the Power—Live!" title_class="m-4" />
          <p class="text-xl m-4">
            Book a free book efficiency—live and personalized.
          </p>
          <router-link :to="`/contact/${this.id}`">
            <Button
              variant="ghost"
              class="relative overflow-hidden p-6 px-8 text-secondary cursor-pointer group border border-[#82bc00] m-4"
            >
              <span class="relative z-10 hover:text-[#131f6b]"
                >BOOK A FREE DEMO
              </span>
              <span
                class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
              ></span>
            </Button>
          </router-link>
        </div>
        <div class="w-[35%] flex justify-center overflow-hidden img-holder">
          <img
            :src="`${image_url}/${single_service?.hero_media}`"
            :alt="`${single_service.main_title} - Booka demo image`"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div> -->
    <!-- packages -->
    <!-- v-if="single_service.packages.length > 0" -->
    <div
      v-if="related_story"
      class="w-full flex justify-center bg-white py-16 hero-component"
    >
      <div class="w-[90%] h-fit flex hero-holder">
        <div class="w-1/2 flex h-full justify-center to-full">
          <div class="w-[90%] flex flex-wrap justify-center">
            <div
              class="w-[80%] max-h-[50vh] rounded-2xl flex justify-center overflow-hidden to-full"
            >
              <img
                :src="`${image_url}/${related_story?.image?.url}`"
                :alt="`${related_story?.title} - related story image`"
                class="h-full max-w-none min-w-full min-h-full max-h-none object-cover"
              />
            </div>
          </div>
        </div>
        <div class="w-1/2 to-full">
          <div class="w-[90%] mt-6">
            <h1 class="text-5xl font-bold mt-4 text-default">
              {{ related_story?.title }}
            </h1>
            <p class="mt-4 text-xl">{{ related_story.companyName }}</p>

            <div
              class="w-full h-[26px] flex flex-col justify-center mt-10 to-next-line"
            >
              <p
                class="mt-2 p-1 px-2 border border-[#007cba] rounded-full w-fit"
              >
                {{ this.id }}
              </p>
            </div>
          </div>
          <div class="w-full mt-10 flex">
            <router-link
              :to="`/resources/${success_story}/${related_story.title}`"
              ><Button
                variant="ghost"
                class="relative overflow-hidden p-6 px-8 text-secondary cursor-pointer group border border-[#82bc00]"
              >
                <span class="relative z-10 hover:text-[#131f6b]"
                  >Read Full Story
                </span>
                <span
                  class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                ></span> </Button
            ></router-link>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full flex flex-wrap justify-center overflow-hidden top-56 mt-36 pb-20 packages"
    >
      <div class="w-3/4 flex flex-wrap justify-center">
        <p class="text-secondary flex justify-center text-2xl">
          <SmallTitle text="PACKAGES" />
        </p>

        <h1 class="text-4xl font-extrabold mt-4 p-2 text-center w-full">
          Our Pricing Plans
        </h1>
        <p class="flex text-center mt-2">
          Affordable, flexible, and tailored packages to meet your unique needs.
        </p>
      </div>
      <!-- the packages -->
      <div class="w-[90%] flex flex-wrap justify-center mt-16 inner-package">
        <div
          v-for="(pack, index) in packages"
          :key="index"
          class="w-[22%] ml-[1.5%] relative flex flex-wrap justify-center card"
        >
          <div
            v-if="pack.is_popular === true"
            class="w-[80%] flex justify-center text-sm bg-secondary rounded-t-sm text-white"
          >
            Popular
          </div>

          <!-- Uniform height & flex column layout -->
          <div
            class="w-full flex flex-col justify-between rounded-xl border p-4"
            :class="pack.is_popular ? 'border-[#82bc00]' : 'border-[#e3e3e3]'"
          >
            <!-- Top content -->
            <div>
              <p class="text-secondary font-semibold flex justify-center">
                {{ pack.package_name }}
              </p>
              <p class="mt-8 flex justify-center">
                {{ pack.description }}
              </p>
              <p v-if="pack.package_price" class="mt-8 flex justify-center">
                <span class="text-4xl font-extrabold text-default">
                  ${{ pack.package_price }}
                </span>
                <span class="mr-2 ml-2 text-[#ababab] h-full flex justify-end">
                  /month
                </span>
              </p>
              <div class="w-full p-2 mt-15 border-t-1 border-[#e3e3e3]">
                <div v-html="pack.features"></div>
              </div>
            </div>

            <!-- Button at the bottom -->
            <router-link
              to="/contact/get-started"
              class="w-full flex justify-center p-2 rounded-sm mt-auto"
              :class="
                pack.is_popular
                  ? 'bg-secondary text-white'
                  : 'border border-[#131f6b] text-default btn-hover'
              "
            >
              Get Started
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- related story -->
    <!-- {{ related_story }} -->

    <!-- Cta -->
    <Cta
      cta_class="pt-32"
      :service_cta="single_service?.footer_heading"
      :service_cta_description="single_service?.description_footer"
    />
    <!-- footer -->
    <Footer :services="universal_services" :products="universal_products" />
  </div>
</template>
<script>
import CustomCard from "@/components/ui/card/CustomCard.vue";
import Cta from "@/components/general/Cta.vue";
import Footer from "@/components/general/Footer.vue";
import HeroSection from "@/components/general/HeroSection.vue";
import Navbar from "@/components/general/Navbar.vue";
import ScrollPattern from "../../components/patterns/ScrollPattern.vue";
import Spinner from "@/components/general/Spinner.vue";
import BigTitle from "../../components/text/BigTitle.vue";
import ExternalLink from "../../components/text/ExternalLink.vue";
import SmallTitle from "../../components/text/SmallTitle.vue";
import { text_colors, baseUrl, services_end_point } from "@/store/store";
import { supabase } from "@/lib/supabase";
import { universal_content } from "@/store/contentStore";
import HeroPattern from "@/components/patterns/HeroPattern.vue";

export default {
  name: "SingleService",
  props: ["id"],
  components: {
    Spinner,
    Navbar,
    // RoundedButton,
    Footer,
    SmallTitle,
    HeroPattern,
    BigTitle,
    Cta,
    ScrollPattern,
    ExternalLink,
    // RoundedExternal,
    CustomCard,
    HeroSection,
    // LightButton,
    // DarkButton,
  },
  data() {
    return {
      page_is_loading: true,
      is_side_hero: true,
      unaivailable_service: false,
      //service details
      service: "",
      service_title: "",
      service_description: "",
      service_pic: "",
      content: "",
      features: [],
      benefits: [],
      packages: [
        {
          is_popular: true,
          package_name: "Standard",
          description: "Essential call center features for small teams.",
          package_price: "80",
          features: `
      <li class='list-disc'>Agent License (s)</li>
      <li class='list-disc'>Multi-Level IVR</li>
      <li class='list-disc'>Automatic Call Distributor</li>
      <li class='list-disc'>Call Disposition</li>
      <li class='list-disc'>Call Recording</li>
      <li class='list-disc'>Real-time Reports</li>
      <li class='list-disc'>Voice Channel</li>
    `,
        },
        {
          is_popular: false,
          package_name: "Advanced",
          description: "Includes email support for broader communication.",
          package_price: "120",
          features: `
      <li class='list-disc'>Agent License (s)</li>
      <li class='list-disc'>Multi-Level IVR</li>
      <li class='list-disc'>Automatic Call Distributor</li>
      <li class='list-disc'>Call Disposition</li>
      <li class='list-disc'>Call Recording</li>
      <li class='list-disc'>Real-time Reports</li>
      <li class='list-disc'>Dual Channel (Voice and Email)</li>
    `,
        },
        {
          is_popular: false,
          package_name: "Pro",
          description: "Expand reach with WhatsApp and SMS integration.",
          package_price: "160",
          features: `
      <li class='list-disc'>Agent License (s)</li>
      <li class='list-disc'>Multi-Level IVR</li>
      <li class='list-disc'>Automatic Call Distributor</li>
      <li class='list-disc'>Call Disposition</li>
      <li class='list-disc'>Call Recording</li>
      <li class='list-disc'>Real-time Reports</li>
      <li class='list-disc'>Omni-channel (Voice, Email, SMS, and WhatsApp)</li>
    `,
        },
        {
          is_popular: false,
          package_name: "Enterprise",
          description: "All-in-one solution with CRM and social integration.",
          package_price: "200",
          features: `
      <li class='list-disc'>Agent License (s)</li>
      <li class='list-disc'>Multi-Level IVR</li>
      <li class='list-disc'>Automatic Call Distributor</li>
      <li class='list-disc'>Call Disposition</li>
      <li class='list-disc'>Call Recording</li>
      <li class='list-disc'>Real-time Reports</li>
      <li class='list-disc'>Omni-channel (Voice, Email, SMS, and social media)</li>
      <li class='list-disc'>CRM Integration</li>
    `,
        },
      ],
      intergrations: [],
      services: [],
      service_id: "",
      channels: [],
      portfolio_items: [],
      related_story: [],
      success_story: "story",
      random_bg: "",
      universal_services: [],
      universal_products: [],
      universal_industries: [],
      single_service: [],
      encoded_success_title: "",

      portfolio: [
        {
          name: "Kipkenda ",
          pic: "/static/kipkenda.webp",
          description: "Top tier, full service kenyan law firm",
          icon: "/icons/partners/9.png",
        },
        {
          name: "Chunic LTD ",
          pic: "/static/chunic.jpg",
          description:
            "Logistics company specializing in international Relocation, Sourcing & Procurement and Shipping",
          icon: "/icons/partners/chunic-white.png",
        },
        {
          name: "TKDM",
          pic: "/static/tkdm.webp",
          description: "News & Media Company",
          icon: "/icons/partners/tkdm-white.png",
        },
      ],
      image_url: baseUrl,
    };
  },
  async created() {
    document.title = `Talkcoms | ${this.id}`;
    this.page_is_loading = true;
    this.randomize_color();
    /* set universal color */
    const store = universal_content();
    this.universal_services = store.services;
    this.universal_products = store.products;
    this.universal_industries = store.industries;

    try {
      await this.fetch_services();
      // await this.get_service();
      await this.get_portfolio_items();
      await this.get_main_service_features();
      await this.get_features();
      await this.get_packages();

      // this.services = store.services;
      if (this.service_id != "") {
        this.get_story();
      }
    } catch (error) {
      console.error("Loading failed:", error);
    } finally {
      this.page_is_loading = false;
    }

    //watch route changes
    this.$watch(
      () => this.$route.params,
      async () => {
        this.unaivailable_service = false;
        document.title = `Talkcoms | ${this.id}`;
        this.page_is_loading = true;
        this.randomize_color();
        /* set universal content */
        const store = universal_content();
        this.universal_services = store.services;
        this.universal_products = store.products;
        this.universal_industries = store.industries;

        try {
          await this.fetch_services();
          // await this.fetch_related_story();
          // await this.get_service();
          await this.get_portfolio_items();
          await this.get_main_service_features();
          await this.get_features();
          await this.get_packages();

          if (this.service_id != "") {
            this.get_story();
          }
        } catch (error) {
          console.error("Loading failed:", error);
        } finally {
          this.page_is_loading = false;
        }
      }
    );
  },
  methods: {
    /* fetch services */
    async fetch_services() {
      const words = this.id.split(" ").filter((w) => w.trim() !== "");
      const params = new URLSearchParams();

      words.forEach((word, index) => {
        params.append(`filters[$or][${index}][product_name][$containsi]`, word);
      });

      params.append("populate", "*");

      const response = await fetch(
        `${baseUrl}/api/service-pages?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const response_data = await response.json();

      if (response_data.data) {
        // Normalize data to an array
        const dataArray = Array.isArray(response_data.data)
          ? response_data.data
          : [response_data.data];

        // Just take the first result
        this.single_service = dataArray[0];

        if (!this.single_service) {
          this.unaivailable_service = true;
          return;
        }

        // Get the first success_stories title
        const stories = this.single_service.success_stories;
        if (Array.isArray(stories) && stories.length > 0) {
          this.encoded_success_title = encodeURIComponent(
            stories[0]?.title || ""
          );
        }
        this.fetch_related_story();
      } else {
        throw new Error("No data found in response");
      }
    },
    /* fetch story */
    async fetch_related_story() {
      try {
        const response = await fetch(
          `${baseUrl}/api/success-stories/?filters[title][$eq]=${this.encoded_success_title}&populate=*`
        );
        const responseData = await response.json();
        if (responseData.data) {
          console.log("Json data for service names: ", responseData.data);

          const dataArray = Array.isArray(responseData.data)
            ? responseData.data
            : [responseData.data];

          this.related_story = dataArray[0];
        } else {
          console.error("Invalid response structure: ", responseData);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    },
    async get_service() {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("name", this.id)
          .limit(1);

        if (error) {
          console.log(error);
          return;
        }
        if (data.length < 1) {
          this.unaivailable_service = true;
          this.page_is_loading = false;
        }
        this.services = data.map((service) => {
          const { data: imageData } = supabase.storage
            .from("talkcoms")
            .getPublicUrl(`services/${service.pic}`);

          return {
            ...service,
            imageUrl: imageData.publicUrl,
          };
        });

        //map data
        this.service = this.services[0];
        this.service_title = this.services[0].title_description;
        this.service_description = this.services[0].product_subtitle;
        this.service_pic = this.services[0].imageUrl;
        this.content = this.services[0].description;
        this.service_id = this.services[0].id;
      } catch (error) {
        console.log(error);
      }
    },
    //randomize color
    randomize_color() {
      const random_color =
        text_colors[Math.floor(Math.random() * text_colors.length)];
      this.random_bg = random_color.color_name;
    },
    async get_features() {
      try {
        const { data, error } = await supabase
          .from("service_features")
          .select("*")
          .eq("service_id", this.service_id);

        if (error) {
          console.log(error);
          return;
        }
        const retrieved_data = data;
        retrieved_data.forEach((feature) => {
          if (feature.is_benefit === true) {
            this.benefits.push(feature);
          } else if (feature.is_intergration === true) {
            this.intergrations.push(feature);
          } else {
            this.features.push(feature);
          }
        });
        // this.features = data;
      } catch (error) {
        console.log(error);
      }
    },
    //carousel scrollbar

    async get_packages() {
      try {
        const { data, error } = await supabase
          .from("service_packages")
          .select("*")
          .eq("service_id", this.service_id);

        if (error) {
          console.log(error);
          return;
        }
        this.packages = data;
      } catch (error) {
        console.log(error);
      }
    },
    async get_main_service_features() {
      try {
        const { data, error } = await supabase
          .from("main_service_features")
          .select("*")
          .eq("service_id", this.service_id);

        if (error) {
          console.log(error);
          return;
        }
        this.channels = data;
      } catch (error) {
        console.log(error);
      }
    },
    async get_portfolio_items() {
      try {
        const { data, error } = await supabase
          .from("portfolio")
          .select("*")
          .eq("service_id", this.service_id);

        if (error) {
          console.log(error);
          return;
        }
        this.portfolio_items = data;
      } catch (error) {
        console.log(error);
      }
    },
    async get_story() {
      try {
        const { data, error } = await supabase
          .from("success_stories")
          .select("*")
          .eq("service_id", this.service_id)
          .limit(1);

        if (error) {
          console.log(error);
          return;
        }
        this.related_story = data[0];
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
