// src/components/Dashboard/DashboardContentServer.tsx
// This was a server component reading MOCK_DATA.json. Now it simply renders
// the client wrapper which fetches data from the API via AuthContext.
"use client";

import { DashboardClientWrapper } from "./DashboardClientWrapper";

export function DashboardContent() {
  return <DashboardClientWrapper initialUser={null} initialAllUsers={[]} />;
}
