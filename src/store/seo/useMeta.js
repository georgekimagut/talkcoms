// composables/useMeta.js
import { useHead } from "@unhead/vue";
import { metaTemplates } from "./metaConfig";

export default function useDynamicMeta(pageType, pageData) {
  const template = metaTemplates[pageType] || metaTemplates.default;
  const meta = typeof template === "function" ? template(pageData) : template;

  useHead({
    title: meta.title,
    meta: [
      { name: "description", content: meta.description },
      { property: "og:title", content: meta.ogTitle || meta.title },
      {
        property: "og:description",
        content: meta.ogDescription || meta.description,
      },
      { property: "og:image", content: meta.ogImage },
      {
        property: "og:url",
        content: meta.canonical
          ? `https://talkcoms.co.uk${meta.canonical}`
          : window.location.href,
      },
      // Twitter Cards, etc.
    ],
    link: [
      { rel: "canonical", href: `https://talkcoms.co.uk${meta.canonical}` },
    ],
    script: meta.structuredData
      ? [
          {
            type: "application/ld+json",
            innerHTML: JSON.stringify(meta.structuredData),
          },
        ]
      : [],
  });
}
