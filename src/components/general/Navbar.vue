<template>
  <div
    class="nav-bar w-full flex justify-center flex-wrap sticky top-0 bg-white z-[1000] border-b-1 border-[#e3e3e3]"
  >
    <div class="w-[90%] h-[12vh] flex justify-center">
      <div class="w-full flex">
        <div class="w-fit flex justify-start p-4">
          <router-link to="/"
            ><img :src="site_logo" class="custom-logo min-w-[50px]"
          /></router-link>
        </div>
        <div
          class="nav-bar-innner w-3/4 flex flex-nowrap h-full justify-center"
        >
          <router-link
            to="/"
            class="pl-4 pr-4 h-full flex flex-col justify-center transition duration-500 ease-in-out p-4 text-lg"
            active-class="text-secondary font-medium"
          >
            Home
          </router-link>
          <div
            class="pl-4 pr-4 h-full flex flex-col justify-center transition duration-500 ease-in-out p-4 relative drop-resource"
            active-class="text-secondary font-medium"
          >
            <div
              class="w-full h-full flex flex-row cursor-pointer custom-default-hover"
            >
              <div class="h-full flex flex-col justify-center text-lg">
                Products
              </div>
              <div class="h-full flex flex-col justify-center ml-1 mt-1">
                <i class="fa-solid fa-angle-down"></i>
              </div>
            </div>
            <div
              class="w-[250px] absolute bg-white p-4 pt-0 top-[11vh] z-[100] resource-dropdown border border-[#e3e3e3] rounded-b-sm shadow-2xl"
            >
              <li
                v-for="(product, index) in products"
                :key="index"
                class="mb-2 list-none"
              >
                <router-link
                  :to="`/service/${product.name}`"
                  class="custom-default-hover"
                  >{{ product.name }}</router-link
                >
              </li>
            </div>
          </div>

          <div
            class="pl-4 pr-4 h-full flex flex-col justify-center transition duration-500 ease-in-out p-4 relative drop-resource"
            active-class="text-secondary font-medium"
          >
            <div
              class="w-full h-full flex flex-row cursor-pointer custom-default-hover"
            >
              <div class="h-full flex flex-col justify-center text-lg">
                Services
              </div>
              <div class="h-full flex flex-col justify-center ml-1 mt-1">
                <i class="fa-solid fa-angle-down"></i>
              </div>
            </div>
            <div
              class="w-[250px] absolute bg-white p-4 pt-2 top-[11vh] z-[100] resource-dropdown border border-[#e3e3e3] rounded-b-sm shadow-2xl"
            >
              <li
                v-for="(service, index) in services"
                :key="index"
                class="my-2 list-none"
              >
                <router-link
                  :to="`/service/${service.product_name}`"
                  class="custom-default-hover"
                  >{{ service.product_name }}</router-link
                >
              </li>
            </div>
          </div>

          <div
            class="pl-4 pr-4 h-full flex flex-col justify-center transition duration-500 ease-in-out p-4 relative drop-resource"
            active-class="text-secondary font-medium"
          >
            <div
              class="w-full h-full flex flex-row cursor-pointer custom-default-hover"
            >
              <div class="h-full flex flex-col justify-center text-lg">
                Solutions By Industry
              </div>
              <div class="h-full flex flex-col justify-center ml-1 mt-1">
                <i class="fa-solid fa-angle-down"></i>
              </div>
            </div>
            <div
              class="w-[250px] absolute bg-white p-4 pt-0 top-[11vh] z-[100] resource-dropdown border border-[#e3e3e3] rounded-b-sm shadow-2xl"
            >
              <li
                v-for="(industry, index) in industries"
                :key="index"
                class="mb-2 list-none"
              >
                <router-link
                  :to="`/solution/${industry.name}`"
                  class="custom-default-hover"
                  >{{ industry.name }}</router-link
                >
              </li>
            </div>
          </div>
          <!-- <router-link
            to="#"
            class="pl-4 pr-4 h-full flex flex-col justify-center transition duration-500 ease-in-out p-4"
            @mouseenter="show_service_dropdown('solution')"
            @mouseleave="hide_service_dropdown('solution')"
          >
            <div class="w-full h-full flex flex-row">
              <div class="h-full flex flex-col justify-center">
                Solutions By Industry
              </div>
              <div class="h-full flex flex-col justify-center ml-1 mt-1">
                <i
                  class="fa-solid fa-angle-down transition-all duration-300 ease-in-out"
                  :style="{
                    transform: solutions_dropdown
                      ? 'rotate(180deg) translateY(2px)'
                      : 'rotate(0deg) translateY(0)',
                  }"
                ></i>
              </div>
            </div>
          </router-link> -->
          <div
            class="pl-4 pr-4 h-full flex flex-col justify-center transition duration-500 ease-in-out p-4 relative drop-resource"
            active-class="text-secondary font-medium"
          >
            <div
              class="w-full h-full flex flex-row cursor-pointer custom-default-hover"
            >
              <div class="h-full flex flex-col justify-center text-lg">
                Resources
              </div>
              <div class="h-full flex flex-col justify-center ml-1 mt-1">
                <i class="fa-solid fa-angle-down"></i>
              </div>
            </div>
            <div
              class="w-[200px] absolute bg-white p-4 pt-0 top-[11vh] z-[100] resource-dropdown border border-[#e3e3e3] rounded-b-sm shadow-2xl"
            >
              <li class="my-2 list-none">
                <router-link to="/blogs" class="custom-default-hover"
                  >Blogs</router-link
                >
              </li>
              <li class="my-2 list-none">
                <router-link to="/success-stories" class="custom-default-hover"
                  >Success stories</router-link
                >
              </li>
              <li class="my-2 list-none">
                <router-link to="/testimonials" class="custom-default-hover"
                  >Testimonials</router-link
                >
              </li>
              <li class="my-2 list-none">
                <router-link to="/faqs" class="custom-default-hover"
                  >FAQs</router-link
                >
              </li>
            </div>
          </div>
          <router-link
            to="/about"
            class="pl-4 pr-4 h-full flex flex-col justify-center transition duration-500 ease-in-out p-4 custom-default-hover text-lg"
            active-class="text-secondary font-medium"
            >About us</router-link
          >
        </div>
        <div class="w-1/6 flex justify-end p-4 btn-side">
          <!-- <Button button_link="/contact-us" button_text="Contact Us" /> -->
          <router-link to="/contact/book-a-demo">
            <Button
              class="relative overflow-hidden p-6 px-8 bg-default text-white cursor-pointer group"
            >
              <span class="relative z-10">Book A Demo </span>
              <span
                class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
              ></span>
            </Button>
            <!-- <Button v-if="pre_buttons" variant="light"
                >Book A Demo
                <i class="fa-solid fa-angle-right mt-[10%] icon"></i></Button
            > -->
          </router-link>
          <router-link to="/contact/contact-us" class="ml-4">
            <Button
              variant="ghost"
              class="relative overflow-hidden p-6 px-8 text-secondary cursor-pointer group border border-[#82bc00]"
            >
              <span class="relative z-10 hover:text-[#131f6b]"
                >Contact Us
              </span>
              <span
                class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
              ></span>
            </Button>
            <!-- <Button variant="dark"
                >Contact Us
                <i class="fa-solid fa-angle-right mt-[10%] icon"></i></Button
            > -->
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <!-- phone navigation -->
  <div
    class="nav-bar-phone w-full flex justify-center flex-wrap sticky top-0 bg-white z-[1000] border-b-1 border-[#e3e3e3]"
  >
    <div class="w-[90%] h-fit flex py-2">
      <div class="w-1/2">
        <div class="h-full flex flex-col justify-center">
          <router-link to="/"
            ><img :src="site_logo" class="w-[40px] h-[40px] min-w-[50px]"
          /></router-link>
        </div>
      </div>
      <div class="w-1/2 flex justify-end">
        <div class="h-full flex flex-col justify-center">
          <i
            @click="phone_navigation = !phone_navigation"
            class="fa-solid text-xl cursor-pointer text-secondary border border-[#82bc00] px-3 py-2 rounded-sm"
            :class="phone_navigation ? 'fa-close' : 'fa-bars'"
          ></i>
        </div>
      </div>
    </div>
    <!-- navigation body -->
  </div>
  <div v-if="phone_navigation" class="w-full sticky top-0 h-[100vh] z-[1500]">
    <div class="w-full h-full sticky top-0">
      <div class="w-full h-full relative">
        <div
          @click="phone_navigation = false"
          class="w-full h-full bg-default opacity-50 absolute z-[-1y]"
        ></div>
        <div
          class="w-[70%] max-w-[400px] h-full bg-white py-4 absolute z-2000 overflow-y-scroll hide-scrollbar"
        >
          <div class="w-full mb-4">
            <router-link
              to="/"
              class="pl-4 pr-4 h-full flex flex-col justify-center transition duration-500 ease-in-out p-4c"
              active-class="text-secondary font-medium"
            >
              Home
            </router-link>
          </div>
          <div
            class="pl-4 mb-4 pr-4 w-full flex flex-col justify-center transition duration-500 ease-in-out relative drop-resource"
            active-class="text-secondary font-medium"
          >
            <div
              @click="product_is_visible = !product_is_visible"
              class="w-full h-full flex flex-row cursor-pointer custom-default-hover"
            >
              <div class="h-full flex flex-col justify-center">Products</div>
              <div class="h-full flex flex-col justify-center ml-1 mt-1">
                <i class="fa-solid fa-angle-down"></i>
              </div>
            </div>
            <div
              v-if="product_is_visible"
              class="w-fit bg-white pt-2 border-y mt-4 rounded-b-sm"
            >
              <li
                v-for="(product, index) in products"
                :key="index"
                class="mb-2 list-none"
              >
                <router-link
                  :to="`/service/${product.name}`"
                  class="custom-default-hover"
                  >{{ product.name }}</router-link
                >
              </li>
            </div>
          </div>

          <div
            class="pl-4 mb-4 pr-4 w-full flex flex-col justify-center transition duration-500 ease-in-out relative drop-resource"
            active-class="text-secondary font-medium"
          >
            <div
              @click="service_is_visible = !service_is_visible"
              class="w-full h-full flex flex-row cursor-pointer custom-default-hover"
            >
              <div class="h-full flex flex-col justify-center">Services</div>
              <div class="h-full flex flex-col justify-center ml-1 mt-1">
                <i class="fa-solid fa-angle-down"></i>
              </div>
            </div>
            <div
              v-if="service_is_visible"
              class="w-fit bg-white pt-2 border-y mt-4 rounded-b-sm"
            >
              <li
                v-for="(service, index) in services"
                :key="index"
                class="my-2 list-none"
              >
                <router-link
                  :to="`/service/${service.product_name}`"
                  class="custom-default-hover"
                  >{{ service.product_name }}</router-link
                >
              </li>
            </div>
          </div>
          <!-- item -->
          <div
            class="pl-4 pr-4 w-full flex flex-col justify-center transition duration-500 ease-in-out mb-4 relative drop-resource"
            active-class="text-secondary font-medium"
          >
            <div
              @click="industry_is_visible = !industry_is_visible"
              class="w-full h-full flex flex-row cursor-pointer custom-default-hover"
            >
              <div class="h-full flex flex-col justify-center">
                Solutions By Industry
              </div>
              <div class="h-full flex flex-col justify-center ml-1 mt-1">
                <i class="fa-solid fa-angle-down"></i>
              </div>
            </div>
            <div
              v-if="industry_is_visible"
              class="w-fit bg-white pt-2 border-y mt-4 rounded-b-sm"
            >
              <li
                v-for="(industry, index) in industries"
                :key="index"
                class="mb-2 list-none"
              >
                <router-link
                  :to="`/solution/${industry.name}`"
                  class="custom-default-hover"
                  >{{ industry.name }}</router-link
                >
              </li>
            </div>
          </div>
          <!-- item -->
          <div
            class="pl-4 pr-4 w-full flex flex-col justify-center transition duration-500 ease-in-out mb-4 relative drop-resource"
            active-class="text-secondary font-medium"
          >
            <div
              @click="resource_is_visible = !resource_is_visible"
              class="w-full h-full flex flex-row cursor-pointer custom-default-hover"
            >
              <div class="h-full flex flex-col justify-center">Resources</div>
              <div class="h-full flex flex-col justify-center ml-1 mt-1">
                <i class="fa-solid fa-angle-down"></i>
              </div>
            </div>
            <div
              v-if="resource_is_visible"
              class="w-fit bg-white pt-2 border-y mt-4 rounded-b-sm"
            >
              <li class="my-2 list-none">
                <router-link to="/blogs" class="custom-default-hover"
                  >Blogs</router-link
                >
              </li>
              <li class="my-2 list-none">
                <router-link to="/success-stories" class="custom-default-hover"
                  >Success stories</router-link
                >
              </li>
              <li class="my-2 list-none">
                <router-link to="/testimonials" class="custom-default-hover"
                  >Testimonials</router-link
                >
              </li>
              <li class="my-2 list-none">
                <router-link to="/faqs" class="custom-default-hover"
                  >FAQs</router-link
                >
              </li>
            </div>
          </div>
          <!-- item -->
          <div class="w-full mb-4">
            <router-link
              to="/about"
              class="pl-4 pr-4 h-full flex flex-col justify-center transition duration-500 ease-in-out p-4 custom-default-hover"
              active-class="text-secondary font-medium"
              >About us</router-link
            >
          </div>
          <!-- item -->
          <div class="w-full pl-4 pr-4 flex flex-col gap-1">
            <router-link to="/contact/book-a-demo">
              <Button
                class="relative overflow-hidden p-5 px-8 bg-default text-white cursor-pointer group"
              >
                <span class="relative z-10">Book A Demo </span>
                <span
                  class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                ></span>
              </Button>
              <!-- <Button v-if="pre_buttons" variant="light"
                >Book A Demo
                <i class="fa-solid fa-angle-right mt-[10%] icon"></i></Button
            > -->
            </router-link>
            <router-link to="/contact/contact-us">
              <Button
                variant="ghost"
                class="relative overflow-hidden p-6 px-8 text-secondary cursor-pointer group border border-[#82bc00]"
              >
                <span class="relative z-10 hover:text-[#131f6b]"
                  >Contact Us
                </span>
                <span
                  class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                ></span>
              </Button>
              <!-- <Button variant="dark"
                >Contact Us
                <i class="fa-solid fa-angle-right mt-[10%] icon"></i></Button
            > -->
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import DefaultButton from "./buttons/RoundedButton.vue";
import { supabase } from "@/lib/supabase";
import Link from "../text/Link.vue";
// import DarkButton from "./ui/button/DarkButton.vue";
// import Button from "../ui/button/Button.vue";

