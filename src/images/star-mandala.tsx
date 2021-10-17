import Outline from '../components/filters/outline';
import Star from '../components/star';
import SVGTag from '../components/SVGTag';
import { PHIm1, radialPointString, radialPoint, Point } from '../utils';

const StarMandala = () => {
  const width = 1080;
  const c = 0;
  const or = (width / 10) * 4.5;
  const r = [...Array(8).keys()].map(k => or * PHIm1 ** k);
  const a = [...Array(60).keys()].map(k => 6 * k);

  const rp = (angle: number, radius: number): Point =>
    radialPoint(angle, radius, { x: c, y: c });

  const rps = (angle: number, radius: number): string =>
    radialPointString(angle, radius, { x: c, y: c });

  return (
    <SVGTag width={width} height={width}>
      <defs>
        <radialGradient id="radialGradient">
          <stop offset="0%" stopColor="red" />
          <stop offset="14%" stopColor="orange" />
          <stop offset="23.6%" stopColor="yellow" />
          <stop offset="38.9%" stopColor="green" />
          <stop offset="61.8%" stopColor="blue" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <Outline id="outline" color="black" radius={(or * PHIm1 ** 8) / 4} />
        <g id="5points" filter="url(#outline)">
          <path
            id="petal"
            d={[
              `M${rps(a[39], r[4])}`,
              `Q${rps(a[41], r[3])}`,
              `${rps(a[45], r[2])}`,
              `S${rps(a[47], r[1])}`,
              `${rps(a[51], r[1])}`,
              `S${rps(a[55], r[1])}`,
              `${rps(a[57], r[0])}`,
              `M${rps(a[15], r[4])}`,
              `Q${rps(a[13], r[3])}`,
              `${rps(a[9], r[2])}`,
              `S${rps(a[7], r[1])}`,
              `${rps(a[3], r[1])}`,
              `S${rps(a[59], r[1])}`,
              `${rps(a[57], r[0])}`,
            ].join(' ')}
            // stroke={`hsl(240, 100%, 66%)`}
            strokeWidth={or * PHIm1 ** 8}
            strokeLinecap="round"
            // strokeDasharray="8 21"
            fill="none"
          />
          <use xlinkHref="#petal" transform={`rotate(72, ${c}, ${c})`} />
          <use xlinkHref="#petal" transform={`rotate(144, ${c}, ${c})`} />
          <use xlinkHref="#petal" transform={`rotate(216, ${c}, ${c})`} />
          <use xlinkHref="#petal" transform={`rotate(288, ${c}, ${c})`} />
        </g>
      </defs>
      <rect
        x={-width / 2}
        y={-width / 2}
        width={width}
        height={width}
        fill="black"
      />
      <circle
        cx={c}
        cy={c}
        r={or}
        fill="url(#radialGradient)"
        fillOpacity={0.66}
      />
      {r.map((r, i) => (
        <circle
          cx={c}
          cy={c}
          r={r}
          stroke={`hsl(240, 100%, 80%)`}
          strokeWidth={or * PHIm1 ** 15}
          fill="none"
        />
      ))}
      {a.map((a, i) => (
        <g key={a}>
          <path
            d={`M${c},${c}L${rps(a, or)}`}
            stroke={`hsl(225, 100%, 85%)`}
            strokeWidth={or * PHIm1 ** 15}
            fill="none"
          />
        </g>
      ))}
      <g id="whole">
        <use
          xlinkHref="#5points"
          transform={`rotate(36, ${c}, ${c})`}
          stroke={`hsl(225, 100%, 85%)`}
        />
        <use xlinkHref="#5points" stroke={`hsl(225, 100%, 85%)`} />
      </g>
    </SVGTag>
  );
};

export { StarMandala };
