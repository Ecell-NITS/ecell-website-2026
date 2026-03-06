import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/dashboard",
          "/login",
          "/signup",
          "/forgot-password",
          "/change-password",
          "/auth/",
        ],
      },
    ],
    sitemap: "https://ecellnits.org/sitemap.xml",
  };
}
