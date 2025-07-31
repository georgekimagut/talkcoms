<template>
  <div
    class="w-full h-[60vh] pt-8 pb-8 flex justify-center bg-white overflow-hidden relative cta"
    :class="cta_class"
  >
    <!-- patterns -->
    <div class="w-full flex h-[70vh] absolute patterns">
      <div class="w-1/2 flex flex-col justify-end">
        <div
          v-for="index in 4"
          :key="index"
          class="w-full h-[45px] flex flex-row gap-6"
        >
          <div
            v-for="index in 6"
            :key="index"
            class="w-[5px] h-[5px] rounded-full bg-third"
          ></div>
        </div>
      </div>
      <div class="w-1/2 h-fulll flex justify-end">
        <div class="h-full flex flex-col">
          <div
            v-for="index in 4"
            :key="index"
            class="w-full h-[45px] flex flex-row gap-6"
          >
            <div
              v-for="index in 4"
              :key="index"
              class="w-[5px] h-[5px] rounded-full bg-secondary"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <!-- end of patterns -->
    <div class="w-[55%] h-full flex justify-center cta-inner">
      <div class="h-full flex flex-col justify-center">
        <div class="w-full">
          <h1
            v-if="service_cta"
            class="text-5xl font-extrabold mt-4 p-2 text-center"
          >
            {{ service_cta }}
          </h1>
          <h1 v-else class="text-5xl font-extrabold mt-4 p-2 text-center">
            Ready To
            <span class="text-secondary ml-2 mr-2">Transform</span> Your
            Business
            <span class="text-secondary ml-2 mr-2">With Tech?</span>
          </h1>
          <p
            v-if="service_cta_description"
            class="mt-2 text-center text-xl text-secondary"
          >
            {{ service_cta_description }}
          </p>
          <p v-else class="mt-2 text-center text-xl">
            Join thousands of professionals who have transformed their business
            with our solutions
          </p>
        </div>
        <div class="w-full flex justify-center mt-14">
          <!-- <router-link to="/contact/get-started"
            ><Button variant="dark"
              >Get Started
              <i class="fa-solid fa-angle-right mt-[10%] icon"></i></Button
          ></router-link>
          <router-link to="/contact/contact-us"
            ><Button variant="light" class="ml-4"
              >Contact us
              <i class="fa-solid fa-angle-right mt-[10%] icon"></i></Button
          ></router-link> -->
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
          <router-link to="/contact/contact-us" class="ml-4">
            <Button
              variant="ghost"
              class="relative overflow-hidden p-6 px-8 text-secondary cursor-pointer group border border-[#82bc00]"
            >
              <span class="relative z-10 hover:text-[#131f6b]"
                >Contact us
              </span>
              <span
                class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
              ></span>
            </Button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Cta",
  components: {},
  props: {
    cta_class: String,
    service_cta: String,
    service_cta_description: String,
  },
};
</script>
