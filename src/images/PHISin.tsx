import SVGTag from '../components/SVGTag';
import { PHI } from '../utils';

const PI2 = Math.PI * 2;

export default () => {
  const width = 1080;
  return (
    <SVGTag id="PHISin" width={1080}>
      <defs>
        <radialGradient id="bgGradient">
          <stop offset="0%" stopColor="hsl(240, 100%, 50%" />
          <stop offset="100%" stopColor="hsl(270, 100%, 50%" />
        </radialGradient>
      </defs>
      <path
        d={`M${-width / 2},${-width / 2}H${width / 2}V${width / 2}H${
          -width / 2
        }Z`}
        fill="url(#bgGradient)"
      />
      {[...Array(12).keys()].map(i => (
        <g key={i} stroke="white" strokeWidth="2">
          <path
            d={`M${-width / 2},${(-width / 2) * (PHI - 1) ** i}H${width / 2}`}
          />
          <path
            d={`M${-width / 2},${(width / 2) * (PHI - 1) ** i}H${width / 2}`}
          />
          <circle r={(width / 2) * (PHI - 1) ** i} fill="none" />
        </g>
      ))}
      {[...Array(10).keys()].map(i => {
        const points = [...Array(width / 15).keys()].map(k => {
          const x = -width / 2 + k * 15;
          const y = Math.sin((PI2 / width) * x) * (width / 2) * (PHI - 1) ** i;
          return { x, y };
        });
        const [first, ...rest] = points;
        const d = [
          `M${first.x},${first.y}`,
          rest.map(point => [`L${point.x},${point.y}`].join(' ')),
          `L${width / 2},0`,
          // 'Z',
        ].join(' ');
        return (
          <path
            key={i}
            d={d}
            strokeWidth={2}
            stroke={`hsl(${6 * i}, 100%, 50%)`}
            fill={`hsl(${6 * i}, 100%, 5%)`}
            fillOpacity="0.5"
          />
        );
      })}
    </SVGTag>
  );
};
