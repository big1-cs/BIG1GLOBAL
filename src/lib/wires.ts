export type Point = { x: number; y: number };

export function elbow(a: Point, b: Point, radius = 22) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (Math.hypot(dx, dy) < 4) return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
  if (Math.abs(dx) < 2 || Math.abs(dy) < 2) {
    return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }
  const dirX = dx >= 0 ? 1 : -1;
  const dirY = dy >= 0 ? 1 : -1;
  const midY = a.y + dy / 2;
  const r = Math.min(radius, Math.abs(dx) / 2, Math.abs(dy) / 2);
  if (r < 1) {
    return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} L ${a.x.toFixed(1)} ${midY.toFixed(1)} L ${b.x.toFixed(1)} ${midY.toFixed(1)} L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }
  const y1 = midY - dirY * r;
  const x1 = a.x + dirX * r;
  const x2 = b.x - dirX * r;
  const y2 = midY + dirY * r;
  return [
    `M ${a.x.toFixed(1)} ${a.y.toFixed(1)}`,
    `L ${a.x.toFixed(1)} ${y1.toFixed(1)}`,
    `Q ${a.x.toFixed(1)} ${midY.toFixed(1)} ${x1.toFixed(1)} ${midY.toFixed(1)}`,
    `L ${x2.toFixed(1)} ${midY.toFixed(1)}`,
    `Q ${b.x.toFixed(1)} ${midY.toFixed(1)} ${b.x.toFixed(1)} ${y2.toFixed(1)}`,
    `L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`,
  ].join(" ");
}
