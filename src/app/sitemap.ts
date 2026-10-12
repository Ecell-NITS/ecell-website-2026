import type { MetadataRoute } from "next";
import { staticBlogs } from "@/data/blogsData";

const SITE_URL = "https://ecellnits.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/events`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/team`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/alumni`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/initiatives`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Blog routes (curated static blogs + dynamic backend blogs)
  let blogRoutes: MetadataRoute.Sitemap = staticBlogs.map((blog) => {
    const slug = blog.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return {
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: new Date(blog.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
    const res = await fetch(`${API_URL}/api/blog`, {
      next: { revalidate: 3600 },
    });
    const json = (await res.json()) as {
      data?: { title: string; timeStamp?: string; createdAt?: string }[];
    };
    const blogs = json.data ?? [];

    const dynamicRoutes = blogs
      .filter(
        (b) =>
          !staticBlogs.some(
            (s) => s.title.toLowerCase().trim() === b.title.toLowerCase().trim(),
          ),
      )
      .map((blog) => {
        const slug = blog.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        return {
          url: `${SITE_URL}/blog/${slug}`,
          lastModified: blog.timeStamp ? new Date(blog.timeStamp) : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        };
      });

    blogRoutes = [...blogRoutes, ...dynamicRoutes];
  } catch {
    // If API is down, static blog routes are already included
  }

  return [...staticRoutes, ...blogRoutes];
}
