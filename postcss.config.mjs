/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "postcss-nested": {},
    "postcss-custom-properties": {},
    "postcss-custom-selectors": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
