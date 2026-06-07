/**
 * Ensures that a value is returned as a single string.
 * Useful for handling Express req.params which can be string | string[]
 */
export const ensureString = (value: string | string[] | undefined | null): string | null => {
  if (!value) return null;
  return Array.isArray(value) ? value[0] : value;
};
