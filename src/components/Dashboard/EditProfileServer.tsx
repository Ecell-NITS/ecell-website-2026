// src/components/Dashboard/EditProfileServer.tsx
// Thin client wrapper — EditProfileClient fetches its own data from the API.
"use client";

import { EditProfileClient } from "./EditProfileClient";

export function EditProfileServer() {
  return <EditProfileClient initialUser={null} />;
}
