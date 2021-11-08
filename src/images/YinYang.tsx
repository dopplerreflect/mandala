import { radialPointString } from '@dopplerreflect/drawring-utils';
import useSaveSVG from '@dopplerreflect/use-save-svg';
const PI = Math.PI;
const width = 1080;
const radius = width / 8;

export default () => {
  const svgRef = useSaveSVG();
  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${-width / 2} ${-width / 2} ${width} ${width}`}
    >
      <defs>
        <filter id="yinyangglow">
          <feFlood floodColor="hsl(240, 100%, 85%)" result="flood" />
          <feComposite
            in="flood"
            in2="SourceAlpha"
            operator="in"
            result="mask"
          />
          <feGaussianBlur in="mask" stdDeviation="75" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <g id="yin" transform={`translate(0,${-(radius * 2)}) rotate(-60)`}>
          <path
            d={[
              `M0,0`,
              `A${radius / 2},${radius / 2} 0 0 0 ${radialPointString(
                PI * 1.5,
                radius
              )}`,
              `A${radius},${radius} 0 0 0 ${radialPointString(PI / 2, radius)}`,
              `A${radius / 2},${radius / 2} 0 0 1 0,0`,
            ].join(' ')}
            stroke="black"
            fill="black"
          />
          <circle cx={0} cy={-(radius / 2)} r={radius / 6} fill="white" />
          <path
            d={[
              `M0,${-radius}`,
              `A${radius / 2},${radius / 2} 0 0 1 0,${-(radius * 2)}`,
              `A${radius},${radius} 0 0 1 0,0`,
              `A${radius / 2},${radius / 2} 0 0 0 0,${-radius}`,
            ].join(' ')}
            stroke="black"
            fill="white"
          />
          <circle cx={0} cy={-radius * 1.5} r={radius / 6} fill="black" />
        </g>
      </defs>
      <path
        d={`M${-width / 2},${-width / 2}H${width}V${width}H${-width / 2}Z`}
        fill="hsl(270,50%,0%)"
      />
      <g filter="url(#yinyangglow">
        {[...Array(6).keys()].map(k => (
          <use href="#yin" transform={`rotate(${60 * k}, 0, 0)`} />
        ))}
        <g transform="rotate(-60)">
          <circle r={radius} />
          <path
            d={[
              `M0,0`,
              `A${radius / 2},${radius / 2} 0 0 0 ${radialPointString(
                PI * 1.5,
                radius
              )}`,
              `A${radius},${radius} 0 0 0 ${radialPointString(PI / 2, radius)}`,
              `A${radius / 2},${radius / 2} 0 0 1 0,0`,
            ].join(' ')}
            stroke="black"
            fill="white"
          />
          <circle cx={0} cy={-(radius / 2)} r={radius / 6} fill="black" />
          <circle cx={0} cy={radius * 0.5} r={radius / 6} fill="white" />
        </g>
      </g>
    </svg>
  );
};
