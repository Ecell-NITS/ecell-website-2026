import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function LikedBlogs() {
  redirect("/dashboard?tab=liked");
}
