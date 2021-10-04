import { PHIm1, radialPointString } from '../utils';

import SVGTag from '../components/SVGTag';
import Outline from '../components/filters/outline';

const width = 1080;
const [cx, cy] = Array(2).fill(width / 2);
const r = cx * PHIm1;
const r2 = r * PHIm1;

const angles = [...Array(5).keys()].map(k => (360 / 5) * k - 90);

const rps = (angle: number, radius: number): string =>
  radialPointString(angle, radius, { x: cx, y: cx });

export default function SixArc() {
  return (
    <SVGTag width={width} height={width}>
      <defs>
        <Outline
          id="filter"
          radius={cx * PHIm1 ** 13}
          color="hsl(240, 100%, 75%)"
        />
      </defs>
      <rect width={width} height={width} fill="hsl(225, 50%, 5%)" />
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
          strokeWidth={cx * PHIm1 ** 8}
          stroke="hsl(45, 100%, 33%)"
          fill="none"
        />
        <use href="#tri" transform={`rotate(60, ${cx}, ${cy})`} />
      </g>
    </SVGTag>
  );
}
