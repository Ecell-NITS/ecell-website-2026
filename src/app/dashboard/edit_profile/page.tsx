// src/app/dashboard/edit_profile/page.tsx
import { Suspense } from "react";
import Navbar from "../../../components/Landing/Navbar";
import { EditProfileServer } from "@/components/Dashboard/EditProfileServer";

function EditProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <section className="relative overflow-hidden px-6 pt-32 pb-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="h-20 animate-pulse rounded-3xl bg-white/10"></div>
        </div>
      </section>
      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="h-[600px] animate-pulse rounded-3xl bg-white/10"></div>
        </div>
      </section>
    </div>
  );
}

export default function EditProfile() {
  return (
    <div className="min-h-screen bg-[#020617] text-white antialiased selection:bg-blue-500/30 selection:text-white">
      <Navbar />
      <main className="relative flex min-h-screen flex-col">
        <Suspense fallback={<EditProfileSkeleton />}>
          <EditProfileServer />
        </Suspense>
      </main>
    </div>
  );
}
