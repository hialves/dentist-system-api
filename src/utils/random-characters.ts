export function generateRandomCharacters(length = 8): string {
  return (Math.random() + 1).toString(36).slice(2, 2 + length)
}
