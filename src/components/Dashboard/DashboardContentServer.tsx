// Server Component - fetches data on the server
import { promises as fs } from "fs";
import path from "path";
import { DashboardClientWrapper } from "./DashboardClientWrapper";
import type { DashboardUser } from "./DashboardClientWrapper";
import type { BackendBlog } from "./DashboardClientWrapper";


interface User {
  id: number;
  first_name: string;
  email: string;
  image: string;
  gender: string;
  post: string;
  age: number;
  country: string;
  facebook_profile: string;
  twitter_handle: string;
  instagram_handle: string;
  linkedin_profile: string;
  github: string;
  about: string;
  All_blogs: Blog[];
}

type Blog = {
  id: number;
  title: string;
  brief_intro: string;
  read_time: string;
  category: string;
  likes: number;
  comments: number;
  is_liked: boolean;
  cover_image: string;
  details: string;
  posted_on: string;
};
function mapBlogToBackendBlog(blog: Blog): BackendBlog {
  return {
    id: blog.id,
    title: blog.title,
    tag: blog.category,
    intro: blog.brief_intro,
    content: blog.details,
    timeStamp: blog.posted_on,
    topicPic: blog.cover_image,
    isAccepted: true, // mock default
  };
}

function mapUserToDashboardUser(user: User): DashboardUser {
  return {
    id: user.id,
    name: user.first_name,
    email: user.email,
    picture: user.image,
    facebook: user.facebook_profile,
    instagram: user.instagram_handle,
    linkedin: user.linkedin_profile,
    github: user.github,
    bio: user.about,
    blogs: (user.All_blogs ?? []).map(mapBlogToBackendBlog),

  };
}

async function getUsersData(): Promise<User[]> {
  const filePath = path.join(process.cwd(), "public", "MOCK_DATA.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents) as User[];
}

export async function DashboardContent() {
  const allUsers = await getUsersData();

  const rawUser = allUsers[0] ?? null;

  const user = rawUser ? mapUserToDashboardUser(rawUser) : null;

  const mappedAllUsers = allUsers.map(mapUserToDashboardUser);

  return (
    <DashboardClientWrapper
      initialUser={user}
      initialAllUsers={mappedAllUsers}
    />
  );
}

