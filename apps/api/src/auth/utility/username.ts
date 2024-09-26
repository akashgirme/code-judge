export function extractUsername(email: string): string {
  const regex = /^(.*?)@/; // Regex to capture everything before the '@' symbol
  const match = email.match(regex);
  return match[1];
}
