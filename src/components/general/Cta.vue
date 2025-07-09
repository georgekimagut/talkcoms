<template>
  <div
    class="w-full h-[60vh] pt-8 pb-8 flex justify-center bg-white overflow-hidden relative"
    :class="cta_class"
  >
    <!-- patterns -->
    <div class="w-full flex h-[70vh] absolute">
      <div class="w-1/2 flex flex-col justify-end">
        <div
          v-for="index in 6"
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
            v-for="index in 6"
            :key="index"
            class="w-full h-[45px] flex flex-row gap-6"
          >
            <div
              v-for="index in 5"
              :key="index"
              class="w-[5px] h-[5px] rounded-full bg-secondary"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <!-- end of patterns -->
    <div class="w-[55%] h-full flex justify-center">
      <div class="h-full flex flex-col justify-center">
        <div class="w-full">
          <h1 class="text-5xl font-extrabold mt-4 p-2 text-center">
            Ready To
            <span class="text-secondary ml-2 mr-2">Transform</span> Your
            Business
            <span class="text-secondary ml-2 mr-2">With Tech?</span>
          </h1>
          <p class="mt-2 text-center">
            Join thousands of professionals who have transformed their business
            with our solutions
          </p>
        </div>
        <div class="w-full flex justify-center mt-14">
          <router-link to="/contact/get-started"
            ><Button variant="dark"
              >Get Started
              <i class="fa-solid fa-angle-right mt-[10%] icon"></i></Button
          ></router-link>
          <router-link to="/contact/contact-us"
            ><Button variant="light" class="ml-4"
              >Contact us
              <i class="fa-solid fa-angle-right mt-[10%] icon"></i></Button
          ></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Cta",
  components: {},
  props: { cta_class: String },
};
</script>
