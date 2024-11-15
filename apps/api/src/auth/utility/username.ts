export function extractUsername(email: string): string | null {
  const regex = /^(.*?)@/; // Regex to capture everything before the '@' symbol
  const match = email.match(regex);
  return match ? match[1] : null;
}

export function generateUsername(baseUsername: string): string {
  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let username = '';

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    username += charset[randomIndex];
  }

  return baseUsername + username;
}
