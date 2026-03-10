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
  overrides: [
    {
      files: [
        'tsconfig.json',
        'tsconfig.node.json',
        'tsconfig.app.json',
        '.vscode/settings.json',
        '.zed/settings.json',
      ],
      options: {
        parser: 'jsonc',
      },
    },
  ],
};

export default config;
