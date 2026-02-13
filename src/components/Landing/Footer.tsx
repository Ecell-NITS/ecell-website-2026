import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import ScrollToTopButton from "../About/ScrollToTopButton";

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-black pt-16 pb-12 lg:pt-24">
      <div className="container mx-auto px-6">
        {/* Changed Grid Logic: grid-cols-2 for mobile (2 layers), grid-cols-4 for desktop */}
        <div className="mb-20 grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-16">
          <div className="col-span-2 lg:col-span-1">
            <Image
              src="https://res.cloudinary.com/dp92qug2f/image/upload/v1678341670/Ecell%20website/E-Cell-Logo-White_qhkb0q.webp"
              alt="E-Cell Logo"
              className="mb-6 h-12 w-auto lg:mb-8 lg:h-16"
              width={200}
              height={64}
              sizes="(max-width: 1024px) 200px, 200px"
              loading="lazy"
              placeholder="empty"
            />
            <p className="mb-8 pr-4 text-sm leading-relaxed text-gray-500">
              Empowering the next generation of innovators at NIT Silchar. We
              build, nurture, and grow the entrepreneurial ecosystem of North
              East India.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="glass flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition-all hover:border-blue-500/30 hover:text-blue-500"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-bold tracking-widest text-white uppercase lg:mb-8">
              Navigation
            </h4>
            <ul className="space-y-4">
              {[
                "Home",
                "About Us",
                "Events",
                "Our Team",
                "Resources",
                "Gallery",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-500 transition-colors hover:text-blue-400"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-bold tracking-widest text-white uppercase lg:mb-8">
              Organisation
            </h4>
            <ul className="space-y-4">
              {[
                "Startup Center",
                "NIT Silchar",
                "Assam, India",
                "IIC Cell",
                "Srijan Summit",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-500 transition-colors hover:text-blue-400"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="mb-6 text-xs font-bold tracking-widest text-white uppercase lg:mb-8">
              Newsletter
            </h4>
            <p className="mb-6 text-sm leading-relaxed text-gray-500">
              Keep yourself updated. Subscribe to our monthly newsletter.
            </p>
            <div className="group relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-white transition-all focus:border-blue-500 focus:outline-none"
              />
              <button className="absolute top-2 right-2 bottom-2 rounded-xl bg-blue-600 px-4 text-white transition-colors hover:bg-blue-700">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-12 md:flex-row">
          <p className="text-center text-xs text-gray-600 md:text-left">
            © {new Date().getFullYear()} E-Cell, NIT Silchar. All rights
            reserved.
          </p>
          <div className="flex gap-8">
            <a
              href="#"
              className="text-xs text-gray-600 transition-colors hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-gray-600 transition-colors hover:text-white"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>

      <ScrollToTopButton />
    </footer>
  );
};

export default Footer;
