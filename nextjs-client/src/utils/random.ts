export function getRandomWidth(min: number = 200, max: number = 400): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
