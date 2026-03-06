import "@/styles/globals.css";

import { type Metadata } from "next";
import ClientLayout from "@/components/Preloader/ClientLayout";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://ecellnits.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "E-Cell NIT Silchar",
    template: "%s | E-Cell NIT Silchar",
  },
  description:
    "E-Cell NIT Silchar is a non-profit student-run organization promoting and nurturing the entrepreneurial spirit among students of NIT Silchar.",
  keywords: [
    "E-Cell",
    "NIT Silchar",
    "Entrepreneurship",
    "Startup",
    "Innovation",
    "Entrepreneurship Cell",
    "NITS",
    "E-Cell NITS",
    "EIC",
    "EMINENCE",
    "EMPRESARIO",
    "ENGENIUS",
  ],
  authors: [{ name: "E-Cell NIT Silchar", url: SITE_URL }],
  creator: "E-Cell NIT Silchar",
  applicationName: "E-Cell NIT Silchar",
  icons: [
    { rel: "icon", url: "/favicon.png" },
    { rel: "apple-touch-icon", url: "/favicon.png" },
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "E-Cell NIT Silchar",
    title: "E-Cell NIT Silchar — Fostering Innovation & Leadership",
    description:
      "E-Cell NIT Silchar is a non-profit student-run organization promoting and nurturing the entrepreneurial spirit among students of NIT Silchar.",
    images: [
      {
        url: "/og/landing.png",
        width: 1200,
        height: 630,
        alt: "E-Cell NIT Silchar Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Cell NIT Silchar",
    description: "Fostering Innovation & Leadership at NIT Silchar.",
    images: ["/og/landing.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Inline critical CSS: match preloader bg to prevent flash */}
        <style
          dangerouslySetInnerHTML={{ __html: `body{background:#020617}` }}
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router layout applies to all pages */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Organization structured data for search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "E-Cell, NIT Silchar",
              alternateName: "Entrepreneurship Cell NIT Silchar",
              url: "https://ecellnits.org",
              logo: "https://ecellnits.org/ecelllogo.png",
              sameAs: [
                "https://www.facebook.com/ecell.nits",
                "https://www.instagram.com/ecell.nitsilchar",
                "https://www.linkedin.com/company/ecell-nit-silchar",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "General Inquiries",
                email: "ecell@nits.ac.in",
              },
              description:
                "E-Cell, NIT Silchar is a non-profit student-run organization promoting and nurturing the entrepreneurial spirit among students.",
            }),
          }}
        />
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
