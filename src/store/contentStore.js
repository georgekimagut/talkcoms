import { defineStore } from "pinia";

export const universal_content = defineStore("universal_content", {
  state: () => ({
    services: [],
    products: [],
    emails: [
      { title: "solutions@talkcoms.co.uk" },
      { title: "solutions@talkcoms.co.uk" },
    ],
    phones: [{ title: "+254746433163" }, { title: "+447746433163" }],
  }),
  actions: {
    setServices(data) {
      this.services = data;
    },
    setProducts(data) {
      this.products = data;
    },
    setEmails(data) {
      this.emails = data;
    },
    setPhones(data) {
      this.phones = data;
    },
  },
  persist: true, //  Enable persistence in localStorage
});
