import "@/styles/globals.css";

import { type Metadata } from "next";
import ClientLayout from "@/components/Preloader/ClientLayout";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";

// import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "E-Cell NIT Silchar",
  description:
    "Entrepreneurship Cell, NIT Silchar — Fostering Innovation & Leadership",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* <ClerkProvider> */}
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
        {/* </ClerkProvider> */}
      </body>
    </html>
  );
}