export default {
  name: "Navbar",
  props: {
    services: Array,
  },
  components: { /*DefaultButton,*/ Link /*DarkButton*/ },
  data() {
    return {
      service_dropdown: false,
      product_dropdown: false,
      solutions_dropdown: false,
      phone_navigation: false,
      resource_is_visible: false,
      product_is_visible: false,
      service_is_visible: false,
      industry_is_visible: false,
      site_logo: "/logo.svg",
      products: [],
      socials: [
        {
          link: "#",
          icon: "fa-solid fa-phone",
          name: "phone",
          phone: "0759200998",
        },
        {
          link: "https://www.facebook.com/TalkcomsLimited",
          icon: "fa-brands fa-facebook-f",
          name: "facebook",
        },
        {
          link: "https://x.com/TALKCOMS1",
          icon: "fa-brands fa-x-twitter",
          name: "twitter",
        },
        {
          link: "https://www.linkedin.com/company/talkcoms-ltd/mycompany",
          icon: "fa-brands fa-linkedin-in",
          name: "linkedin",
        },
        {
          link: "https://www.instagram.com/talkcoms",
          icon: "fa-brands fa-instagram",
          name: "linkedin",
        },
      ],
      // services: [],
      fields: [
        { name: "Information Technology" },
        { name: "Healthcare" },
        { name: "Banking" },
        { name: "Saccos and Chamas" },
        { name: "Travel & Logistics" },
        { name: "Insurance" },
      ],
      departments: [],
      industries: [],
    };
  },
  created() {
    this.get_services();
    this.get_solutions();
  },
  methods: {
    // show_service_dropdown(key) {
    //   if (key === "service") {
    //     this.service_dropdown = true;
    //   } else if (key === "product") {
    //     this.product_dropdown = true;
    //   } else if (key === "solution") {
    //     this.solutions_dropdown = true;
    //   }
    // },
    // hide_service_dropdown(key) {
    //   if (key === "service") {
    //     this.service_dropdown = false;
    //   } else if (key === "product") {
    //     this.product_dropdown = false;
    //   } else if (key === "solution") {
    //     this.solutions_dropdown = false;
    //   }
    // },
    async get_services() {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("id, name, title_description, is_product")
          .order("created_at", { ascending: false });

        const retrieved_data = data.map((service) => {
          const { data: imageData } = supabase.storage
            .from("talkcoms")
            .getPublicUrl(`services/${service.pic}`);

          return {
            ...service,
            pic: imageData.publicUrl,
          };
        });
        retrieved_data.forEach((item) => {
          if (item.is_product === 1) {
            this.products.push(item);
          } else {
            // this.services.push(item);
          }
        });

        if (error) {
          console.log(error);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    },
    //get solutions
    async get_solutions() {
      try {
        const { data, error } = await supabase
          .from("solutions_by_industry")
          .select("id, name, is_department")
          .order("created_at", { ascending: false });

        this.industries = data;
        // const retrieved_data = data;
        // retrieved_data.forEach((item) => {
        //   if (item.is_department === true) {
        //     this.departments.push(item);
        //   } else {
        //     this.industries.push(item);
        //   }
        // });
        if (error) {
          console.log(error);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
