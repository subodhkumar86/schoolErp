import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://eduflow-erp.com";
  const routes = ["", "/features", "/pricing", "/about", "/contact", "/demo", "/faq", "/privacy-policy", "/terms", "/blog"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
}
