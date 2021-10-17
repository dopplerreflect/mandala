import { PHIm1, radialPointString, round } from '../utils';

import SVGTag from '../components/SVGTag';
import Outline from '../components/filters/outline';

const width = 1080;
const [cx, cy] = Array(2).fill(0);
const r = round((width / 2) * PHIm1, 10e3);
const r2 = round(r * PHIm1, 10e3);

const rps = (angle: number, radius: number): string =>
  radialPointString(angle, radius, { x: cx, y: cx });

export function SixArc() {
  return (
    <SVGTag width={width} height={width}>
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
      <g id="flower" filter="url(#filter)" style={{ display: 'inline' }}>
        <path
          id="tri"
          d={[
            `M${rps(0, r)}`,
            `A${r2},${r2} 0 0 0 ${rps(120, r)}`,
            `A${r2},${r2} 0 0 0 ${rps(240, r)}`,
            `A${r2},${r2} 0 0 0 ${rps(0, r)}`,
            `Z`,
          ].join(' ')}
          strokeWidth={(width / 2) * PHIm1 ** 8}
          stroke="hsl(45, 100%, 33%)"
          fill="none"
        />
        <use href="#tri" transform={`rotate(60, ${cx}, ${cy})`} />
      </g>
    </SVGTag>
  );
}
