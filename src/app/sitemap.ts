import type { MetadataRoute } from "next";
import fallbackBlogs from "@/data/blogs.json";

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

  // Dynamic blog routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
    const res = await fetch(`${API_URL}/api/blog/acceptedBlogs`, {
      next: { revalidate: 3600 },
    });
    const json = (await res.json()) as {
      data?: { title: string; timeStamp?: string; createdAt?: string }[];
    };
    const apiBlogs = json.data ?? [];

    const allBlogsMap = new Map<
      string,
      { title: string; timeStamp?: string }
    >();
    fallbackBlogs.forEach((b) => {
      if (b.title)
        allBlogsMap.set(b.title.toLowerCase(), {
          title: b.title,
          timeStamp: b.timeStamp,
        });
    });
    apiBlogs.forEach((b) => {
      if (b.title)
        allBlogsMap.set(b.title.toLowerCase(), {
          title: b.title,
          timeStamp: b.timeStamp ?? b.createdAt,
        });
    });

    blogRoutes = Array.from(allBlogsMap.values()).map((blog) => {
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
  } catch {
    // If API is down, use fallback blogs for sitemap
    blogRoutes = fallbackBlogs.map((blog) => {
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
  }

  return [...staticRoutes, ...blogRoutes];
}
