//theme colors
export const theme_colors = [
  { color_name: "#131f6b" }, //default_color
  { color_name: "#fefffe" }, //white_color
  { color_name: "#82bc00" }, //secondary_color
  { color_name: "#007cba" }, //third_color
];
//text colors
export const text_colors = [
  { color_name: "#131f6b" }, //default_color
  { color_name: "#82bc00" }, //secondary_color
  { color_name: "#007cba" }, //third_color
];

export const apiEndpoint =
  "https://cms.talkcoms.co.uk/api/blog-posts?populate=*&sort=createdAt:desc&pagination[limit]="; /* add a limit */
export const home_end_point =
  "https://cms.talkcoms.co.uk/api/homepages/?populate=*&sort=createdAt:desc";
export const services_end_point =
  "https://cms.talkcoms.co.uk/api/service-pages/?populate=*";
export const contact_us_end_point =
  "https://cms.talkcoms.co.uk/api/contact-us-pages/?populate=*&sort=createdAt:desc";

export const success_stories_end_point =
  "https://cms.talkcoms.co.uk/api/success-stories?populate=*&sort=createdAt:desc";

export const about_end_point =
  "https://cms.talkcoms.co.uk/api/about-uses/?populate=*";

export const enquiry_url =
  "https://crm.talkcoms.co.uk/api/resource/Website%20Inquiry";
export const contact_us_url =
  "https://crm.talkcoms.co.uk/api/resource/Get%20In%20Touch";

export const home_services_end_point =
  "https://cms.talkcoms.co.uk/api/homepages?populate[services][populate]=*";

export const faqs_end_point =
  "https://cms.talkcoms.co.uk/api/fa-qs-pages/?populate=*";

export const testimonials_end_point =
  "https://cms.talkcoms.co.uk/api/testimonials?populate=*";

export const industries_end_point =
  "https://cms.talkcoms.co.uk/api/industries/?populate=*";

export const portfolio_end_point =
  "https://cms.talkcoms.co.uk/api/portfolios/?populate=*&sort=createdAt:desc&pagination[limit]=3";

export const baseUrl = "https://cms.talkcoms.co.uk"; // Base URL for Strapi
export const is_blog = "blog";
