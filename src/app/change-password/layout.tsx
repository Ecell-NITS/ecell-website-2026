import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Password",
  description: "Change your E-Cell NIT Silchar account password.",
  robots: { index: false, follow: false },
};

export default function ChangePasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
