export function parseURL(url: string): string | null {
  return url?.split("=")?.[1] || null;
}
