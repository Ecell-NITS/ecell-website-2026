import { redirect } from "next/navigation";

export default function AllBlogs() {
  redirect("/dashboard?tab=all");
}
