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

export default function FiveArc() {
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
      <g id="penta" filter="url(#filter)" style={{ display: 'inline' }}>
        <path
          d={[
            `M${rps(angles[0], r)}`,
            `A${r2},${r2} 0 0 1 ${rps(angles[2], r)}`,
            `A${r2},${r2} 0 0 1 ${rps(angles[4], r)}`,
            `A${r2},${r2} 0 0 1 ${rps(angles[1], r)}`,
            `A${r2},${r2} 0 0 1 ${rps(angles[3], r)}`,
            `A${r2},${r2} 0 0 1 ${rps(angles[0], r)}`,

            `Z`,
          ].join(' ')}
          strokeWidth={cx * PHIm1 ** 8}
          stroke="hsl(45, 100%, 33%)"
          fill="hsl(240, 100%, 5%)"
          fillRule="evenodd"
          transform={`rotate(36, ${cx}, ${cy})`}
        />
        <path
          d={[
            `M${rps(angles[0], r)}`,
            `A${r2},${r2} 0 0 0 ${rps(angles[2], r)}`,
            `A${r2},${r2} 0 0 0 ${rps(angles[4], r)}`,
            `A${r2},${r2} 0 0 0 ${rps(angles[1], r)}`,
            `A${r2},${r2} 0 0 0 ${rps(angles[3], r)}`,
            `A${r2},${r2} 0 0 0 ${rps(angles[0], r)}`,

            `Z`,
          ].join(' ')}
          strokeWidth={cx * PHIm1 ** 8}
          stroke="hsl(45, 100%, 33%)"
          fill="hsl(240, 100%, 5%)"
          fillRule="evenodd"
        />
      </g>
    </SVGTag>
  );
}
