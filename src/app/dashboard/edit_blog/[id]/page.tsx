"use client";

import { use } from "react";
import EditBlogClient from "./EditBlogClient";

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <EditBlogClient blogId={id} />;
}
