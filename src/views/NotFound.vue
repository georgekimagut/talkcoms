<template>
  <!-- title -->
  <div class="w-full flex justify-center mt-10">
    <h1 class="text-4xl font-bold text-default">Page Not Found</h1>
  </div>
  <!-- icon -->
  <div class="w-full flex justify-center" style="height: 50vh">
    <div class="h-full flex flex-col justify-center">
      <div class="relative rounded-sm" style="width: 200px; height: 150px">
        <!-- dot -->
        <div class="w-full flex justify-center absolute z-30">
          <div class="small-dot bg-default w-6 h-6 rounded-full"></div>
        </div>
        <!-- handle -->
        <div class="w-full flex justify-center position-absolute z-10">
          <div
            class="w-1/2 absolute border-l border-t border-[#262262] rotate-45 rounded-s-sm mt-8"
            style="height: 100px"
          ></div>
        </div>
        <!-- box itself -->
        <div
          class="w-full absolute z-30 top-14 rounded-sm bg-white bounce-twice"
        >
          <div
            class="w-full bg-linear-[25deg,#262262_40%,#1D65AB_60%,#8DC63F_90%] h-5 rounded-t-lg flex flex-nowrap p-2"
          >
            <div class="w-2 h-2 rounded-full bg-white mr-2"></div>
            <div class="w-2 h-2 rounded-full bg-white mr-2"></div>
            <div class="w-2 h-2 rounded-full bg-white mr-2"></div>
          </div>
          <div class="w-full mt-4">
            <p class="w-full flex justify-center p-2 text-2xl">Error</p>
            <h1
              class="w-full flex justify-center p-2 text-5xl font-bold text-secondary"
            >
              404
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- other body -->
  <div class="mt-20 w-full">
    <div class="w-full flex justify-center">
      <router-link to="/">
        <Button
          class="relative overflow-hidden p-6 px-8 bg-default text-white cursor-pointer group"
        >
          <span class="relative z-10">Go Home</span>
          <span
            class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
          ></span> </Button
      ></router-link>
    </div>
    <div class="mt-8 w-full flex justify-center">
      <p class="w-1/2">
        The page you are looking for does not exist or might be redirected to
        another url. Please go back home.
      </p>
    </div>
  </div>
  <!-- footer -->
  <Footer :services="services" />
</template>
<script>
import Footer from "@/components/general/Footer.vue";
import { universal_content } from "@/store/contentStore";
export default {
  name: "NotFound",
  components: { Footer },
  data() {
    return {
      services: [],
    };
  },
  mounted() {
    this.services = universal_content().services;
  },
};
</script>
