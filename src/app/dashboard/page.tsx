// src/app/dashboard/page.tsx
import { Suspense } from "react";
import Navbar from "../../components/Landing/Navbar";
import { DashboardContent } from "@/components/Dashboard/DashboardContentServer";

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <div className="px-6 pt-32 pb-12 lg:px-8">
        <div className="mx-auto max-w-6xl animate-pulse space-y-4">
          <div className="h-48 rounded-3xl bg-white/10"></div>
          <div className="h-64 rounded-3xl bg-white/10"></div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#020617] text-white antialiased selection:bg-blue-500/30 selection:text-white">
      <Navbar />
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
