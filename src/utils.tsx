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
  // matches.forEach(match => (input = input.replace(match, ' />')));
  for (const match of matches) {
    input = input.replace(match, ' />');
  }
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
import { useEffect, useRef } from 'react';

/**
 * @description Adds a KeyPress event listener, and on ctrl + shift + s opens a Save dialog and saves the SVG image as a PNG file.
 */
export const useSaveSVG = () => {
  const ref = useRef<SVGSVGElement>(null);

  const saveSvg = async () => {
    if (ref.current) {
      const svgText = new XMLSerializer().serializeToString(ref.current);
      const svg = new Blob([svgText], { type: 'image/svg+xml;charset=ut6-8' });
      const url = window.URL.createObjectURL(svg);
      const canvas = document.createElement('canvas');
      canvas.width = ref.current.viewBox.baseVal.width;
      canvas.height = ref.current.viewBox.baseVal.height;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = async function () {
        ctx?.drawImage(img, 0, 0);
        window.URL.revokeObjectURL(url);
        const image: Blob = await new Promise((resolve, reject) => {
          canvas.toBlob(blob => {
            if (blob) {
              resolve(blob);
            } else {
              reject('failed to turn canvas to blob');
            }
          });
        });

        const fileHandle = await window.showSaveFilePicker({
          suggestedName: 'Untitled.png',
          types: [
            { description: 'PNG file', accept: { 'image/png': ['.png'] } },
          ],
        });
        const writeable = await fileHandle.createWritable();
        await writeable.write(image);
        await writeable.close();
      };
      img.src = url;
    }
  };

  const handleKeyPressEvent = (event: KeyboardEvent): void => {
    const { ctrlKey, shiftKey, key } = event;
    if (ctrlKey && shiftKey && key === 'S') {
      console.log('save');
      saveSvg();
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPressEvent);
    return () => document.removeEventListener('keypress', handleKeyPressEvent);
  }, []);

  return ref;
};
