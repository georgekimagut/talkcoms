<template>
  <!-- <Chat /> -->
  <!-- back to top -->
  <button
    v-show="isVisible"
    @click="scrollToTop"
    class="fixed z-[1000] bottom-2 right-[4%] w-[50px] h-[50px] flex justify-center rounded-sm overflow-hidden cursor-pointer transition-all duration-300"
    aria-label="Back to top"
  >
    <div class="w-full h-full bg-default"></div>
    <div class="w-full h-full flex justify-center absolute">
      <div class="h-full flex flex-col justify-center">
        <i class="fa-solid fa-angle-up text-3xl text-white"></i>
      </div>
    </div>
  </button>
  <!-- end of back to top -->
  <div class="w-full flex flex-wrap mt-32 p-4">
    <div class="w-full flex justify-center newsletter">
      <div class="w-[90%] flex flex-wrap">
        <div class="w-1/2 to-full">
          <p class="text-secondary text-lg">NEWSLETTER</p>
          <h1 class="text-4xl font-extrabold mt-4 w-3/4">
            Join Our Community To Receive
            <span class="ml-1 text-secondary">Updates</span>
          </h1>
        </div>
        <div class="w-1/2 h-full flex flex-col justify-end to-full">
          <div class="w-full flex justify-end">
            <form
              class="h-[55px] w-full min-w-[350px] max-w-[500px] bg-white flex flex-nowrap"
            >
              <Input
                type="email"
                placeholder="Email"
                class="h-full ml-2 w-[80%] border-0"
              />
              <Button
                class="relative overflow-hidden h-full p-5 px-8 bg-secondary text-white cursor-pointer group rounded-l-none"
              >
                <span class="relative z-10">Subscribe</span>
                <span
                  class="absolute inset-0 bg-default transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                ></span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- footer content -->
    <div class="w-full flex justify-center mt-24 footer">
      <div class="w-[90%] flex flex-wrap gap-2">
        <div class="w-[15%] footer-logo p-1">
          <div class="w-full flex justify-center">
            <router-link to="/"
              ><img :src="site_logo" class="w-[80px] mt-4"
            /></router-link>
          </div>

          <div class="w-full mt-2 flex justify-center">Stay Connected</div>
        </div>
        <div class="w-[15%] p-1">
          <p class="mt-2 font-semibold">Company</p>
          <div class="w-full mt-4">
            <p
              v-for="(link, index) in footer_company_links"
              :key="index"
              class="mb-2"
            >
              <router-link :to="link.link" class="hover:text-[#8dc63f]">
                {{ link.title }}
              </router-link>
            </p>
          </div>
        </div>
        <div class="w-[15%] p-1">
          <p class="mt-2 font-semibold">Products</p>
          <div class="w-full mt-4">
            <p v-for="(product, index) in products" :key="index" class="mb-2">
              <router-link
                :to="`/product/${product.product_name}`"
                class="hover:text-[#8dc63f]"
              >
                {{ product.product_name }}
              </router-link>
            </p>
          </div>
        </div>
        <div class="w-[15%] p-1">
          <p class="mt-2 font-semibold">Services</p>
          <div class="w-full mt-4">
            <p v-for="(service, index) in services" :key="index" class="mb-2">
              <router-link
                :to="`/service/${service.product_name}`"
                class="hover:text-[#8dc63f]"
              >
                {{ service.product_name }}
              </router-link>
            </p>
          </div>
        </div>
        <div class="w-[15%] p-1">
          <p class="mt-2 font-semibold">Legal</p>
          <div class="w-full mt-4">
            <p v-for="(legal, index) in footer_legal" :key="index" class="mb-2">
              <router-link :to="legal.link" class="hover:text-[#8dc63f]">
                {{ legal.title }}
              </router-link>
            </p>
          </div>
        </div>
        <div class="w-[15%] p-1 border-l-1 border-[#e3e3e3]">
          <p class="mt-2 font-semibold">Phone</p>
          <div class="w-full mt-4">
            <p
              v-for="(contact, index) in footer_contacts"
              :key="index"
              class="mb-2"
            >
              <a :href="`tel:${contact.title}`" class="hover:text-[#8dc63f]">
                {{ contact.title }}
              </a>
            </p>
            <p class="mt-8 font-semibold">Email</p>
            <div class="w-full mt-4">
              <p
                v-for="(email, index) in footer_emails"
                :key="index"
                class="mb-2"
              >
                <a :href="`mailto:${email.title}`" class="hover:text-[#8dc63f]">
                  {{ email.title }}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- footer bottom -->
    <div class="w-full flex justify-center mt-10">
      <div class="w-3/4 flex p-4 justify-center border-t border-[#e3e3e3]">
        <p class="text-sm text-center">
          <span class="text-secondary mr-2">&copy;</span>Talkcoms 2025. All
          Rights Reserved
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { universal_content } from "@/store/contentStore";
export default {
  name: "Footer",
  props: {
    services: Array,
    products: Array,
  },
  components: {
    /*DefaultInput,*/
    /* Chat */
  },
  data() {
    return {
      isVisible: false,
      site_logo: "/logo.svg",
      footer_company_links: [
        { title: "About us", link: "/about" },
        { title: "Contact us", link: "/contact/contact-us" },
        { title: "Blogs", link: "/blogs" },
      ],
      footer_legal: [
        { title: "Cookie Policy", link: "/legal/cookie-policy" },
        { title: "Terms & Conditions", link: "/legal/Terms & Conditions" },
        { title: "Privacy Policy", link: "/legal/privacy-policy" },
        { title: "Sitemap", link: "/sitemap" },
      ],
      footer_contacts: [],
      footer_emails: [],
      footer_locations: [
        {
          title: "UNITED KINGDOM",
          name: "Barleythorpe Oakham, LE15 7WD, United Kingdom",
        },
        { title: "NAIROBI", name: "Great Jubilee Center, Karen, Nairobi" },
        { title: "ELDAMA RAVINE", name: "Skyrise Plaza, Eldama Ravine" },
      ],
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    /* set universal content */
    this.footer_contacts = universal_content().phones;
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isVisible = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>
