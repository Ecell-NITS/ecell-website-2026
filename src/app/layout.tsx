import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NavbarTeam from "@/components/Navbar/NavbarTeam";
import Footer from "@/components/Footer/Footer";
import "@/styles/theme.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "E-Cell | NIT Silchar",
  description: "The Entrepreneurship Cell of NIT Silchar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} bg-[#020617] font-sans antialiased`}
      >
        <NavbarTeam />
        {children}
        <Footer />
      </body>
    </html>
  );
}
