export function hasExpired(d: string, ttl: number) {
  const timestamp = new Date(d).getTime();
  const currentTimestamp = new Date().getTime();

  const diff = (currentTimestamp - timestamp) / (60 * 60 * 1000);

  return !(diff > 0 && diff < ttl);
}
