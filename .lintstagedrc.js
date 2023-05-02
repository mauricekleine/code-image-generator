module.exports = {
  "*.{js,json,jsx,md,mdx,ts,tsx}": ["prettier --write"],
  "*.{js,jsx,ts,tsx}": ["eslint --fix"],
  "package.json": ["sort-package-json"],
};
