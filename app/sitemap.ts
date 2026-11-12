import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Shortcut routes (/cv, /projects...) render the same chat shell, so only the home page is listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, changeFrequency: "monthly", priority: 1 }];
}
