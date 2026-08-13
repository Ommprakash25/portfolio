const START = 4000;
const INTERVAL_MS = 1.5 * 60 * 60 * 1000;
const EPOCH = Date.UTC(2026, 0, 1);

function seed(n: number) {
  let x = (n + 1) * 1103515245 + 12345;
  x = (x >>> 0) % 2147483647;
  return 1 + (x % 10);
}

export function presenceCount(now = Date.now()) {
  const steps = Math.max(0, Math.floor((now - EPOCH) / INTERVAL_MS));
  let total = START;
  for (let i = 0; i < steps; i += 1) total += seed(i);
  return total;
}
