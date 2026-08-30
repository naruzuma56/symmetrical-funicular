import { useMemo } from 'react';
import { cn } from '../../lib/utils';

interface SpeedLinesProps {
  /** Number of radiating rays. */
  rays?: number;
  /** Inner radius of the star-burst (0-100 in viewBox units). */
  innerRadius?: number;
  /** Color of the rays. */
  color?: 'black' | 'white';
  className?: string;
}

/** Tapered ray polygon so lines grow wider as they leave the centre. */
function buildRay(index: number, count: number, innerRadius: number): string {
  const angle = (index / count) * Math.PI * 2;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const outerRadius = 118;
  const innerThickness = 1.1;
  const outerThickness = 5;

  const point = (radius: number, thickness: number) => {
    const px = radius * cos - (thickness / 2) * sin;
    const py = radius * sin + (thickness / 2) * cos;
    const qx = radius * cos + (thickness / 2) * sin;
    const qy = radius * sin - (thickness / 2) * cos;
    return { px, py, qx, qy };
  };

  const innerA = point(innerRadius, innerThickness);
  const outerB = point(outerRadius, outerThickness);
  return `${innerA.px},${innerA.py} ${innerA.qx},${innerA.qy} ${outerB.qx},${outerB.qy} ${outerB.px},${outerB.py}`;
}

/**
 * Manga speed-line burst rendered as an SVG overlay.
 * Stretch it over a parent with `absolute inset-0`.
 */
export function SpeedLines({ rays = 26, innerRadius = 40, color = 'black', className }: SpeedLinesProps) {
  const polygons = useMemo(
    () => Array.from({ length: rays }, (_, i) => buildRay(i, rays, innerRadius)),
    [rays, innerRadius],
  );

  return (
    <svg
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      viewBox="0 0 240 240"
      preserveAspectRatio="xMidYMid slice"
    >
      {polygons.map((points, i) => (
        <polygon key={`${i}-${points.slice(0, 8)}`} points={points} fill={color === 'white' ? '#fff' : '#000'} />
      ))}
    </svg>
  );
}