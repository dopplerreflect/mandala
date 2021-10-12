import SVGTag from '../components/SVGTag';
import { radialPointString, radialPoint, lerp, Point, PHIm1 } from '../utils';

const rp = (angle: number, radius: number): Point =>
  radialPoint(angle, radius, { x: c, y: c });

const rps = (angle: number, radius: number): string =>
  radialPointString(angle, radius, { x: c, y: c });

const width = 1080;
const c = width / 2;
const r = (c / 10) * 9;
const fy = c - r * PHIm1;
const d = 72;
const ellipseAngles = [...Array(d).keys()].map(k => (360 / d) * k);
const Elliptical = () => (
  <SVGTag width={width} height={width}>
    <defs>
      <mask id="mask">
        <rect width={width} height={width} fill="black" />
        <circle cx={c} cy={c} r={r} fill="white" />
      </mask>
      <g id="ellipsething">
        {ellipseAngles.map(a => (
          <g key={a}>
            <path d={`M${c},${fy}L${rps(a, r)}`} stroke="white" />
            <path
              d={`M${c},${fy}L${rps(a, r)}`}
              stroke="white"
              transform={`rotate(90, ${lerp(c, rp(a, r).x, 0.5)}, ${lerp(
                fy,
                rp(a, r).y,
                0.5
              )} )`}
            />
          </g>
        ))}
      </g>
    </defs>
    <rect width={width} height={width} fill={`hsl(240, 100%, 0%)`} />
    <circle cx={c} cy={c} r={r} stroke="white" fill="none" />
    {[...Array(5).keys()].map(k => (
      <use
        xlinkHref="#ellipsething"
        transform={`rotate(${72 * k}, ${c}, ${c})`}
        mask="url(#mask)"
      />
    ))}
  </SVGTag>
);

export { Elliptical };
