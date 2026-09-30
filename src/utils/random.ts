/**
 * Bounded randomness helpers for consistent, debuggable behavior
 */

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function chance(probability: number): boolean {
  return Math.random() < probability;
}

export function scrambleString(str: string): string {
  if (str.length <= 2) return str;
  const chars = str.split('');
  const i = Math.floor(Math.random() * (chars.length - 1));
  const temp = chars[i];
  chars[i] = chars[i + 1];
  chars[i + 1] = temp;
  return chars.join('');
}
