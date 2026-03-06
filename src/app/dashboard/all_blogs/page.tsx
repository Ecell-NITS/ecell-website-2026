import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function AllBlogs() {
  redirect("/dashboard?tab=all");
}
