import { redirect } from "next/navigation";

export default function LikedBlogs() {
  redirect("/dashboard?tab=liked");
}
