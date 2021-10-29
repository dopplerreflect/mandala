import SVGTag from '../components/SVGTag';
import useSaveSVG from '@dopplerreflect/use-save-svg';
import { PHI } from '../utils';

const CornerReflector = () => {
  const svgRef = useSaveSVG();
  const w = 1080;
  const c = 0;

  const fibPoints = [];
  for (let i = 1; i <= w; i = i * PHI) fibPoints.push(i);

  return (
    <svg
      ref={svgRef}
      id="CornerReflector"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${-w / 2} ${-w / 2} ${w} ${w}`}
    >
      {/* <rect x={-w / 2} y={-w / 2} width={w} height={w} fill="black" /> */}
      <g id="fibrays">
        {fibPoints.map((p, i) => (
          <g key={i} transform={`rotate(0, ${c}, ${c})`}>
            <path
              d={`M${-w / 2},${-w / 2}L${w / 2},${-w / 2 + p}L${-w / 2 + p},${
                w / 2
              }Z`}
              stroke={`hsl(${(360 / (w * 1.75)) * p + 240}, 100%, 50%)`}
              strokeWidth={2.5}
              strokeLinejoin="miter"
              fill={`hsl(${(360 / (w * 1.75)) * p + 240}, 100%, 50%)`}
              fillOpacity={((1 / fibPoints.length) * i) / 5}
            />
          </g>
        ))}
      </g>
    </svg>
  );
};

export { CornerReflector };
