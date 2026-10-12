export interface ApiBlog {
  id: string;
  title: string;
  description?: string;
  fullContent?: string;
  author?: string;
  role?: string;
  readTime?: string;
  likes?: number | Array<string | number>;
  isLiked?: boolean;
  is_liked?: boolean;
  tags?: string[] | string;
  image?: string;
  avatar?: string;
  date?: string;
  intro?: string;
  tag?: string;
  content?: string;
  writerName?: string;
  coverImage?: string;
  topicPic?: string;
  writerPic?: string;
  createdAt?: string;
  timeStamp?: string;
  authorId?: string;
  status?: string;
  isAccepted?: boolean;
  _count?: { comments?: number };
}

export interface Blog {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  author: string;
  role: string;
  readTime: string;
  likes: number;
  isLiked?: boolean;
  tags: string[];
  image: string;
  avatar: string;
  date: string;
  source?: "api";
}

export function isApiBlog(value: unknown): value is ApiBlog {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const blog = value as Record<string, unknown>;
  return typeof blog.id === "string" && typeof blog.title === "string";
}

export function extractApiBlogs(payload: unknown): ApiBlog[] {
  if (Array.isArray(payload)) {
    return payload.filter(isApiBlog);
  }

  if (typeof payload === "object" && payload !== null && "data" in payload) {
    const data = (payload as { data?: unknown }).data;
    return Array.isArray(data) ? data.filter(isApiBlog) : [];
  }

  return [];
}

function nonEmpty(value?: string): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) {
    return undefined;
  }
  return trimmed;
}

export function normalizeApiBlog(blog: ApiBlog, userId?: string): Blog {
  const content = nonEmpty(blog.content);
  const fullContent =
    nonEmpty(blog.fullContent) ?? content ?? nonEmpty(blog.intro) ?? "";
  const plainContent = fullContent.replace(/<[^>]*>/g, " ").trim();
  const intro = nonEmpty(
    (blog.description ?? blog.intro)?.replace(/<[^>]*>/g, " "),
  );
  const contentDescription = plainContent.slice(0, 180);
  const description =
    intro ??
    nonEmpty(contentDescription) ??
    "Read this story from the E-Cell community.";
  const wordCount = plainContent.split(/\s+/).filter(Boolean).length;
  const author = nonEmpty(blog.author) ?? nonEmpty(blog.writerName);
  const coverImage = nonEmpty(blog.coverImage);
  const topicPic = nonEmpty(blog.topicPic);
  const writerPic = nonEmpty(blog.writerPic);
  const date =
    nonEmpty(blog.date) ??
    nonEmpty(blog.createdAt) ??
    nonEmpty(blog.timeStamp) ??
    "";
  const tags = Array.isArray(blog.tags)
    ? blog.tags.map((tag) => tag.trim().replace(/^#/, "")).filter(Boolean)
    : ((blog.tags ?? blog.tag)
        ?.split(/[,|]/)
        .map((tag) => tag.trim().replace(/^#/, ""))
        .filter(Boolean) ?? []);
  const likes =
    typeof blog.likes === "number" && Number.isFinite(blog.likes)
      ? Math.max(0, blog.likes)
      : Array.isArray(blog.likes)
        ? blog.likes.length
        : 0;
  const isLiked =
    typeof blog.isLiked === "boolean"
      ? blog.isLiked
      : typeof blog.is_liked === "boolean"
        ? blog.is_liked
        : userId && Array.isArray(blog.likes)
          ? blog.likes.some((likedUserId) => String(likedUserId) === userId)
          : undefined;

  return {
    id: blog.id,
    title: blog.title,
    description,
    fullContent,
    author: author ?? "E-Cell Community",
    role: nonEmpty(blog.role) ?? "Community Writer",
    readTime:
      nonEmpty(blog.readTime) ??
      `${Math.max(1, Math.ceil(wordCount / 200))} min read`,
    tags,
    likes,
    isLiked,
    image: nonEmpty(blog.image) ?? coverImage ?? topicPic ?? "/landing1.jpg",
    avatar:
      nonEmpty(blog.avatar) ?? writerPic ?? "/profile_picture_holder.webp",
    date,
    source: "api",
  };
}
