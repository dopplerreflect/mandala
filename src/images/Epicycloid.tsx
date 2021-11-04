import useSaveSVG from '@dopplerreflect/use-save-svg';
import Star from '../components/star';

export default () => {
  const svgRef = useSaveSVG();
  const width = 1080;
  const R = width / 6;
  const k = 15 / 16;

  const angles: number[] = [];
  for (let x = 0; x <= Math.PI * 32; x += 0.1) {
    angles.push(x);
  }
  const epicycloid = (angle: number): { x: number; y: number } => ({
    x: R * (k + 1) * Math.cos(angle) - R * Math.cos((k + 1) * angle),
    y: R * (k + 1) * Math.sin(angle) - R * Math.sin((k + 1) * angle),
  });
  const epicycloidPath = () => {
    const [o, ...rest] = angles;
    return `M${epicycloid(o).x},${epicycloid(o).y} ${rest
      .map(r => `L${epicycloid(r).x},${epicycloid(r).y}`)
      .join(' ')}Z`;
  };
  return (
    <svg
      id="Epicycloid"
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${-width / 2} ${-width / 2} ${width} ${width}`}
    >
      <defs>
        <radialGradient id="radialGradient">
          <stop offset="0%" stopColor="hsl(45, 100%, 50%" />
          <stop offset="50%" stopColor="hsl(30, 100%, 50%" />
          <stop offset="75%" stopColor="hsl(15, 100%, 50%" />

          <stop offset="100%" stopColor="hsla(0, 100%, 50%, 0)" />
        </radialGradient>
      </defs>
      <path
        d={`M${-width / 2},${-width / 2}H${width / 2}V${width / 2}H${
          -width / 2
        }Z`}
        fill="url(#radialGradient)"
      />
      <g transform="rotate(-90, 0, 0)">
        <path
          d={epicycloidPath()}
          stroke={`hsl(45, 100%, 50%)`}
          strokeWidth={4}
          fill={`hsl(0, 100%, 10%)`}
          fillRule="evenodd"
        />
        <Star
          cx={0}
          cy={0}
          r={R * k}
          strokeWidth={4}
          stroke={`hsl(45, 100%, 50%)`}
          rotate={0}
          fill="url(#radialGradient)"
          fillOpacity={0.25}
        />
      </g>
    </svg>
  );
};
