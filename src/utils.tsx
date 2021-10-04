export const PHI = (Math.sqrt(5) + 1) / 2;
export const PHIm1 = PHI - 1;

type Point = {
  x: number;
  y: number;
};

export function radialPoint(
  angle: number,
  radius: number,
  center: Point
): Point {
  return {
    x: center.x + radius * Math.cos(angle * (Math.PI / 180)),
    y: center.y + radius * Math.sin(angle * (Math.PI / 180)),
  };
}

export function pointString(point: Point): string {
  return `${point.x},${point.y}`;
}

export function radialPointString(
  angle: number,
  radius: number,
  point: Point
): string {
  return pointString(radialPoint(angle, radius, point));
}
