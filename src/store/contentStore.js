import { defineStore } from "pinia";

export const universal_content = defineStore("universal_content", {
  state: () => ({
    services: [],
    products: [],
    emails: [],
    phones: [],
    industries: [],
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
    setIndustries(data) {
      this.industries = data;
    },
  },
  persist: true, //  Enable persistence in localStorage
});
