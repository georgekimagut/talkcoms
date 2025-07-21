<template>
  <!-- load spinner before -->
  <Spinner v-if="page_is_loading" />
  <div v-if="page_is_loading === false" class="w-full">
    <Navbar :services="universal_services" />
    <!-- contact us -->
    <div class="w-full flex justify-center bg-fourth py-16">
      <HeroPattern />
      <div class="w-[90%] flex flex-wrap hero-component to-full">
        <div v-if="type == 'contact-us'" class="w-1/2 to-full">
          <p class="text-secondary">CONTACT US</p>
          <div class="w-[90%] to-full">
            <BigTitle text="Get in touch" title_class="mt-4 text-5xl" />
            <!-- maps -->
            <div class="w-full mt-6 h-[60vh] hide-img">
              <Maps map_class="w-full h-full" />
            </div>
          </div>
        </div>
        <div
          class="flex h-full to-full contact-form"
          :class="type == 'contact-us' ? 'w-1/2' : 'w-full'"
        >
          <!-- contact us form -->
          <div
            class="w-full p-5 rounded-xl shadow-sm"
            :class="
              type == 'contact-us'
                ? 'w-1/2 bg-white'
                : 'w-full flex justify-center'
            "
          >
            <form
              @submit.prevent="enquire"
              class="flex flex-wrap"
              :class="type == 'contact-us' ? 'w-full' : 'w-[60%] bg-white p-8'"
            >
              <div class="w-full flex flex-wrap">
                <div class="w-1/2 p-2">
                  <label class="text-sm">First Name</label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    class="mt-2"
                    required
                    v-model="f_name"
                  />
                </div>
                <div class="w-1/2 p-2">
                  <label class="text-sm">Last Name</label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    class="mt-2"
                    required
                    v-model="l_name"
                  />
                </div>
                <div class="w-1/2 p-2">
                  <label class="text-sm">Email</label>
                  <Input
                    type="email"
                    placeholder="Enter Your Email"
                    class="mt-2"
                    required
                    v-model="email"
                  />
                </div>
                <div class="w-1/2 p-2">
                  <label class="text-sm">Position/Role</label>
                  <Input
                    type="text"
                    placeholder="Enter Your Role"
                    class="mt-2"
                    required
                    v-model="role"
                  />
                </div>
                <div class="w-1/2 p-2">
                  <label class="text-sm">Company</label>
                  <Input
                    type="text"
                    placeholder="Company Name"
                    class="mt-2"
                    required
                    v-model="company_name"
                  />
                </div>
                <div class="w-1/2 p-2">
                  <label class="text-sm">Company Phone</label>
                  <Input
                    type="text"
                    placeholder="Company Phone"
                    class="mt-2"
                    required
                    v-model="phone"
                  />
                </div>
                <div v-if="this.type != 'contact-us'" class="w-full p-2">
                  <label class="text-sm">Subject</label>
                  <Select v-model="selected">
                    <SelectTrigger class="w-full mt-2">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Services</SelectLabel>
                        <SelectItem
                          v-for="(service, index) in services"
                          :key="index"
                          :value="service.name"
                        >
                          {{ service.name }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div
                  v-if="this.type != 'contact-us' && this.type != 'get-started'"
                  class="w-full p-2"
                >
                  <label class="text-sm">Preferred day & time</label>
                  <input
                    type="datetime-local"
                    class="w-full border py-1 px-2 rounded-sm mt-2"
                    v-model="date_time"
                  />
                </div>
                <div class="w-full p-2">
                  <label class="text-sm">Message</label>
                  <Textarea
                    class="mt-2"
                    placeholder="Type your message"
                    required
                    v-model="message"
                  />
                </div>
                <div class="w-full p-2">
                  <input type="checkbox" class="w-fit" required />
                  <label class="text-sm ml-2"
                    >Agree to
                    <span class="underline"
                      ><router-link to="/legal/Terms & Conditions"
                        >Terms & Conditions</router-link
                      ></span
                    ></label
                  >
                </div>
                <div class="w-full p-2 flex justify-end">
                  <Button
                    class="relative overflow-hidden p-6 px-8 bg-secondary text-white cursor-pointer group"
                  >
                    <span v-if="!is_submitting" class="relative z-10"
                      >{{ button_message }}
                      <i class="fa-regular fa-paper-plane ml-3"></i
                    ></span>
                    <span
                      class="absolute inset-0 bg-default transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
                    ></span>
                    <!-- submission -->
                    <span v-if="is_submitting" class="relative z-10"
                      >Sending</span
                    >
                    <span v-if="is_submitting" class="relative z-10 mt-2"
                      ><Spinner
                    /></span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- contact details -->
    <div class="w-full flex justify-center mt-16 border-b pb-8 relative">
      <div class="h-[50vh] w-full absolute flex justify-end z-[-10]">
        <img src="/static/tribal.png" class="h-full w-auto max-w-none" />
      </div>
      <div class="w-[90%] flex rounded-xl overflow-hidden">
        <Card
          class="w-[32%] m-[1.5%] rounded-xl border border-[##f5f5f5] shadow-none bg-white"
        >
          <!-- phones -->
          <CardHeader>
            <CardDescription class="text-xl"
              ><i class="fa-solid fa-phone text-secondary"></i> Call us
              on</CardDescription
            >
            <CardTitle
              v-for="(phone, index) in phones"
              :key="index"
              class="mt-2 text-normal"
            >
              <a :href="`tel:${phone.phone}`">{{ phone.phone }}</a></CardTitle
            >
          </CardHeader>
        </Card>
        <!-- emails -->
        <Card
          class="w-[32%] m-[1.5%] rounded-xl border border-[##f5f5f5] shadow-none bg-white"
        >
          <CardHeader>
            <CardDescription class="text-xl"
              ><i class="fa-regular fa-envelope text-secondary"></i> You can
              email us</CardDescription
            >
            <CardTitle
              v-for="(email, index) in emails"
              :key="index"
              class="mt-4"
            >
              <a :href="`mailto:${email.email}`">{{
                email.email
              }}</a></CardTitle
            >
          </CardHeader>
        </Card>
        <!-- location -->
        <Card
          class="w-[32%] m-[1.5%] rounded-xl border border-[##f5f5f5] shadow-none bg-white"
        >
          <CardHeader>
            <CardDescription class="text-xl"
              ><i class="fa-solid fa-location-dot text-secondary"></i> Our
              Offfices</CardDescription
            >
            <div
              class="w-full mt-4"
              v-for="(office, index) in offices"
              :key="index"
            >
              <CardDescription>{{ office.name }}</CardDescription>
              <CardTitle>{{ office.location }}</CardTitle>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
    <!-- maps -->
    <div class="w-full mt-32 h-[40vh] flex justify-center hidden">
      <div class="w-[90%] h-full">
        <Maps map_class="w-full h-full" />
      </div>
    </div>
    <!-- footer -->
    <Footer :services="universal_services" />
  </div>
</template>
<script>
import Navbar from "@/components/general/Navbar.vue";
import Spinner from "@/components/general/Spinner.vue";
import Footer from "@/components/general/Footer.vue";
import BigTitle from "@/components/text/BigTitle.vue";
import HeroPattern from "@/components/patterns/HeroPattern.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import Maps from "@/components/general/Maps.vue";
import {
  contact_us_end_point,
  enquiry_url,
  contact_us_url,
} from "@/store/store.js";
import { supabase } from "@/lib/supabase";
import { universal_content } from "@/store/contentStore";

export default {
  name: "Contact us",
  components: {
    Navbar,
    Spinner,
    HeroPattern,
    Footer,
    BigTitle,
    Maps,
  },
  props: ["type"],
  data() {
    return {
      page_is_loading: true,
      /* form submission */
      f_name: "",
      l_name: "",
      email: "",
      role: "",
      company_name: "",
      phone: "",
      selected: "",
      date_time: "",
      message: "",
      button_message: "Send",
      is_submitting: false,
      services: [],
      universal_services: [],
      subjects: [
        { value: "1", content: "Option one" },
        { value: "2", content: "Option two" },
        { value: "3", content: "Option three" },
      ],
      phones: [{ phone: "+2547 592 009 98" }, { phone: "+254 746 433 163" }],
      emails: [
        { email: "support@talkcoms.co.uk" },
        { email: "solutions@talkcoms.co.uk" },
      ],
      offices: [
        {
          name: "UK OFFICE",
          location:
            "The Kings Centre Main Road, Barleythorpe Oakham, LE15 7WD, United Kingdom",
        },
        {
          name: "NAIROBI OFFICE",
          location:
            "Great Jubilee Center ( The Well), Karen, Nairobi 1’st Floor Unit No. 07, Kenya",
        },
        {
          name: "ELDAMA RAVINE OFFICE",
          location:
            "3rd Floor, Skyrise Plaza, Eldama Ravine Township, Along Ravine - Nakuru Road",
        },
      ],
      processes: [
        {
          no: "01",
          title: "Meet With The Team",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet varius est. ",
        },
        {
          no: "02",
          title: "Make a Plan",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet varius est. ",
        },
        {
          no: "03",
          title: "Implementation & Deployment",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet varius est. ",
        },
      ],
    };
  },
  mounted() {
    this.load_page();
    this.universal_services = universal_content().services;
    this.fetch_contact_us();
    this.get_services();
  },
  methods: {
    load_page() {
      setTimeout(() => {
        this.page_is_loading = false;
      }, 1500);
    },
    /* get in touch */
    async enquire() {
      if (
        this.button_message == "Sent. Thank you!" ||
        this.is_submitting === true
      ) {
        return;
      }
      this.is_submitting = true;
      alert(this.f_name);
      const enquiry_form = {
        first_name: this.f_name,
        last_name: this.l_name,
        email: this.email,
        position: this.role,
        company: this.company_name,
        phone: this.phone,
        message: this.message,
      };

      try {
        const res = await fetch(contact_us_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enquiry_form),
        });

        const data = await res.json();
        console.log("sent:", data);
        this.button_message = "Sent. Thank you!";
        setTimeout(() => {
          this.button_message = "Send";
          this.f_name = "";
          this.l_name = "";
          this.email = "";
          this.role = "";
          this.company_name = "";
          this.phone = "";
          this.selected = "";
          this.date_time = "";
          this.message = "";
        }, 4000);
      } catch (err) {
        console.error("Error:", err);
        /* submission failed */
      } finally {
        this.is_submitting = false;
      }
    },
    /* fetch contacts */
    async fetch_contact_us() {
      const cacheKey = "contactCache";
      let contact_us_page = "";
      const cacheExpiry = 10 * 60 * 1000; // 10 minutes

      const cachedData = localStorage.getItem(cacheKey);
      const now = Date.now();

      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (now - timestamp < cacheExpiry) {
          //map data
          contact_us_page = data;
          return;
        }
      }

      try {
        const response = await fetch(contact_us_end_point);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData.data) {
          const dataArray = Array.isArray(responseData.data)
            ? responseData.data
            : [responseData.data];

          contact_us_page = dataArray;

          localStorage.setItem(
            cacheKey,
            JSON.stringify({
              data: dataArray,
              timestamp: now,
            })
          );
        } else {
          console.error("Invalid response structure:", responseData);
          if (cachedData) {
            console.log("Falling back to stale cache");
            const { data } = JSON.parse(cachedData);
            contact_us_page = data;
          }
        }

        console.log("Contact content", contact_us_page);
      } catch (error) {
        console.error("Error fetching resources:", error);
        if (cachedData) {
          console.log("Using cached data after error");
          const { data } = JSON.parse(cachedData);
          this.blogs = data;
        }
      }
    },
    //get services
    async get_services() {
      try {
        const { data, error } = await supabase.from("services").select("name");

        if (error) {
          console.log(error);
          return;
        }

        // Shuffle data randomly
        this.services = data;
        console.log(this.services);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
