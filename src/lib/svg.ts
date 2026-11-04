/**
 * Petits utilitaires SVG utilisés pour générer les graphiques décoratifs
 * (hero et études de cas) au moment du build — aucun JavaScript côté client.
 */

export type Point = [number, number];

/** Courbe lissée (Catmull-Rom → Bézier) passant par tous les points. */
export function smoothPath(points: Point[], tension = 0.18): string {
  if (points.length === 0) return '';
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) * tension;
    const c1y = p1[1] + (p2[1] - p0[1]) * tension;
    const c2x = p2[0] - (p3[0] - p1[0]) * tension;
    const c2y = p2[1] - (p3[1] - p1[1]) * tension;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0]},${p2[1]}`;
  }
  return d;
}

/** Aire sous la courbe, fermée sur la ligne de base `baseY`. */
export function areaPath(points: Point[], baseY: number, tension?: number): string {
  const first = points[0];
  const last = points[points.length - 1];
  return `${smoothPath(points, tension)} L${last[0]},${baseY} L${first[0]},${baseY} Z`;
}

/** Barre verticale aux angles supérieurs arrondis, carrée sur la ligne de base. */
export function columnPath(x: number, y: number, width: number, height: number, radius = 4): string {
  const r = Math.min(radius, width / 2, height);
  return [
    `M${x},${y + r}`,
    `a${r},${r} 0 0 1 ${r},-${r}`,
    `h${width - 2 * r}`,
    `a${r},${r} 0 0 1 ${r},${r}`,
    `v${height - r}`,
    `h-${width}`,
    'z',
  ].join(' ');
}
