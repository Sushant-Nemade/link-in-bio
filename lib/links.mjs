export function moveLink(links, index, direction) {
  const next = [...links]; const target = index + direction;
  if (target < 0 || target >= next.length) return next;
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}
export function safeUrl(input) {
  try { const url = new URL(String(input)); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch { return null; }
}
