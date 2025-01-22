/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-preset-env': {
      stage: 1,
    },
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
