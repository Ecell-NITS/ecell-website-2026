// src/components/Dashboard/EditProfileServer.tsx
import { promises as fs } from "fs";
import path from "path";
import { EditProfileClient } from "./EditProfileClient";
import type { User as ClientUser } from "./EditProfileClient";

interface User {
  id: string;
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
  role:string;
}
function mapUserToClientUser(user: User): ClientUser {
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
    role: (user as any).role ?? "USER",
  };
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
  const rawUser = await getUserData();

  const user = rawUser ? mapUserToClientUser(rawUser) : null;

  return <EditProfileClient initialUser={user} />;
}
