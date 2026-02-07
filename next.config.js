/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
/**@type {import('next').NextConfig}*/

import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: [
      "res.cloudinary.com",
      "cdn.pixabay.com",
      "images.unsplash.com",
      "i.pravatar.cc",
      "png.pngtree.com",
    ],
  },
};

export default config;
