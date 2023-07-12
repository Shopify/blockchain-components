module.exports = {
  ...require('@shopify/prettier-config'),
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.ts',
};
