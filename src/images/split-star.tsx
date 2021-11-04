import SVGTag from '../components/SVGTag';
import { PHIm1, radialPointString } from '../utils';

const width = 1080;
const cx = width / 2;
const cy = width / 2;
const r = (width / 10) * 4.5;

const a = [...Array(10).keys()].map(k => 36 * k);
const r2 = r * PHIm1 ** 2;

const rps = (angle: number, radius: number): string =>
  radialPointString(angle, radius, { x: cx, y: cy });

export default function SplitStar() {
  return (
    <SVGTag id="SplitStar" width={width} height={width}>
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="black" />
          <stop offset="100%" stopColor="white" />
        </linearGradient>
        <linearGradient id="gradient2" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </linearGradient>
        <g id="ray">
          <path
            id="rayRightHalf"
            d={[
              `M${rps(a[0], r)}`,
              `L${rps(a[1], r2)}`,
              `L${cx},${cy}`,
              `Z`,
            ].join(' ')}
            fill="url(#gradient2)"
          />
          <path
            id="rayLeftHalf"
            d={[
              `M${rps(a[0], r)}`,
              `L${rps(a[9], r2)}`,
              `L${cx},${cy}`,
              `Z`,
            ].join(' ')}
            fill="url(#gradient)"
          />
        </g>
      </defs>
      <g transform={`rotate(-18 ${cx} ${cy})`}>
        {a.map(
          (a, i) =>
            i % 2 === 0 && (
              <use key={i} href="#ray" transform={`rotate(${a} ${cx} ${cy})`} />
            )
        )}
      </g>
    </SVGTag>
  );
}
