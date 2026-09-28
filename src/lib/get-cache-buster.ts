export function getCacheBuster(): number | undefined {
  if (process.env.NODE_ENV !== "production") {
    return Date.now();
  }
  return undefined;
}