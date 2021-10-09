import SVGTag from '../components/SVGTag';
import { PHI } from '../utils';

const CornerReflector = () => {
  const w = 1080;
  const c = w / 2;
  const or = (w / 10) * 4.5;

  const fibPoints = [];
  for (let i = 1; i <= w; i = i * PHI) fibPoints.push(i);

  return (
    <SVGTag width={w} height={w}>
      <rect width={w} height={w} fill="black" />
      <g id="fibrays">
        {fibPoints.map((p, i) => (
          <g key={i} transform={`rotate(0, ${c}, ${c})`}>
            <path
              d={`M0,0L${w},${p}L${p},${w}Z`}
              stroke={`hsl(${(360 / (w * 1.75)) * p + 240}, 100%, 50%)`}
              strokeWidth={2.5}
              strokeLinejoin="miter"
              fill={`hsl(${(360 / (w * 1.75)) * p + 240}, 100%, 50%)`}
              fillOpacity={((1 / fibPoints.length) * i) / 5}
            />
          </g>
        ))}
      </g>
    </SVGTag>
  );
};

export { CornerReflector };
