import { createWriteStream } from "fs";
import { SitemapStream } from "sitemap";
import { routes } from "./src/router/index.js";
// import fetch from "node-fetch"; // If you're fetching data from an API

const hostname = "http://localhost:5173";

const sitemap = new SitemapStream({ hostname });
const writeStream = createWriteStream("./public/sitemap.xml");
sitemap.pipe(writeStream);

// Add static routes only (no dynamic placeholders)
routes.forEach((route) => {
  if (!route.path.includes(":")) {
    sitemap.write({
      url: route.path,
      changefreq: "monthly",
      priority: route.path === "/" ? 1.0 : 0.7,
    });
  }
});

// ✅ Dynamic route data
// You should replace these arrays with actual data from your CMS/API

const services = [{ id: "voice-solutions" }, { id: "contact-center" }];

const products = [{ id: "talkcoms-cloud" }, { id: "sms-marketing" }];

const solutions = [{ id: "education" }, { id: "healthcare" }];

const resources = [
  { type: "ebooks", id: "ultimate-guide" },
  { type: "whitepapers", id: "2025-report" },
];

const contactTypes = [{ type: "sales" }, { type: "support" }];

// Write dynamic URLs
services.forEach((service) => {
  sitemap.write({
    url: `/service/${service.id}`,
    changefreq: "weekly",
    priority: 0.8,
  });
});

products.forEach((product) => {
  sitemap.write({
    url: `/product/${product.id}`,
    changefreq: "weekly",
    priority: 0.8,
  });
});

solutions.forEach((solution) => {
  sitemap.write({
    url: `/solution/${solution.id}`,
    changefreq: "weekly",
    priority: 0.8,
  });
});

resources.forEach((resource) => {
  sitemap.write({
    url: `/resources/${resource.type}/${resource.id}`,
    changefreq: "monthly",
    priority: 0.6,
  });
});

contactTypes.forEach((entry) => {
  sitemap.write({
    url: `/contact/${entry.type}`,
    changefreq: "monthly",
    priority: 0.6,
  });
});

sitemap.end();
console.log("✅ Sitemap generated at public/sitemap.xml");
