import { type RequestHandler } from 'msw';

// Glob import any file in this directory except index.ts
// https://vite.dev/guide/features#glob-import
const modules = import.meta.glob<{ handlers: RequestHandler[] }>(
  './!(index).ts',
  {
    eager: true,
  },
);

export const handlers = Object.values(modules).flatMap(
  (module) => module.handlers ?? [],
);
