// Remove first slash from a string
// Example: '/auth/login' -> 'auth/login'
export const removeFirstSlash = (path: string) => path.replace(/^\//, '');
