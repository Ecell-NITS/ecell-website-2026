import PageClient from "./PageClient";
import { eventModules } from "src/content/modules";

// This function tells Next.js exactly which routes to build
export async function generateStaticParams() {
  // Get all keys from your eventModules object
  const slugs = Object.keys(eventModules);

  return slugs.map((slug) => ({
    slug: slug,
  }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PageClient slug={slug} />;
}
