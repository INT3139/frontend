import { type Config } from 'prettier';

const config: Config = {
  singleQuote: true,
  trailingComma: 'all',
  plugins: [
    'prettier-plugin-tailwindcss',
    '@ianvs/prettier-plugin-sort-imports',
  ],
  tailwindFunctions: ['cn'],
  importOrderCaseSensitive: true,
};

export default config;
