import SVGTag from '../components/SVGTag';
import {
  radialPointString,
  radialPoint,
  lerp,
  Point,
  PHIm1,
  round,
} from '../utils';

const rp = (angle: number, radius: number): Point =>
  radialPoint(angle, radius, { x: c, y: c });

const rps = (angle: number, radius: number): string =>
  radialPointString(angle, radius, { x: c, y: c });

const width = 1080;
const c = width / 2;
const r = (c / 10) * 9;
const fy = c - r * PHIm1;
const d = 72;
const a = 15;
const ellipseAngles = [...Array(d).keys()].map(k => (360 / d) * k);
const Elliptical = () => (
  <SVGTag width={width} height={width}>
    <defs>
      <mask id="mask">
        <rect width={width} height={width} fill="black" />
        <circle cx={c} cy={c} r={r} fill="white" />
        {/* <circle cx={c} cy={c} r={r * PHIm1 ** 3.4} fill="black" /> */}
      </mask>
      <g id="raything">
        {ellipseAngles.map(
          (a, i) =>
            i % 1 === 0 && <path key={a} d={`M${c},${fy}L${rps(a, r)}`} />
        )}
      </g>
      <g id="ellipsething">
        {ellipseAngles.map(a => (
          <path
            d={`M${c},${fy}L${rps(a, r)}`}
            transform={`rotate(90, ${round(
              lerp(c, rp(a, r).x, 0.5),
              10e2
            )}, ${round(lerp(fy, rp(a, r).y, 0.5), 10e2)} )`}
          />
        ))}
      </g>
    </defs>
    <rect width={width} height={width} fill={`hsl(270, 100%, 5%)`} />
    <circle cx={c} cy={c} r={r} stroke="hsl(270, 100%, 50%)" fill="none" />
    {[...Array(a).keys()].map(k => (
      <use
        xlinkHref="#raything"
        stroke={`hsl(210, 100%, 50%)`}
        strokeWidth={1}
        transform={`rotate(${(360 / a) * k}, ${c}, ${c})`}
        mask="url(#mask)"
      />
    ))}

    {[...Array(a).keys()].map(k => (
      <use
        xlinkHref="#ellipsething"
        stroke={`hsl(240, 100%, 100%)`}
        transform={`rotate(${(360 / a) * k}, ${c}, ${c})`}
        mask="url(#mask)"
      />
    ))}
  </SVGTag>
);

export { Elliptical };
