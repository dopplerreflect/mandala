import {
  radialPointString,
  radialPoint,
  lerp,
  Point,
  PHIm1,
  round,
  PHI,
} from '../utils';

import useSaveSVG from '@dopplerreflect/use-save-svg';

const rp = (angle: number, radius: number): Point =>
  radialPoint(angle, radius, { x: c, y: c });

const rps = (angle: number, radius: number): string =>
  radialPointString(angle, radius, { x: c, y: c });

const width = 4320;
const c = 0;
const r = (width / 2 / 10) * 9;
// const fy = c - r * PHIm1;
const fy = c - r + r / 25;
const d = 120;
const a = 5;
const ellipseAngles = [...Array(d).keys()].map(k => (360 / d) * k);

export default () => {
  const svgRef = useSaveSVG();
  return (
    <svg
      id="Elliptical"
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${-width / 2} ${-width / 2} ${width} ${width}`}
    >
      <defs>
        <mask id="mask">
          <rect
            x={-width / 2}
            y={-width / 2}
            width={width}
            height={width}
            fill="black"
          />
          <circle cx={c} cy={c} r={r} fill="white" />
          {/* <circle cx={c} cy={c} r={r * PHIm1 ** 3.4} fill="black" /> */}
        </mask>
        <g id="raything">
          {ellipseAngles.map(a => (
            <path key={a} d={`M${c},${fy}L${rps(a, r)}`} />
          ))}
        </g>
        <g id="ellipsething">
          {ellipseAngles.map(a => (
            <path
              key={a}
              d={`M${c},${fy}L${rps(a, r)}`}
              transform={`rotate(90, ${round(
                lerp(c, rp(a, r).x, 0.5),
                10e2
              )}, ${round(lerp(fy, rp(a, r).y, 0.5), 10e2)} )`}
            />
          ))}
        </g>
      </defs>
      {/* <rect
        x={-width / 2}
        y={-width / 2}
        width={width}
        height={width}
        fill={`hsl(216, 100%, 0%)`}
      /> */}
      {[...Array(a).keys()].map(k => (
        <use
          key={k}
          xlinkHref="#raything"
          stroke={`hsl(270, 100%, 50%)`}
          strokeWidth={width / 1080}
          transform={`rotate(${(360 / a) * k}, ${c}, ${c})`}
          mask="url(#mask)"
        />
      ))}

      {[...Array(a).keys()].map(k => (
        <use
          key={k}
          xlinkHref="#ellipsething"
          stroke={`hsl(90, 100%, 50%)`}
          strokeWidth={width / 1080}
          transform={`rotate(${(360 / a) * k}, ${c}, ${c})`}
          mask="url(#mask)"
        />
      ))}
    </svg>
  );
};
