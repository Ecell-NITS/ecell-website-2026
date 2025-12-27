export default {
  // Run ESLint on TypeScript and JavaScript files (excluding config files)
  // Allows warnings but blocks errors
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],

  // Run Prettier on JS files and other supported files
  "*.{js,jsx,json,md,mdx,css,html,yml,yaml}": ["prettier --write"],
};
