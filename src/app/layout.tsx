import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import NavbarTeam from "@/components/Navbar/NavbarTeam";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "E-Cell NIT Silchar",
  description: "Official website of E-Cell NIT Silchar",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <NavbarTeam />
        {children}
        <Footer />
      </body>
    </html>
  );
}
