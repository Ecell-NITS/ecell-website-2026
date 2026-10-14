import type { MetadataRoute } from "next";

const SITE_URL = "https://ecellnits.org";

export const dynamic = "force-dynamic";

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
    if (!res.ok) {
      throw new Error(`Failed to load blogs: ${res.status}`);
    }
    const json = (await res.json()) as {
      data?: { title: string; timeStamp?: string; createdAt?: string }[];
    };
    const blogs = json.data ?? [];

    blogRoutes = blogs.map((blog) => {
      const slug = blog.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      return {
        url: `${SITE_URL}/blog/${slug}`,
        lastModified: blog.timeStamp
          ? new Date(blog.timeStamp)
          : blog.createdAt
            ? new Date(blog.createdAt)
            : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    });
  } catch (error) {
    console.error("Failed to load published blogs for sitemap:", error);
    // If API is down, still serve static routes
  }

  return [...staticRoutes, ...blogRoutes];
}
