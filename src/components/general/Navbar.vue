<template>
  <div
    class="nav-bar w-full flex justify-center flex-wrap sticky top-0 bg-white z-[1000] border-b-1 border-[#e3e3e3]"
  >
    <div class="w-[90%] h-[12vh] flex justify-center">
      <div class="w-full h-full flex">
        <div class="w-fit h-full flex justify-start p-4">
          <div class="h-full flex flex-col justify-center">
            <router-link to="/"
              ><img :src="site_logo" class="custom-logo min-w-[50px]"
            /></router-link>
          </div>
        </div>
        <div
          class="nav-bar-innner w-3/4 flex flex-nowrap h-full justify-center"
        >
          <router-link
            to="/"
            class="pl-4 pr-4 h-full flex flex-col justify-center transition duration-500 ease-in-out p-4"
            active-class="text-secondary font-medium"
          >
            Home
          </router-link>
          <div
            class="pl-4 pr-4 h-full flex flex-col justify-center transition duration-500 ease-in-out p-4 relative group"
            active-class="text-secondary font-medium"
          >
            <div
              class="w-full h-full flex flex-row cursor-pointer custom-default-hover"
            >
              <div class="h-full flex flex-col justify-center">Products</div>
              <div class="h-full flex flex-col justify-center ml-1 mt-1">
                <i
                  class="fa-solid fa-angle-down transition-all duration-300 group-hover:rotate-180"
                ></i>
              </div>
            </div>
            <div
              class="w-[250px] absolute bg-white p-4 pt-0 top-[12vh] z-[100] border border-[#e3e3e3] rounded-b-sm shadow-2xl hidden group-hover:block"
            >
              <li
                v-for="(product, index) in products"
                :key="index"
                class="mb-2 list-none"
              >
                <router-link
                  :to="`/product/${product.product_name}`"
                  class="custom-default-hover"
                  >{{ product.product_name }}</router-link
                >
              </li>
            </div>
          </div>

          <div
            class="pl-4 pr-4 h-full flex flex-col justify-center transition duration-500 ease-in-out p-4 relative group"
            active-class="text-secondary font-medium"
          >
            <div
              class="w-full h-full flex flex-row cursor-pointer custom-default-hover"
            >
              <div class="h-full flex flex-col justify-center">Services</div>
              <div class="h-full flex flex-col justify-center ml-1 mt-1">
                <i
                  class="fa-solid fa-angle-down transition-all duration-300 group-hover:rotate-180"
                ></i>
              </div>
            </div>
            <div
              class="w-[250px] absolute bg-white p-4 pt-0 top-[12vh] z-[100] border border-[#e3e3e3] rounded-b-sm shadow-2xl hidden group-hover:block"
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
            class="pl-4 pr-4 h-full flex flex-col justify-center transition duration-500 ease-in-out p-4 relative group"
            active-class="text-secondary font-medium"
          >
            <div
              class="w-full h-full flex flex-row cursor-pointer custom-default-hover"
            >
              <div class="h-full flex flex-col justify-center">
                Solutions By Industry
              </div>
              <div class="h-full flex flex-col justify-center ml-1 mt-1">
                <i
                  class="fa-solid fa-angle-down transition-all duration-300 group-hover:rotate-180"
                ></i>
              </div>
            </div>
            <div
              class="w-[250px] absolute bg-white p-4 pt-0 top-[12vh] z-[100] border border-[#e3e3e3] rounded-b-sm shadow-2xl hidden group-hover:block"
            >
              <li
                v-for="(industry, index) in industries"
                :key="index"
                class="mb-2 list-none"
              >
                <router-link
                  :to="`/solution/${industry.main_title}`"
                  class="custom-default-hover"
                  >{{ industry.main_title }}</router-link
                >
              </li>
            </div>
          </div>

          <div
            class="pl-4 pr-4 h-full flex flex-col justify-center transition duration-500 ease-in-out p-4 relative group"
            active-class="text-secondary font-medium"
          >
            <div
              class="w-full h-full flex flex-row cursor-pointer custom-default-hover"
            >
              <div class="h-full flex flex-col justify-center">Resources</div>
              <div class="h-full flex flex-col justify-center ml-1 mt-1">
                <i
                  class="fa-solid fa-angle-down transition-all duration-300 group-hover:rotate-180"
                ></i>
              </div>
            </div>
            <div
              class="w-[200px] absolute bg-white p-4 pt-0 top-[12vh] z-[100] border border-[#e3e3e3] rounded-b-sm shadow-2xl hidden group-hover:block"
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
            class="pl-4 pr-4 h-full flex flex-col justify-center transition duration-500 ease-in-out p-4 custom-default-hover"
            active-class="text-secondary font-medium"
            >About us</router-link
          >
        </div>
        <div class="w-1/6 h-full flex justify-end p-4 btn-side">
          <!-- <Button button_link="/contact-us" button_text="Contact Us" /> -->
          <div class="h-full flex flex-col justify-center">
            <router-link to="/contact/book-a-demo">
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
          <div class="h-full flex flex-col justify-center">
            <router-link to="/contact/contact-us" class="ml-4">
              <Button
                class="relative bg-secondary overflow-hidden p-6 px-8 text-white cursor-pointer group"
              >
                <span class="relative z-10">Contact Us </span>
                <span
                  class="absolute inset-0 bg-default transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                ></span>
              </Button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- phone navigation -->
  <div
    class="nav-bar-phone w-full flex justify-center flex-wrap sticky top-0 bg-white z-[1000] border-b-1 border-[#e3e3e3]"
  >
    <div class="w-[90%] h-fit flex py-2 ml-[5%]">
      <div class="w-1/2">
        <div class="h-full flex flex-col justify-center">
          <router-link to="/"
            ><img :src="site_logo" class="w-[45px] h-auto"
          /></router-link>
        </div>
      </div>
      <div class="w-1/2 flex justify-end">
        <div class="h-full flex flex-col justify-center">
          <div
            @click="phone_navigation = !phone_navigation"
            class="p-2 py-[10px] rounded-sm border-2 border-[#82bc00] group cursor-pointer w-fit"
          >
            <!-- Top bar -->
            <div
              class="w-[30px] h-[3px] bg-secondary transition-transform duration-300 origin-center"
              :class="phone_navigation ? 'rotate-45 translate-y-[10px]' : ''"
            ></div>

            <!-- Middle bar -->
            <div
              class="w-[30px] h-[3px] bg-secondary my-[6px] transition-opacity duration-300"
              :class="phone_navigation ? 'opacity-0' : 'opacity-100'"
            ></div>

            <!-- Bottom bar -->
            <div
              class="w-[30px] h-[3px] bg-secondary transition-transform duration-300 origin-center"
              :class="phone_navigation ? '-rotate-45 -translate-y-[9px] ' : ''"
            ></div>
          </div>

          <!-- <i
            @click="phone_navigation = !phone_navigation"
            class="fa-solid text-xl cursor-pointer text-secondary border border-[#82bc00] px-3 py-2 rounded-sm"
            :class="phone_navigation ? 'fa-close' : 'fa-bars'"
          ></i> -->
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
          class="w-[70%] max-w-[400px] h-full bg-white py-4 absolute z-2000 overflow-y-scroll hide-scrollbar nav-bar-move-in"
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
            class="pl-4 mb-4 pr-4 w-full flex flex-col justify-center transition duration-500 ease-in-out relative"
            active-class="text-secondary font-medium"
          >
            <div
              @click="product_is_visible = !product_is_visible"
              class="w-full h-full flex flex-row cursor-pointer custom-default-hover"
            >
              <div class="h-full flex flex-col justify-center">Products</div>
              <div class="h-full flex flex-col justify-center ml-1 mt-1">
                <i
                  class="fa-solid fa-angle-down transition-all duration-300"
                  :class="product_is_visible ? 'rotate-180' : ''"
                ></i>
              </div>
            </div>
            <div
              :class="[
                'w-fit bg-white border-y dropdown-animated',
                product_is_visible ? 'show' : '',
              ]"
            >
              <li
                v-for="(product, index) in products"
                :key="index"
                class="mt-2 mb-4 list-none"
              >
                <router-link
                  :to="`/service/${product.product_name}`"
                  class="custom-default-hover"
                  >{{ product.product_name }}</router-link
                >
              </li>
            </div>
          </div>

          <div
            class="pl-4 mb-4 pr-4 w-full flex flex-col justify-center transition duration-500 ease-in-out relative"
            active-class="text-secondary font-medium"
          >
            <div
              @click="service_is_visible = !service_is_visible"
              class="w-full h-full flex flex-row cursor-pointer custom-default-hover"
            >
              <div class="h-full flex flex-col justify-center">Services</div>
              <div class="h-full flex flex-col justify-center ml-1 mt-1">
                <i
                  class="fa-solid fa-angle-down transition-all duration-300"
                  :class="service_is_visible ? 'rotate-180' : ''"
                ></i>
              </div>
            </div>
            <div
              :class="[
                'w-fit bg-white border-y dropdown-animated',
                service_is_visible ? 'show' : '',
              ]"
            >
              <li
                v-for="(service, index) in services"
                :key="index"
                class="my-2 mb-4 list-none"
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
            class="pl-4 pr-4 w-full flex flex-col justify-center transition duration-500 ease-in-out mb-4 relative"
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
                <i
                  class="fa-solid fa-angle-down transition-all duration-300"
                  :class="industry_is_visible ? 'rotate-180' : ''"
                ></i>
              </div>
            </div>
            <div
              :class="[
                'w-fit bg-white border-y dropdown-animated',
                industry_is_visible ? 'show' : '',
              ]"
            >
              <li
                v-for="(industry, index) in industries"
                :key="index"
                class="mt-2 mb-4 list-none"
              >
                <router-link
                  :to="`/solution/${industry.main_title}`"
                  class="custom-default-hover"
                  >{{ industry.main_title }}</router-link
                >
              </li>
            </div>
          </div>
          <!-- item -->
          <div
            class="pl-4 pr-4 w-full flex flex-col justify-center transition duration-500 ease-in-out mb-4 relative"
            active-class="text-secondary font-medium"
          >
            <div
              @click="resource_is_visible = !resource_is_visible"
              class="w-full h-full flex flex-row cursor-pointer custom-default-hover"
            >
              <div class="h-full flex flex-col justify-center">Resources</div>
              <div class="h-full flex flex-col justify-center ml-1 mt-1">
                <i
                  class="fa-solid fa-angle-down transition-all duration-300"
                  :class="resource_is_visible ? 'rotate-180' : ''"
                ></i>
              </div>
            </div>
            <div
              :class="[
                'w-fit bg-white border-y dropdown-animated',
                resource_is_visible ? 'show' : '',
              ]"
            >
              <li class="my-2 mb-4 list-none">
                <router-link to="/blogs" class="custom-default-hover"
                  >Blogs</router-link
                >
              </li>
              <li class="my-2 mb-4 list-none">
                <router-link to="/success-stories" class="custom-default-hover"
                  >Success stories</router-link
                >
              </li>
              <li class="my-2 mb-4 list-none">
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
              class="pl-4 pr-4 h-full flex flex-col justify-center transition duration-500 ease-in-out custom-default-hover"
              active-class="text-secondary font-medium"
              >About us</router-link
            >
          </div>
          <!-- item -->
          <div class="w-full pl-4 pr-4 flex flex-col gap-1">
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
            <router-link to="/contact/contact-us">
              <Button
                class="relative bg-secondary overflow-hidden p-6 px-8 text-white cursor-pointer group"
              >
                <span class="relative z-10">Contact Us </span>
                <span
                  class="absolute inset-0 bg-default transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                ></span>
              </Button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  props: {
    services: Array,
    products: Array,
    industries: Array,
  },

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
      observer: null,
    };
  },
  // check width
  methods: {
    checkWidth() {
      if (window.innerWidth >= 1300) {
        this.phone_navigation = false;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.checkWidth);
    // Also check on page load
    this.checkWidth();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkWidth);
  },
};
</script>
