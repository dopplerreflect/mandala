import {
  Point,
  radialPoint,
  radialPointString,
} from '@dopplerreflect/drawring-utils';
import useSaveSVG from '@dopplerreflect/use-save-svg';
import { PHI, PHIm1 } from '../utils';

const PI = Math.PI;

const angles10 = [...Array(10).keys()].map(k => (PI / 5) * k - PI / 2);

const starPath = (radius: number, center?: Point): string =>
  [
    `M${radialPointString(angles10[0], radius, { center })}`,
    [...angles10.slice(1, angles10.length)]
      .map(
        (a, i) =>
          `L${radialPointString(
            a,
            i % 2 === 0 ? radius * (PHI - 1) ** 2 : radius,
            { center }
          )}`
      )
      .join(' '),
    'Z',
  ].join(' ');

export default function NestedPentagrams() {
  const svgRef = useSaveSVG();
  const width = 1080;
  const outerRadius = (width / 10) * 4.5;
  const innerRadius = outerRadius * (PHI - 1) ** 2;

  const stroke = 'black';
  const fill = 'hsl(45, 66%, 66%)';
  const fillOpacity = 0.25;

  return (
    <svg
      id="StarsStars"
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${-width / 2} ${-width / 2} ${width} ${width}`}
    >
      <path
        d={`M${-width / 2},${-width / 2}H${width}V${width}H${-width / 2}Z`}
        fill="hsl(240, 50%, 95%)"
      />
      <g id="starStar">
        {[...Array(12).keys()].map(r => (
          <g key={r} id={`ring-${r}`}>
            {/* <circle
              r={outerRadius - innerRadius * PHIm1 ** (r - 1)}
              stroke={stroke}
              fill={'none'}
              fillOpacity={fillOpacity}
            /> */}
            <path
              d={starPath(outerRadius - innerRadius * PHIm1 ** (r - 1))}
              stroke={stroke}
              fill="none"
            />
            {[...Array(5).keys()].map(k => (
              <path
                key={k}
                d={starPath(
                  innerRadius * (PHI - 1) ** (r + 1),
                  radialPoint(
                    angles10[k * 2],
                    outerRadius - innerRadius * PHIm1 ** (r - 1)
                  )
                )}
                fill={fill}
                fillOpacity={fillOpacity}
                stroke={stroke}
                transform={`rotate(36, ${
                  radialPoint(
                    angles10[k * 2],
                    outerRadius - innerRadius * PHIm1 ** (r - 1)
                  ).x
                }, ${
                  radialPoint(
                    angles10[k * 2],
                    outerRadius - innerRadius * PHIm1 ** (r - 1)
                  ).y
                })`}
              />
            ))}
          </g>
        ))}
      </g>
      <use href="#starStar" transform="rotate(36)" />
    </svg>
  );
}
