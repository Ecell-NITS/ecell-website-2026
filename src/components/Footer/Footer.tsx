/* eslint-disable */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ArrowUp,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [disableSend, setDisableSend] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const createUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please fill all the required fields");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Please enter a correct email");
      return;
    }
    try {
      setDisableSend(true);
      setCheckingEmail(true);
      // Ensure your .env variables are set correctly for these to work
      const check = await axios.post(
        `${process.env.NEXT_PUBLIC_APIMAIN}/check-email`,
        { email },
      );
      if (!check.data.unique) {
        toast.warn("You have already subscribed to our newsletter");
        return;
      }
      await axios.post(`${process.env.NEXT_PUBLIC_APIMAIN}/createUser`, {
        email,
      });
      toast.success("Subscribed to Our Newsletter 🥳");
      setEmail("");
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setDisableSend(false);
      setCheckingEmail(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#020617] pt-24 pb-12 font-sans text-white">
      <div className="container mx-auto px-6">
        <div className="mb-20 grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
          {/* COLUMN 1: BRAND & SOCIALS */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-8 inline-block">
              <Image
                src="https://res.cloudinary.com/dp92qug2f/image/upload/v1678341670/Ecell%20website/E-Cell-Logo-White_qhkb0q.webp"
                alt="E-Cell Logo"
                width={150}
                height={50}
                className="h-16 w-auto opacity-90 transition-opacity hover:opacity-100"
              />
            </Link>
            <p className="mb-8 font-sans text-sm leading-relaxed text-gray-500">
              Empowering the next generation of innovators at NIT Silchar. We
              build, nurture, and grow the entrepreneurial ecosystem of North
              East India.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/ecell.nit.silchar"
                target="_blank"
                rel="noreferrer"
                className="glass flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition-all hover:border-blue-500/30 hover:text-blue-500"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com/ecell.nitsilchar"
                target="_blank"
                rel="noreferrer"
                className="glass flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition-all hover:border-blue-500/30 hover:text-blue-500"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/ecell-nit-silchar/"
                target="_blank"
                rel="noreferrer"
                className="glass flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition-all hover:border-blue-500/30 hover:text-blue-500"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://twitter.com/ecell_nits"
                target="_blank"
                rel="noreferrer"
                className="glass flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition-all hover:border-blue-500/30 hover:text-blue-500"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* COLUMN 2: NAVIGATION */}
          <div>
            <h4 className="mb-8 font-sans text-xs font-bold tracking-widest text-white uppercase">
              Navigation
            </h4>
            <ul className="space-y-4">
              {["Home", "About Us", "Events", "Our Team", "Gallery"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={
                        item === "Home"
                          ? "/"
                          : `/${item.toLowerCase().replace(" ", "")}`
                      }
                      className="font-sans text-sm text-gray-500 transition-colors hover:text-blue-400"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* COLUMN 3: CONTACT / ORGANISATION */}
          <div>
            <h4 className="mb-8 font-sans text-xs font-bold tracking-widest text-white uppercase">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 font-sans text-sm text-gray-500">
                <MapPin
                  size={16}
                  className="mt-1 flex-shrink-0 text-blue-500"
                />
                <span className="transition-colors hover:text-white">
                  NIT Silchar, Assam - 788010
                </span>
              </li>
              <li className="flex items-center gap-3 font-sans text-sm text-gray-500">
                <Mail size={16} className="text-blue-500" />
                <a
                  href="mailto:ecell@nits.ac.in"
                  className="transition-colors hover:text-white"
                >
                  ecell@nits.ac.in
                </a>
              </li>
              <li className="flex items-center gap-3 font-sans text-sm text-gray-500">
                <Phone size={16} className="text-blue-500" />
                <a
                  href="tel:+916388689290"
                  className="transition-colors hover:text-white"
                >
                  +91 6388689290
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER */}
          <div>
            <h4 className="mb-8 font-sans text-xs font-bold tracking-widest text-white uppercase">
              Newsletter
            </h4>
            <p className="mb-6 font-sans text-sm leading-relaxed text-gray-500">
              Keep yourself updated. Subscribe to our monthly newsletter.
            </p>
            <form
              onSubmit={(e) => createUser(e as any)}
              className="group relative"
            >
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={disableSend}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-sans text-sm text-white transition-all placeholder:text-gray-600 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={disableSend}
                className="absolute top-2 right-2 bottom-2 rounded-xl bg-blue-600 px-4 font-sans text-xs font-bold tracking-wide text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {checkingEmail ? "..." : "JOIN"}
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-12 md:flex-row">
          <p className="font-sans text-xs text-gray-600">
            © 2026 E-Cell, NIT Silchar. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="font-sans text-xs text-gray-600 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-sans text-xs text-gray-600 transition-colors hover:text-white"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>

      {/* SCROLL TO TOP BUTTON */}
      <button
        onClick={scrollToTop}
        className="glass fixed right-8 bottom-8 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all hover:text-blue-500 hover:shadow-2xl hover:shadow-blue-500/20"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
