<template>
  <div class="w-full py-10 p-4 bg-white">
    <!-- Header -->
    <div class="w-full flex justify-center">
      <h1 class="text-5xl font-extrabold mt-4 p-2 text-center flex-wrap">
        Trusted by <span class="mx-2 text-secondary w-fit">10+</span> Companies
        since 2016
      </h1>
    </div>

    <!-- Scrolling Logos -->
    <div class="w-full flex flex-wrap justify-center mt-6">
      <div class="w-[90%] flex flex-nowrap overflow-hidden partners">
        <div class="overflow-x-scroll hide-scrollbar w-full">
          <div class="flex animate-scroll-carousel w-[160%]">
            <div
              v-for="(card, index) in client_images.concat(client_images)"
              :key="index"
              class="w-[10%] min-w-[200px] flex-shrink-0 p-4"
            >
              <div class="h-[15vh] flex items-center justify-center">
                <img :src="card.client_pic" class="h-3/4 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div
        v-if="has_numbers"
        ref="statsSection"
        class="w-[86%] flex justify-center mt-6"
      >
        <div class="w-full p-4 flex justify-center stats-panel gap-2">
          <div
            v-for="(stat, index) in animatedStats"
            :key="index"
            class="w-[25%] flex p-2 rounded-xl overflow-hidden border border-[#007cba] stat-card"
          >
            <div class="h-full w-[25%] p-4">
              <div class="h-full w-full flex justify-center">
                <div class="h-full flex flex-col justify-center">
                  <i :class="stat.icon"></i>
                </div>
              </div>
            </div>
            <div class="h-full p-2 w-[85%] ml-2">
              <h1 class="text-4xl font-bold mt-4 text-default">
                {{ stat.displayed }}
              </h1>
              <p class="text-sm mt-2">{{ stat.item }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Partners",
  props: {
    has_numbers: Boolean,
    projects: [String, Number],
    members: [String, Number],
    reviews: [String, Number],
    clients: [String, Number],
  },
  data() {
    return {
      hasAnimated: false,
      client_images: [
        { client_pic: "/icons/partners/1.png" },
        { client_pic: "/icons/partners/2.png" },
        { client_pic: "/icons/partners/3.png" },
        { client_pic: "/icons/partners/4.png" },
        { client_pic: "/icons/partners/5.png" },
        { client_pic: "/icons/partners/6.png" },
        { client_pic: "/icons/partners/7.png" },
        { client_pic: "/icons/partners/8.svg" },
      ],
      stats: [],
      animatedStats: [],
    };
  },
  mounted() {
    this.set_starts();
    this.prepareAnimatedStats();
    this.observeStatsSection();
  },
  methods: {
    set_starts() {
      this.stats.push(
        {
          icon: "fa-regular fa-circle-check text-secondary text-2xl",
          number: Number(this.projects),
          item: "Complete Projects",
        },
        {
          icon: "fa-solid fa-users text-secondary text-2xl",
          number: Number(this.members),
          item: "Team Members",
        },
        {
          icon: "fa-regular fa-message text-secondary text-2xl",
          number: Number(this.reviews),
          item: "Testimonials",
        },
        {
          icon: "fa-solid fa-users text-secondary text-2xl", // fixed typo here
          number: Number(this.clients),
          item: "Happy Clients",
        }
      );
    },
    prepareAnimatedStats() {
      this.animatedStats = this.stats.map((stat) => ({
        ...stat,
        displayed: 0,
      }));
    },
    observeStatsSection() {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !this.hasAnimated) {
            this.animateNumbers();
            this.hasAnimated = true;
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );

      this.$nextTick(() => {
        const section = this.$refs.statsSection;
        if (section) observer.observe(section);
      });
    },
    animateNumbers() {
      this.animatedStats.forEach((stat) => {
        const target = stat.number;
        let count = 0;
        const duration = 1000;
        const frameRate = 60;
        const totalFrames = Math.round((duration / 1000) * frameRate);
        let frame = 0;

        const interval = setInterval(() => {
          frame++;
          const progress = frame / totalFrames;
          stat.displayed = Math.floor(target * progress);

          if (frame >= totalFrames) {
            stat.displayed = target + "+";
            clearInterval(interval);
          }
        }, 1000 / frameRate);
      });
    },
  },
};
</script>
