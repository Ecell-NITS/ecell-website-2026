// Server Component - fetches data on the server
import { promises as fs } from "fs";
import path from "path";
import { DashboardClientWrapper } from "./DashboardClientWrapper";

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

async function getUsersData(): Promise<User[]> {
  const filePath = path.join(process.cwd(), "public", "MOCK_DATA.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents) as User[];
}

export async function DashboardContent() {
  const allUsers = await getUsersData();
  const user = allUsers[0] ?? null;

  return (
    <DashboardClientWrapper initialUser={user} initialAllUsers={allUsers} />
  );
}
