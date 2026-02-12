// src/components/Dashboard/EditProfileServer.tsx
import { promises as fs } from "fs";
import path from "path";
import { EditProfileClient } from "./EditProfileClient";

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
}

async function getUserData(): Promise<User | null> {
  try {
    const filePath = path.join(process.cwd(), "public", "MOCK_DATA.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const users = JSON.parse(fileContents) as User[];
    return users[0] ?? null;
  } catch (error) {
    console.error("Error reading user data:", error);
    return null;
  }
}

export async function EditProfileServer() {
  const user = await getUserData();

  return <EditProfileClient initialUser={user} />;
}
