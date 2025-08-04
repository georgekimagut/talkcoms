<template>
  <!-- load spinner before -->
  <Spinner v-if="page_is_loading" />

  <div v-if="page_is_loading === false" class="w-full">
    <Navbar
      :services="universal_services"
      :products="universal_products"
      :industries="universal_industries"
    />
    <!-- contact us -->
    <div class="w-full flex justify-center bg-white py-16">
      <div class="w-[90%] flex flex-wrap hero-component to-full">
        <div v-if="type == 'contact-us'" class="w-1/2 to-full">
          <p class="text-secondary">CONTACT US</p>
          <div class="w-[90%] to-full">
            <h1 class="mt-4 text-5xl font-extrabold text-default">
              Get in touch
            </h1>
            <!-- maps -->
            <div class="w-full mt-6 h-[60vh] hide-img">
              <Maps map_class="w-full h-full" />
            </div>
          </div>
        </div>
        <div
          class="flex h-full to-full contact-form"
          :class="
            type == 'contact-us' ? 'w-1/2 bg-default rounded-md' : 'w-full'
          "
        >
          <!-- contact us form -->
          <div
            class="w-full p-5 rounded-xl shadow-sm"
            :class="
              type == 'contact-us' ? 'w-1/2 ' : 'w-full flex justify-center'
            "
          >
            <form
              @submit.prevent="enquire"
              class="flex flex-wrap inner-contact-form to-full"
              :class="
                type == 'contact-us'
                  ? 'w-full'
                  : 'w-[60%] bg-fourth border rounded-xl border-[#007cba]  p-8 to-full'
              "
            >
              <div class="w-full flex flex-wrap">
                <div class="w-1/2 p-2 to-full-form">
                  <label
                    class="text-sm"
                    :class="type == 'contact-us' ? 'text-white' : ''"
                    >First Name</label
                  >
                  <Input
                    type="text"
                    placeholder="First Name"
                    class="text-sm"
                    :class="
                      type == 'contact-us' ? 'text-white' : 'border-[#007cba]'
                    "
                    required
                    v-model="f_name"
                  />
                </div>
                <div class="w-1/2 p-2 to-full-form">
                  <label
                    class="text-sm"
                    :class="
                      type == 'contact-us' ? 'text-white' : 'border-[#007cba]'
                    "
                    >Last Name</label
                  >
                  <Input
                    type="text"
                    placeholder="Last Name"
                    class="text-sm"
                    :class="
                      type == 'contact-us' ? 'text-white' : 'border-[#007cba]'
                    "
                    required
                    v-model="l_name"
                  />
                </div>
                <div class="w-1/2 p-2 to-full-form">
                  <label
                    class="text-sm"
                    :class="
                      type == 'contact-us' ? 'text-white' : 'border-[#007cba]'
                    "
                    >Email</label
                  >
                  <Input
                    type="email"
                    placeholder="Enter Your Email"
                    class="text-sm"
                    :class="
                      type == 'contact-us' ? 'text-white' : 'border-[#007cba]'
                    "
                    required
                    v-model="email"
                  />
                </div>
                <div class="w-1/2 p-2 to-full-form">
                  <label
                    class="text-sm"
                    :class="
                      type == 'contact-us' ? 'text-white' : 'border-[#007cba]'
                    "
                    >Position/Role</label
                  >
                  <Input
                    type="text"
                    placeholder="Enter Your Role"
                    class="text-sm"
                    :class="
                      type == 'contact-us' ? 'text-white' : 'border-[#007cba]'
                    "
                    required
                    v-model="role"
                  />
                </div>
                <div class="w-1/2 p-2 to-full-form">
                  <label
                    class="text-sm"
                    :class="
                      type == 'contact-us' ? 'text-white' : 'border-[#007cba]'
                    "
                    >Company</label
                  >
                  <Input
                    type="text"
                    placeholder="Company Name"
                    class="text-sm"
                    :class="
                      type == 'contact-us' ? 'text-white' : 'border-[#007cba]'
                    "
                    required
                    v-model="company_name"
                  />
                </div>
                <div class="w-1/2 p-2 to-full-form">
                  <label
                    class="text-sm"
                    :class="[type === 'contact-us' ? 'text-white' : '']"
                  >
                    {{ phone_text }}
                    <span
                      v-if="phone_is_number === false"
                      class="text-red-500 font-bold"
                      >*</span
                    >
                  </label>
                  <Input
                    type="text"
                    placeholder="Company Phone"
                    class="text-sm"
                    :class="[
                      'border',
                      type === 'contact-us' ? 'text-white' : '',
                      type === 'contact-us' && phone_is_number
                        ? ' border-white'
                        : '',
                      phone_is_number
                        ? type !== 'contact-us'
                          ? 'border-[#007cba]'
                          : ''
                        : 'border-red-500',
                    ]"
                    required
                    v-model="phone"
                  />
                </div>
                <div
                  v-if="this.type != 'contact-us' && this.type != 'get-started'"
                  class="w-full p-2 flex flex-wrap"
                >
                  <div class="w-1/2 p-2 to-full-form">
                    <label
                      class="text-sm"
                      :class="[type === 'contact-us' ? 'text-white' : '']"
                    >
                      {{ company_text }}
                      <span
                        v-if="size_is_number === false"
                        class="text-red-500 font-bold"
                        >*</span
                      >
                    </label>
                    <Input
                      type="text"
                      placeholder="Company Size"
                      class="text-sm"
                      :class="[
                        'border',
                        type === 'contact-us' && size_is_number
                          ? 'text-white border-white'
                          : '',
                        size_is_number
                          ? type !== 'contact-us'
                            ? 'border-[#007cba]'
                            : ''
                          : 'border-red-500',
                      ]"
                      required
                      v-model="company_size"
                    />
                  </div>
                  <div class="w-1/2 p-2 to-full-form">
                    <label
                      class="text-sm"
                      :class="type == 'contact-us' ? 'text-white' : ''"
                      >Preferred day & time</label
                    >
                    <input
                      type="datetime-local"
                      class="w-full border py-1 px-2 rounded-sm mt-2 bg-transparent border-[#007cba]"
                      v-model="date_time"
                    />
                  </div>
                </div>
                <div v-if="this.type != 'contact-us'" class="w-full p-2">
                  <label
                    class="text-sm"
                    :class="type == 'contact-us' ? 'text-white' : ''"
                    >Subject</label
                  >
                  <Select v-model="selected" class="border-[#007cba]">
                    <SelectTrigger
                      class="w-full mt-2 text-black border-[#007cba]"
                    >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Services</SelectLabel>
                        <SelectItem
                          v-for="(service, index) in services"
                          :key="index"
                          :value="service.product_name"
                        >
                          {{ service.product_name }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div class="w-full p-2">
                  <label
                    class="text-sm"
                    :class="
                      type == 'contact-us' ? 'text-white' : 'border-[#007cba]'
                    "
                    >Message</label
                  >
                  <Textarea
                    class="text-sm"
                    :class="
                      type == 'contact-us' ? 'text-white' : 'border-[#007cba]'
                    "
                    placeholder="Type your message"
                    required
                    v-model="message"
                  />
                </div>
                <div class="w-full p-2">
                  <input type="checkbox" class="w-fit" required />
                  <label
                    class="text-sm ml-2"
                    :class="
                      type == 'contact-us' ? 'text-white' : 'border-[#007cba]'
                    "
                    >Agree to
                    <span class="underline"
                      ><a
                        href="https://app.termly.io/policy-viewer/policy.html?policyUUID=ea802309-46cd-4afa-8b87-4525ab3ad7a1"
                        target="_blank"
                        >Terms & Conditions</a
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
                      class="absolute inset-0 bg-third transform scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100 z-0"
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
    <div
      class="w-full flex justify-center mt-16 border py-8 relative bg-fourth rounded-xl border-[#007cba]"
    >
      <div class="w-[90%] flex rounded-xl overflow-hidden contact-panel">
        <Card
          class="w-[32%] m-[1.5%] card rounded-xl shadow-none bg-transparent border-none card"
        >
          <!-- phones -->
          <CardHeader>
            <CardDescription class="text-2xl font-bold text-secondary">
              Call us on</CardDescription
            >
            <CardTitle
              v-for="(phone, index) in phones"
              :key="index"
              class="mt- text-xl"
            >
              <a :href="`tel:${phone.title}`">{{ phone.title }}</a></CardTitle
            >
          </CardHeader>
        </Card>
        <!-- emails -->
        <Card
          class="w-[32%] m-[1.5%] card rounded-xl shadow-none bg-transparent border-none card"
        >
          <CardHeader>
            <CardDescription class="text-2xl font-bold text-secondary"
              >You can email us</CardDescription
            >
            <CardTitle
              v-for="(email, index) in emails"
              :key="index"
              class="mt-2 text-xl"
            >
              <a :href="`mailto:${email.email}`">{{
                email.email
              }}</a></CardTitle
            >
          </CardHeader>
        </Card>
        <!-- location -->
        <Card
          class="w-[32%] m-[1.5%] card rounded-xl shadow-none bg-transparent border-none card"
        >
          <CardHeader>
            <CardDescription class="text-2xl font-bold text-secondary">
              Our Offfices</CardDescription
            >
            <div
              class="w-full mt-2"
              v-for="(office, index) in offices"
              :key="index"
            >
              <CardDescription class="text-normal">{{
                office.name
              }}</CardDescription>
              <CardTitle class="text-xl">{{ office.location }}</CardTitle>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
    <!-- maps -->
    <div class="w-full mt-10 h-[40vh] flex justify-center hidden hidden-map">
      <div class="w-[90%] h-full">
        <Maps map_class="w-full h-full" />
      </div>
    </div>
    <!-- footer -->
    <Footer :services="universal_services" :products="universal_products" />
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
import { enquiry_url, contact_us_url } from "@/store/store.js";
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
      company_size: "",
      is_submitting: false,
      sending_endpoint: "",
      services: [],
      services_carousel: [],
      enquiry_form: {},
      universal_services: [],
      universal_products: [],
      universal_industries: [],
      /* validation */
      phone_is_number: true,
      size_is_number: true,
      phone_text: "Company Phone",
      company_text: "Company Size",
      /* contacts */
      phones: [{ title: "+254747039334" }, { title: "+441572376000" }],
      emails: [{ email: "solutions@talkcoms.io" }],
      offices: [
        {
          name: "United Kingdom",
          location:
            "The Kings Centre Main Road, Barleythorpe Oakham, LE15 7WD, United Kingdom",
        },
        {
          name: "Nairobi",
          location:
            "Great Jubilee Center ( The Well), Karen, Nairobi 1’st Floor Unit No. 07, Kenya",
        },
        {
          name: "Eldama Ravine",
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
  created() {
    document.title = "Talkcoms | Get started";

    this.load_page();
    this.universal_services = universal_content().services;
    this.universal_products = universal_content().products;
    this.universal_industries = universal_content().industries;
    this.services = [...this.universal_products, ...this.universal_services];

    if (
      this.universal_services == "" ||
      this.universal_products == "" ||
      this.universal_industries == ""
    ) {
      this.fetch_service_names();
    }
  },
  methods: {
    load_page() {
      setTimeout(() => {
        this.page_is_loading = false;
      }, 1000);
    },
    /* fetch service names */
    async fetch_service_names() {
      try {
        const response = await fetch(
          "https://cms.talkcoms.co.uk/api/service-pages/?fields[0]=product_name&fields[1]=is_product"
        );
        const responseData = await response.json();
        if (responseData.data) {
          const dataArray = Array.isArray(responseData.data)
            ? responseData.data
            : [responseData.data];
          const fetched_services = dataArray;
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
    /* get in touch */
    async enquire() {
      if (
        this.button_message == "Sent. Thank you!" ||
        this.is_submitting === true
      ) {
        return;
      }

      // Check if phone is an integer
      if (!/^\d+$/.test(this.phone)) {
        this.phone_is_number = false;
        this.phone_text = "Input a valid number";
        return;
      }

      // Check if company size is provided and is an integer (only if applicable)
      if (this.selected !== "" && !/^\d+$/.test(this.company_size)) {
        this.size_is_number = false;
        this.company_text = "Input a valid number";
        return;
      }

      this.is_submitting = true;

      if (this.selected == "") {
        this.enquiry_form = {
          first_name: this.f_name,
          last_name: this.l_name,
          email: this.email,
          position: this.role,
          company: this.company_name,
          phone: this.phone,
          message: this.message,
        };
        this.sending_endpoint = contact_us_url;
      } else {
        this.enquiry_form = {
          name1: this.f_name,
          last_name: this.l_name,
          phone_number: this.phone,
          email: this.email,
          message: this.message,
          company: this.company_name,
          company_size: this.company_size,
          service: this.selected,
          positionincompany: this.role,
          appoitment_date: this.date_time,
        };
        this.sending_endpoint = enquiry_url;
      }

      try {
        const res = await fetch(this.sending_endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.enquiry_form),
        });

        const data = await res.json();
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
          this.company_size = "";
          (this.phone_is_number = true),
            (this.size_is_number = true),
            (this.company_text = "Company Size"),
            (this.phone_text = "Company Phone");
        }, 4000);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        this.is_submitting = false;
      }
    },

    //get services
  },
};
</script>
