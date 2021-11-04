import { PHIm1, radialPointString, round } from '../utils';

import Outline from '../components/filters/outline';

const width = 1080;
const [cx, cy] = [0, 0];
const r = round((width / 2) * PHIm1, 10e3);
const r2 = round((width / 2) * PHIm1, 10e3);

const angles = [...Array(4).keys()].map(k => (360 / 4) * k - 90);

const rps = (angle: number, radius: number): string =>
  radialPointString(angle, radius, { x: cx, y: cx });

export default function FourArc() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${-width / 2} ${-width / 2} ${width} ${width}`}
    >
      <defs>
        <Outline
          id="filter"
          radius={round((width / 2) * PHIm1 ** 13, 10e3)}
          color="hsl(240, 100%, 75%)"
        />
      </defs>
      <rect
        x={-width / 2}
        y={-width / 2}
        width={width}
        height={width}
        fill="hsl(225, 50%, 5%)"
      />
      <g id="four-arc" filter="url(#filter)" style={{ display: 'inline' }}>
        <path
          d={[
            `M${rps(angles[0], r)}`,
            `A${r2},${r2} 0 0 0 ${rps(angles[1], r)}`,
            `A${r2},${r2} 0 0 0 ${rps(angles[2], r)}`,
            `A${r2},${r2} 0 0 0 ${rps(angles[3], r)}`,
            `A${r2},${r2} 0 0 0 ${rps(angles[0], r)}`,
            `Z`,
          ].join(' ')}
          strokeWidth={(width / 2) * PHIm1 ** 8}
          stroke="hsl(45, 100%, 33%)"
          fill="none"
        />
      </g>
    </svg>
  );
}
