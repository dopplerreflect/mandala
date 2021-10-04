import { PHIm1, radialPointString, round } from '../utils';

import SVGTag from '../components/SVGTag';
import Outline from '../components/filters/outline';

const width = 1080;
const [cx, cy] = Array(2).fill(width / 2);
const r = round(cx * PHIm1, 10e3);
const r2 = round(r * PHIm1, 10e3);

const angles = [...Array(4).keys()].map(k => (360 / 4) * k - 90);

const rps = (angle: number, radius: number): string =>
  radialPointString(angle, radius, { x: cx, y: cx });

export default function FourArc() {
  return (
    <SVGTag width={width} height={width}>
      <defs>
        <Outline
          id="filter"
          radius={round(cx * PHIm1 ** 13, 10e3)}
          color="hsl(240, 100%, 75%)"
        />
      </defs>
      <rect width={width} height={width} fill="hsl(225, 50%, 5%)" />
      <g id="four-arc" filter="url(#filter)" style={{ display: 'inline' }}>
        <path
          id="tri"
          d={[
            `M${rps(angles[0], r)}`,
            `A${r2},${r2} 0 0 0 ${rps(angles[1], r)}`,
            `A${r2},${r2} 0 0 0 ${rps(angles[2], r)}`,
            `A${r2},${r2} 0 0 0 ${rps(angles[3], r)}`,
            `A${r2},${r2} 0 0 0 ${rps(angles[0], r)}`,
            `Z`,
          ].join(' ')}
          strokeWidth={cx * PHIm1 ** 8}
          stroke="hsl(45, 100%, 33%)"
          fill="none"
        />
        {/* <use href="#tri" transform={`rotate(60, ${cx}, ${cy})`} /> */}
      </g>
    </SVGTag>
  );
}
