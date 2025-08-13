// utils/metaConfig.js
const siteName = "Talkcoms limited";

export const metaTemplates = {
  //home page
  home: (data) => ({
    description:
      data.metaDescription ||
      "Powering Digital Transformation Across Finance, Healthcare, Legal Sectors & Other Industries. Leading IT Solutions Provider ",
    ogTitle: data.ogTitle || "Trusted IT Partner for Businesses",
    ogImage: data.heroImage?.url || "../../../hero-pic.avif",
    canonical: "/",
    schemaType: "WebSite",
    specialMeta: [
      {
        name: "geo.placename",
        content: data.location?.city || "Nairobi Kenya",
      },
      { name: "geo.region", content: data.location?.region || "US-CA" },
    ],
  }),

  // Blog Post Template
  blog: (data) => ({
    description: data.Title,
    ogTitle: data.Title,
    ogDescription: data.Title,
    ogImage: data.hero_media?.formats?.large?.url || data.hero_media?.url,
    canonical: `resources/blog/${data.slug}`,
    structuredData: {
      "@type": "BlogPosting",
      headline: data.Title,
      description: data.Title,
      // ...other schema properties
    },
  }),

  //success stories
  story: (data) => ({
    description: data.sub_title,
    ogTitle: data.title,
    ogDescription: data.sub_title,
    ogImage: data.image?.url,
    canonical: `resources/blog/${data.title}`,
    structuredData: {
      "@type": "BlogPosting",
      headline: data.title,
      description: data.sub_title,
      // ...other schema properties
    },
  }),

  // Product/Service Template
  product: (data) => ({
    description: data.secondary_title || ` ${data.secondary_title} `,
    ogTitle: `${data.main_title} Solutions`,
    ogImage: data?.formats?.large?.url || data.hero_media?.url,
    canonical: `/product/${data.main_title}`,
    structuredData: {
      "@type": "Product",
      name: data.main_title,
      description: data.secondary_title,
      // ...product schema
    },
  }),

  // Industry Solution Template
  industry: (data) => ({
    description: `${data.secondary_title} `,
    ogTitle: `${data.main_title} - Focused Solutions`,
    canonical: `/solution/${data.slug}`,
    // ...industry-specific meta
  }),

  // Default Fallback
  default: {
    description:
      "Powering Digital Transformation Across Finance, Healthcare, Legal Sectors & Other Industries",
    ogImage: "../../../hero-pic.avif",
  },
};
