<template>
  <Spinner v-if="page_is_loading" />
  <div v-if="page_is_loading === false" class="w-full">
    <Navbar :services="universal_services" :products="universal_products" />

    <!-- new hero section -->
    <div class="w-full h-[80vh] flex relative">
      <div class="w-3/4 h-full absolute bg-linear-secondary z-[10] opacity-80">
        <!-- background -->
      </div>
      <div class="w-full h-full absolute overflow-hidden">
        <img
          src="/static/hero-pic.png"
          class="w-full h-auto max-h-none object-cover"
        />
      </div>
      <!-- front panel -->
      <div class="w-full h-full absolute z-[20] flex">
        <div class="w-[35%] ml-[5%] flex flex-col py-4 justify-center">
          <h1 class="text-4xl font-extrabold text-white">
            Powering Digital Transformation Across Finance, Healthcare, Legal
            Sectors & Other Industries
          </h1>
          <h2 class="font-semibold text-secondary mt-8 text-xl">
            Talkcoms is a Leading IT Solutions Provider Incorporated in the UK
            in 2016.
          </h2>
          <router-link to="/about" class="mt-4">
            <Button
              class="relative bg-third overflow-hidden p-6 px-10 text-white cursor-pointer group"
            >
              <span class="relative z-10">Go to about </span>
              <span
                class="absolute inset-0 bg-default transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
              ></span>
            </Button>
          </router-link>
        </div>
      </div>
      <!-- center pattern -->
      <div class="w-full h-[60vh] absolute z-[15] overflow-hidden">
        <div class="absolute w-fit h-full flex flex-col justify-end ml-[47%]">
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
      </div>
    </div>
    <!-- hero section -->
    <!-- <div class="w-full">{{ services }}</div> -->
    <div class="w-full h-[80vh] hero bg-fourth overflow-show mt-[3vh]">
      <!-- navigation bar -->
      <!-- <div class="h-[80vh] w-full absolute opacity-50 hide-img">
        <img src="/icons/g26.svg" class="" />
      </div> -->
      <!-- <div class="h-[80vh] w-full absolute flex justify-end hide-img">
        <img src="/static/tribal.png" class="h-full w-auto max-w-none" />
      </div> -->
      <!-- <div
        class="absolute z-[20] w-full h-full flex justify-end overflow-hidden"
      >
        <img src="/public/static/tribal.png" class="!h-full w-auto" />
      </div> -->
      <div class="w-full h-full flex flex-wrap justify-center overflow-hidden">
        <div class="w-[90%] flex flex-wrap mt-8 relative overflow-hidden">
          <!-- {{ services.services }} -->

          <div
            class="h-[70vh] w-full flex overflow-y-hidden hide-scrollbar overflow-x-scroll snap-x snap-mandatory"
          >
            <div
              v-for="(slide, index) in services.services"
              :key="index"
              @mouseenter="pauseAutoSlide()"
              @mouseleave="resumeAutoSlide()"
              class="w-full flex-shrink-0 h-full transition-transform duration-500 ease-in-out snap-center"
              :style="{ transform: `translateX(-${current_slide * 100}%)` }"
            >
              <!-- {{ slide.hero_media }} -->
              <div class="carousel-holder flex flex-nowrap w-full h-[60vh]">
                <div class="w-full flex-shrink-0 h-full flex">
                  <div
                    class="w-1/2 h-full flex flex-col justify-center block c-half"
                  >
                    <p class="text-lg w-3/4 uppercase">
                      {{ slide.product_name }}
                    </p>
                    <h1
                      class="text-4xl font-extrabold mt-6 w-3/4 text-secondary"
                    >
                      {{ slide.main_title }}
                    </h1>
                    <p class="w-3/4 mt-6 description">
                      {{ slide.second_title }}
                    </p>
                    <div class="w-full flex mt-10 btn-holder">
                      <router-link to="/contact/contact-us">
                        <Button
                          class="relative overflow-hidden p-6 px-8 bg-default text-white cursor-pointer group"
                        >
                          <span class="relative z-10">Talk to Sales</span>
                          <span
                            class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                          ></span>
                        </Button>
                      </router-link>
                      <router-link
                        :to="`/service/${slide.product_name}`"
                        class="ml-4"
                      >
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
                  <div class="w-1/2 h-full c-half">
                    <div class="w-full h-full relative">
                      <div
                        class="img-holder h-[60vh] overflow-hidden rounded-2xl"
                      >
                        <img
                          :src="`${image_url}/${
                            slide.hero_media?.formats?.large?.url ||
                            slide.hero_media?.url
                          }`"
                          :alt="`${slide.product_name} - image`"
                          class="rounded-2xl min-w-full min-h-full max-h-none object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-full flex justify-center gap-1"
          @mouseenter="pauseAutoSlide()"
          @mouseleave="resumeAutoSlide()"
        >
          <div
            v-for="(item, index) in services.services"
            :key="index"
            @click="current_slide = index"
            class="w-[16px] h-[16px] rounded-full cursor-pointer"
            :class="current_slide === index ? 'bg-default' : 'bg-gray-400'"
          ></div>
        </div>
      </div>
    </div>

    <!-- services highlights -->
    <!-- <div
      class="w-full flex flex-wrap justify-center overflow-hidden bg-white py-16 services"
    >
      <div class="w-[90%] flex justify-center flex-wrap">
        <div class="w-[80%] flex gap-1 overflow-x-scroll hide-scrollbar py-4">
          <button
            v-for="(service, index) in home_services"
            :key="index"
            class="p-2 text-sm rounded-t-md cursor-pointer border flex-shrink-0"
            :class="
              service_in_view === index
                ? 'bg-default text-white border-[#131f6b]'
                : 'text-default'
            "
            @click="toggle_service(index)"
          >
            <i :class="service.icon"></i>
            {{ service.name }}
          </button>
        </div>
        <div class="w-full flex overflow-hidden mt-8 hero-component">
          <div
            v-if="home_services[service_in_view]"
            class="w-full flex flex-shrink-0 flex-grow rounded-md overflow-hidden hero-holder"
          >
            <div class="w-1/2 flex justify-end to-full">
              <div class="w-[90%] flex to-full">
                <div class="w-[70%] flex flex-wrap to-full">
                  <div class="w-full flex flex-col justify-center">
                    <h1 class="text-4xl font-extrabold text-default">
                      <i
                        class="text-secondary"
                        :class="home_services[service_in_view].icon"
                      ></i>
                      {{ home_services[service_in_view].name }}
                    </h1>
                    <p class="mt-8">
                      {{ home_services[service_in_view].title_description }}
                    </p>
                    <div class="w-full flex flex-row mt-8 full-hero gap-2">
                      <router-link to="/contact/contact-us">
                        <Button
                          class="relative overflow-hidden p-6 px-8 bg-default text-white cursor-pointer group"
                        >
                          <span class="relative z-10">Book A Demo</span>
                          <span
                            class="absolute inset-0 bg-secondary transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                          ></span>
                        </Button>
                      </router-link>
                      <router-link to="/contact/get-started">
                        <Button
                          variant="ghost"
                          class="relative overflow-hidden p-6 px-8 text-secondary cursor-pointer group border border-[#82bc00]"
                        >
                          <span class="relative z-10 hover:text-[#131f6b]"
                            >Get Started
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
            </div>
            <div class="w-1/2 to-full">
              <div
                class="w-[90%] flex justify-center rounded-xl overflow-hidden to-full"
              >
                <img
                  :src="home_services[service_in_view].imageUrl"
                  class="w-full h-auto max-h-none object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- prev service -->
    <div
      v-if="prev_service"
      class="w-full flex flex-wrap justify-center overflow-hidden bg-white py-16 services"
    >
      <div class="w-[90%] flex justify-center flex-wrap">
        <div class="w-full flex">
          <div class="w-3/4 to-full">
            <h1 class="text-4xl font-bold mt-4 p-2 ml-[1%]">
              Services
              <span class="text-secondary w-fit">Tailored</span>
              To Meet Your Business Needs
            </h1>
          </div>
          <div v-if="prev_service" class="w-1/4 flex justify-end to-hide">
            <Button @click="prevServiceSlide" variant="light" class="mt-4"
              ><i class="fa-solid fa-angle-left"></i
            ></Button>
            <Button @click="nextServiceSlide" variant="light" class="mt-4 ml-4"
              ><i class="fa-solid fa-angle-right"></i
            ></Button>
          </div>
        </div>

        <!-- new services -->
        <div
          class="w-full flex overflow-x-scroll hide-scrollbar snap-x snap-mandatory inner-service"
        >
          <Card
            v-for="(service, index) in home_services"
            :key="index"
            class="w-[32%] mb-4 m-[1.2%] min-w-[31%] bg-white shadow-none pb-8 rounded-xl border overflow-hidden zoom-animate snap-center"
            ><router-link :to="`/service/${service.name}`">
              <CardHeader class="p-0">
                <CardTitle class="h-[35vh] overflow-hidden"
                  ><img
                    :src="service.imageUrl"
                    class="h-full w-auto min-w-full max-w-none object-cover"
                  />
                </CardTitle>
              </CardHeader>
              <CardTitle class="custom-default-hover mt-4 p-4 text-xl">{{
                service.name
              }}</CardTitle>
              <CardDescription class="px-4">
                {{ service.title_description }}
              </CardDescription>
            </router-link>
          </Card>
        </div>
      </div>
    </div>
    <!-- end -->
    <!-- success stories  -->
    <div class="w-full flex flex-wrap justify-center overflow-hidden py-16">
      <div class="w-[90%] flex justify-center flex-wrap gap-1">
        <div class="w-full">
          <p class="text-secondary text-center text-lg">
            <router-link to="/success-stories">STORIES</router-link>
          </p>

          <h1 class="text-4xl font-bold mt-4 p-2 text-center text-default">
            Success Stories From Our Clients
          </h1>
        </div>
        <div
          class="w-full flex flex-nowrap mt-4 overflow-scroll hide-scrollbar stories snap-x snap-mandatory gap-4"
        >
          <Card
            v-for="(item, index) in portfolio"
            :key="index"
            class="w-[32%] mb-4 border-0 shadow-none rounded-none bg-body overflow-hidden flex-shrink-0 to-full cursor-pointer duration-300 ease-in custom-card-hover"
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

          <!-- <Card
            v-if="prev_story"
            v-for="(story, index) in success_stories.slice(0, 3)"
            :key="index"
            class="mb-4 m-[1.2%] bg-transparent shadow-none pb-8 rounded-xl border overflow-hidden card zoom-animate relative h-[45vh] story-card snap-center"
            :class="index === 0 ? 'w-[60%]' : 'w-[32%]'"
          >
            <router-link :to="`/resources/${success_story}/${story.title}`">
              <div
                class="w-full h-full absolute bg-default opacity-40 z-1"
              ></div>
              <div
                class="w-full h-full absolute flex flex-col justify-end z-2 p-4"
              >
                <CardTitle class="text-white mt-4 p-4 text-4xl">{{
                  story.client
                }}</CardTitle>
                <CardDescription class="px-4 text-white text-xl">
                  {{ story.title }}
                </CardDescription>
              </div>
              <div class="w-full h-full absolute overflow-hidden z-[-5]">
                <img
                  :src="story.pic"
                  class="h-full w-auto min-w-full max-w-none object-cover"
                />
              </div>
            </router-link>
          </Card> -->
        </div>
      </div>
    </div>
    <!-- end -->
    <div
      v-if="pre_portfolio"
      class="w-full flex flex-nowrap overflow-hidden justify-center top-56 mt-36"
    >
      <div
        class="w-[90%] bg-white p-4 h-full flex flex-nowrap transition-transform duration-500 ease-in-out overflow-hidden"
      >
        <div class="w-[30%] h-full p-6">
          <p class="text-secondary w-3/4 text-lg">PORTFOLIO</p>
          <h1 class="text-4xl font-bold mt-10 p-2">
            <span class="text-secondary">Solutions</span> We've Built For
            <span class="text-secondary">Businesses</span> Like Yours
          </h1>
          <p class="mt-2 p-2">
            Discover custom solutions we've developed to help businesses like
            yours grow and thrive efficiently
          </p>
          <!-- list item -->
          <div class="w-full p-2 h-[25px] flex flex-nowrap">
            <div class="h-full w-[10px] flex flex-col justify-center">
              <div class="h-[10px] w-full bg-black rounded-full"></div>
            </div>
            <div class="h-full flex ml-[10px]" style="width: calc(100% - 15px)">
              <div class="h-full flex flex-col justify-center">
                <li class="list-none">Managed Services and Products</li>
              </div>
            </div>
          </div>
          <!-- end of list -->
          <!-- list item -->
          <div class="w-full p-2 h-[25px] flex flex-nowrap">
            <div class="h-full w-[10px] flex flex-col justify-center">
              <div class="h-[10px] w-full bg-black rounded-full"></div>
            </div>
            <div class="h-full flex ml-[10px]" style="width: calc(100% - 15px)">
              <div class="h-full flex flex-col justify-center">
                <li class="list-none">Flexibility and Adaptability</li>
              </div>
            </div>
          </div>
          <!-- end of list -->
          <!-- list item -->
          <div class="w-full p-2 h-[25px] flex flex-nowrap">
            <div class="h-full w-[10px] flex flex-col justify-center">
              <div class="h-[10px] w-full bg-black rounded-full"></div>
            </div>
            <div class="h-full flex ml-[10px]" style="width: calc(100% - 15px)">
              <div class="h-full flex flex-col justify-center">
                <li class="list-none">Competitive Advantage</li>
              </div>
            </div>
          </div>
          <!-- end of list -->
        </div>
        <!-- 2nd part -->
        <div class="w-[70%] h-[65vh] flex justify-center pt-6">
          <div
            class="w-[96%] flex overflow-x-scroll overflow-y-hidden custom-scrollbar relative"
          >
            <!-- portfolio item -->
            <div
              v-for="(project, index) in portfolio_items"
              :key="index"
              class="w-[36%] min-w-[36%] h-[90%] relative cursor-pointer overflow-hidden ml-4 custom-portfolio-hover"
            >
              <img
                :src="project.pic"
                class="h-full absolute w-auto max-w-none"
              />
              <div class="h-full w-full flex flex-col absolute z-10">
                <div class="h-[40%] w-full bg-body">
                  <h1 class="text-5xl p-4 font-semibold">
                    {{ project.name }}
                  </h1>
                </div>
              </div>
              <div
                class="h-full w-full absolute z-10 bg-black opacity-0 c-background"
              ></div>
              <div
                class="h-full w-full absolute z-20 bg-transparent flex justify-center"
              >
                <div class="h-full flex-col justify-center c-layer hidden">
                  <h1 class="text-5xl p-4 font-semibold text-white">
                    {{ project.name }}
                  </h1>
                  <ExternalLink
                    :link_to="project.link"
                    link_text="Visit Site"
                    class="w-fit mt-4 ml-6"
                  />
                </div>
              </div>
            </div>
            <!-- end of it -->

            <!-- end of it -->
          </div>
        </div>
      </div>
    </div>
    <!-- industry -->
    <div
      class="w-full flex justify-center mt-8 pt-10 pb-32 bg-fourth border border-[#9ecce4] rounded-lg"
    >
      <div class="w-[90%]">
        <div class="w-full">
          <h1 class="text-5xl font-extrabold mt-10 text-center text-default">
            Select your industry. Discover our impact.
          </h1>
        </div>
        <div class="w-full flex flex-wrap mt-16 w730">
          <div
            v-for="(industry, index) in industries"
            :key="index"
            class="industry-card w-[49%] ml-[1%] flex flex-nowrap cursor-pointer pt-3 pb-3 px-2 ease-in-out border-b border-[#dfdfdf] hover:bg-white c-half"
          >
            <router-link :to="`/solution/${industry.name}`" class="w-full flex"
              ><div class="w-[90%] flex flex-nowrap">
                <div class="w-[20px]">
                  <i
                    :class="industry.icon"
                    class="text-secondary ml-2 pt-2"
                  ></i>
                </div>

                <p class="ml-4 text-2xl">{{ industry.name }}</p>
              </div>
              <div class="w-[10%] flex justify-end">
                <i
                  class="fa-solid fa-arrow-right mr-6 opacity-0 mt-2 text-xl text-default"
                ></i>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- partners/companies -->
    <Partners class="mt-0" />
    <!-- blogs -->
    <!-- blogs -->
    <div class="w-full flex justify-center flex-wrap mt-10 p-4 pb-20 blogs">
      <div class="w-[90%]">
        <p class="text-secondary w-full flex justify-center">
          <router-link to="/blogs" class="text-lg">BLOG</router-link>
        </p>
        <h1 class="text-3xl font-extrabold mt-3 w-full flex justify-center">
          Tech <span class="text-secondary mx-1">Tips</span> &
          <span class="text-secondary mx-1">Trends</span>
        </h1>
      </div>
      <div class="w-full flex gap-4 mt-8">
        <Card
          v-for="(blog, index) in blogs"
          :key="index"
          class="w-[32%] border-0 shadow-none bg-body rounded-md flex-shrink-0 to-full cursor-pointer duration-300 ease-in custom-card-hover"
        >
          <router-link
            :to="`/resources/${is_blog}/${blog.slug}`"
            class="w-full flex-flex-wrap"
          >
            <CardHeader class="h-[40vh] p-0">
              <img
                :src="`${image_url}/${
                  blog.hero_media?.formats?.large?.url || blog.hero_media?.url
                }`"
                class="min-h-full h-full min-w-full w-auto max-w-none rounded-md"
              />
            </CardHeader>
            <CardTitle class="p-2 text-2xl text-default pt-2 font-bold">{{
              blog.Title
            }}</CardTitle>
            <div class="w-full p-2"></div>
            <div class="w-full p-2 flex">
              <div class="w-1/2">
                <p class="font-bold text-sm text-gray-500">
                  Author: {{ blog.author }}
                </p>
              </div>
              <div
                class="w-1/2 flex justify-end font-bold text-sm text-gray-500"
              >
                {{ blog.category ? blog.category : blog.Type }}/
                {{ format_date(blog.createdAt) }}
              </div>
            </div>
            <div
              class="text-base text-gray-800 [&_*]:!m-0 [&_*]:!mt-0 [&_*]:!mb-0 [&_*]:!p-0 [&_*]:!font-normal [&_*]:!text-inherit [&_*]:!text-base [&_*]:!bg-transparent [&_*]:!border-none [&_*]:!shadow-none !p-2"
              v-html="
                blog.articles_section
                  .replace(/<br\s*\/?>/gi, '')
                  .split(' ')
                  .slice(0, 15)
                  .join(' ')
              "
            ></div>
            <!-- <div class="w-full">{{ blog.articles_section }}</div> -->
            <CardFooter>
              <div
                class="flex flex-nowrap relative gap-2 text-secondary p-2 h-[40px] flex-col justify-center read-more-hover"
              >
                <div
                  class="h-[30px] w-[30px] absolute flex bg-transparent border-2 rounded-full border-[#82bc00] duration-300 ease-in-out to-cover"
                >
                  <div class="h-full flex-col justify-center">
                    <i
                      class="fa-solid fa-arrow-right ml-[6px] text-secondary duration-300 ease-in-out"
                    ></i>
                  </div>
                </div>

                <span class="font-semibold ml-[35px]">Read More</span>
              </div>
            </CardFooter>
          </router-link>
        </Card>
      </div>
      <div v-if="prev_blog" class="w-full flex justify-center gap-4 mt-16">
        <div class="w-[80%] flex blog-inner">
          <div class="w-[40%] m-1 flex justify-center col-1">
            <div
              v-for="(blog, index) in blogs.slice(0, 1)"
              :key="index"
              class="w-[90%] card mx-2 bg-white overflow-hidden zoom-animate p-2"
            >
              <!-- router -->
              <router-link :to="`/resources/${is_blog}/${blog.slug}`">
                <div class="w-full h-[40vh] overflow-hidden relative">
                  <div
                    class="absolute pointer-to-show z-20 top-[33vh] h-fit text-white w-fit px-2 cursor-pointer bg-secondary"
                  >
                    <!-- <i class="fa-solid fa-angle-right text-2xl"></i> -->
                    Read More
                  </div>
                  <img
                    :src="`${image_url}/${blog.hero_media.url}`"
                    class="min-h-full h-full min-w-full w-auto max-w-none"
                  />
                </div>
                <div class="p-4">
                  <div class="w-full pt-2 pb-2 flex">
                    <span
                      class="bg-secondary text-sm text-white rounded-full pl-2 pr-2"
                      >{{ blog.category ? blog.category : blog.Type }}</span
                    >
                    <div class="line w-[1px] bg-secondary ml-6 h-[23px]"></div>
                    <span class="ml-6 text-sm">{{
                      format_date(blog.createdAt)
                    }}</span>
                  </div>
                  <router-link :to="`/resources/${is_blog}/${blog.slug}`"
                    ><h3 class="font-semibold text-xl custom-default-hover">
                      {{ blog.Title }}
                    </h3></router-link
                  >
                  <div class="w-full mt-10 flex">
                    <div class="w-[50px] h-[50px]">
                      <img src="/icons/profile.png" />
                    </div>
                    <div class="pl-4 pr-4" style="width: calc(100% - 50px)">
                      <p class="text-sm">{{ blog.author }}</p>
                      <p class="text-sm">{{ blog.read_time }} mins</p>
                    </div>
                  </div>
                </div>
              </router-link>
              <!-- router here -->
            </div>
          </div>
          <div
            class="w-[60%] m-1 flex flex-col col-2 hide-scrollbar snap-x snap-mandatory"
          >
            <div
              v-for="(blog, index) in blogs.slice(1, 3)"
              :key="index"
              class="w-full card flex bg-white h-[40vh] zoom-animate p-2 snap-center"
            >
              <!-- router link -->
              <router-link
                class="w-full flex"
                :to="`/resources/${is_blog}/${blog.slug}`"
              >
                <div class="w-[40%] h-full overflow-hidden relative img-holder">
                  <img
                    :src="`${image_url}/${blog.hero_media.url}`"
                    class="min-h-full h-full min-w-full w-auto max-w-none"
                  />
                  <div
                    class="absolute pointer-to-show z-20 top-[33vh] h-fit text-white w-fit px-2 cursor-pointer bg-secondary"
                  >
                    <!-- <i class="fa-solid fa-angle-right text-2xl"></i> -->
                    Read More
                  </div>
                </div>
                <div class="w-[60%] overflow-hidden p-4 card-body">
                  <router-link :to="`/resources/${is_blog}/${blog.slug}`"
                    ><h3 class="font-semibold text-xl custom-default-hover">
                      {{ blog.Title }}
                    </h3></router-link
                  >
                  <div class="w-full h-full flex flex-col pb-4">
                    <div class="w-full pt-2 pb-2 flex">
                      <span
                        class="bg-secondary h-fit text-sm text-white rounded-full pl-2 pr-2"
                        >{{ blog.category ? blog.category : blog.Type }}</span
                      >
                      <div
                        class="line w-[1px] bg-secondary ml-6 h-[23px]"
                      ></div>
                      <span class="ml-6 text-sm">{{
                        format_date(blog.createdAt)
                      }}</span>
                    </div>
                    <div class="w-full mt-10 flex">
                      <div class="w-[50px] h-[50px]">
                        <img src="/icons/profile.png" />
                      </div>
                      <div
                        class="pl-4 pr-4 pb-4"
                        style="width: calc(100% - 50px)"
                      >
                        <p class="text-sm">{{ blog.author }}</p>
                        <p class="text-sm">{{ blog.read_time }} mins</p>
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
              <!-- router link -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- cta -->
    <Cta />
    <!-- footer -->
    <Footer :services="universal_services" :products="universal_products" />
    <!-- end of classes -->
  </div>
</template>
<script>
import Cta from "@/components/general/Cta.vue";
import Footer from "@/components/general/Footer.vue";
import Navbar from "@/components/general/Navbar.vue";
import Partners from "@/components/general/Partners.vue";
import Spinner from "@/components/general/Spinner.vue";
import ExternalLink from "@/components/text/ExternalLink.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CustomCard from "@/components/ui/card/CustomCard.vue";
import {
  apiEndpoint,
  baseUrl,
  home_end_point,
  services_end_point,
  home_services_end_point,
} from "@/store/store.js";
import { supabase } from "@/lib/supabase.js";
/* global values */
import { universal_content } from "@/store/contentStore";

export default {
  name: "Home",
  components: {
    Navbar,
    Spinner,
    CustomCard,
    ExternalLink,
    Partners,
    Cta,
    Footer,
  },
  data() {
    return {
      //spinner
      page_is_loading: true,
      current_slide: 0,
      total_slides: "", // Number of slides
      /* handle swap */
      startX: 0,
      endX: 0,
      /* pause on hover */
      interval: null,
      isPaused: false,
      //service carousel
      success_story: "story",
      is_blog: "blog",
      image_url: baseUrl,
      carousel_data: [],
      home_services: [],
      portfolio_items: [],
      success_stories: [],
      blogs: [],
      landing_page_content: [],
      industries: [],
      services: [],
      universal_services: [],
      universal_products: [],
      products: [],
      /* services carousel */
      current_service_slide: 0,
      total_service_slides: 2,
      service_in_view: 0,
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
    };
  },
  async created() {
    this.page_is_loading = true;
    try {
      await Promise.all([
        // this.get_carousel(),
        this.get_services(),
        this.get_portfolio_items(),
        this.get_solutions(),
        this.fetch_blogs(),
        this.fetch_homepage(),
        this.fetch_service_names(),
        this.fetch_service_carousel(),
        this.get_stories(),
      ]);
    } catch (error) {
      console.error("Loading failed:", error);
    } finally {
      this.page_is_loading = false;
      this.startAutoSlide();
    }
  },
  methods: {
    /* toggle service */
    toggle_service(index) {
      this.service_in_view = index;
    },
    startAutoSlide() {
      this.interval = setInterval(() => {
        if (!this.isPaused) {
          this.nextSlide();
          this.nextServiceSlide();
        }
      }, 15000); // 30 seconds
    },
    pauseAutoSlide() {
      this.isPaused = true;
    },
    resumeAutoSlide() {
      this.isPaused = false;
    },
    /* handle swap */
    onTouchStart(e) {
      this.startX = e.touches[0].clientX;
    },
    onTouchEnd(e) {
      this.endX = e.changedTouches[0].clientX;
      this.handleSwipe();
    },
    handleSwipe() {
      const threshold = 50; // Minimum swipe distance
      const diff = this.endX - this.startX;
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          this.prevSlide(); // Swiped right
          this.nextServiceSlide();
        } else {
          this.nextSlide(); // Swiped left
          this.nextServiceSlide();
        }
      }
    },
    nextSlide() {
      if (this.current_slide < this.total_slides - 1) {
        this.current_slide++;
      } else {
        this.current_slide = 0; // Loop back to first
      }
    },
    prevSlide() {
      if (this.current_slide > 0) {
        this.current_slide--;
      }
    },
    nextServiceSlide() {
      if (this.current_service_slide < this.total_service_slides - 1) {
        this.current_service_slide++;
      }
    },
    prevServiceSlide() {
      if (this.current_service_slide > 0) {
        this.current_service_slide--;
      } else {
        this.current_service_slide = this.total_service_slides - 1;
      }
    },
    //fetch home
    async fetch_homepage() {
      try {
        const response = await fetch(home_end_point);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData.data) {
          // const dataArray = Array.isArray(responseData.data)
          //   ? responseData.data
          //   : [responseData.data];

          // this.landing_page_content = dataArray;
          this.landing_page_content = responseData.data;
          // this.services = this.landing_page_content[0];
          // this.total_slides = this.services.services.length;
          // this.total_slides = this.services.length;
        } else {
          console.error("Invalid response structure:", responseData);
        }

        console.log("Home content", this.landing_page_content);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    },
    /* fetch home service carousel */
    async fetch_service_carousel() {
      try {
        const response = await fetch(home_services_end_point);

        const responseData = await response.json();
        if (responseData.data) {
          const fetched_carousel = responseData.data;
          this.services = fetched_carousel[0];
          this.total_slides = this.services.services.length;
        }
      } catch (error) {
        console.error("Error fecthing carousel: ", error);
      }
    },
    /* fetch services */
    async fetch_service_names() {
      try {
        const response = await fetch(
          "https://cms.talkcoms.co.uk/api/service-pages/?fields[0]=product_name&fields[1]=is_product"
        );
        const responseData = await response.json();
        if (responseData.data) {
          console.log("Json data for service names: ", responseData.data);

          // const dataArray = Array.isArray(responseData.data)
          //   ? responseData.data
          //   : [responseData.data];
          // const fetched_services = dataArray;
          const fetched_services = responseData.data;
          /* store service universally */
          fetched_services.forEach((item) => {
            if (item.is_product === true) {
              this.universal_products.push({ product_name: item.product_name });
            } else {
              this.universal_services.push({ product_name: item.product_name });
            }
            /* store service names for navigation */
            const contentStore = universal_content();
            contentStore.setServices(this.universal_services);
            contentStore.setProducts(this.universal_products);
          });
        } else {
          console.error("Invalide service response structure: ", responseData);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    },
    //GET BLOGS
    async fetch_blogs() {
      try {
        const response = await fetch(apiEndpoint + "3");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData.data) {
          const dataArray = Array.isArray(responseData.data)
            ? responseData.data
            : [responseData.data];

          this.blogs = dataArray;
          this.blogs.forEach((blog) => {
            // console.log(blog.articles_section);
            const word_count = blog.articles_section.split(" ");
            console.log(word_count.filter((word) => word !== " ").length);
          });
        } else {
          console.error("Invalid response structure:", responseData);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    },
    /* dae formate */
    format_date(date_to_change) {
      const date = new Date(date_to_change);
      const date_options = { month: "long", day: "numeric", year: "numeric" };
      return date.toLocaleDateString("en-US", date_options);
    },
    // get services
    async get_services() {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("pic, title_description, name, icon")
          .limit(6);

        if (error) {
          console.log(error);
          return;
        }

        // Shuffle data randomly

        // this.home_services = data;
        this.home_services = data.map((service) => {
          const { data: imageData } = supabase.storage
            .from("talkcoms")
            .getPublicUrl(`services/${service.pic}`);

          return {
            ...service,
            imageUrl: imageData.publicUrl,
          };
        });
      } catch (error) {
        console.log(error);
      }
    },
    //get stories
    async get_stories() {
      try {
        const { data, error } = await supabase
          .from("success_stories")
          .select("*");

        if (error) {
          console.log(error);
          return;
        }
        this.success_stories = data;
        this.success_stories.push(this.success_stories[0]);
      } catch (error) {
        console.log(error);
      }
    },
    //get solutions
    async get_solutions() {
      try {
        const { data, error } = await supabase
          .from("solutions_by_industry")
          .select("id, name, is_department, icon")
          .order("created_at", { ascending: false });

        this.industries = data;
        if (error) {
          console.log(error);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    },
    //get portfolio
    async get_portfolio_items() {
      try {
        const { data, error } = await supabase.from("portfolio").select("*");

        if (error) {
          console.log(error);
          return;
        }
        this.portfolio_items = data;
      } catch (error) {
        console.log(error);
      }
    },
    //get carouses
    // async get_carousel() {
    //   try {
    //     const { data, error } = await supabase.from("carousel").select("*");

    //     if (error) {
    //       console.log(error);
    //       return;
    //     }
    //     this.carousel_data = data;
    //     this.total_slides = this.carousel_data.length;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
};
</script>
