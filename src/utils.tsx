export const PHI = (Math.sqrt(5) + 1) / 2;
export const PHIm1 = PHI - 1;

export type Point = {
  x: number;
  y: number;
};

export function radialPoint(
  angle: number,
  radius: number,
  center: Point
): Point {
  return {
    x:
      Math.round(
        (center.x +
          radius * Math.cos(angle * (Math.PI / 180)) +
          Number.EPSILON) *
          10000
      ) / 10000,
    y:
      Math.round(
        (center.y +
          radius * Math.sin(angle * (Math.PI / 180)) +
          Number.EPSILON) *
          10000
      ) / 10000,
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

export const replaceSelfClosingTags = (input: string): string => {
  const matches = [
    /><\/use>/g,
    /><\/path>/g,
    /><\/circle>/g,
    /><\/rect>/g,
    /><\/line>/g,
    /><\/feFlood>/g,
    /><\/feMorphology>/g,
    /><\/feComposite>/g,
    /><\/feMergeNode>/g,
  ];
  matches.forEach(match => (input = input.replace(match, ' />')));
  return input;
};

export const round = (input: number, places: number): number =>
  Math.round((input + Number.EPSILON) * places) / places;

/**
 * Linear Interpolation
 * @param start starting point
 * @param end ending point
 * @param t time
 * @returns interpolated point
 */
export const lerp = (start: number, end: number, t: number) =>
  start + (end - start) * t;
