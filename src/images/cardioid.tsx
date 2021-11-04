import { PHIm1, Point, radialPoint } from '../utils';
import useSaveSVG from '@dopplerreflect/use-save-svg';

export default () => {
  const svgRef = useSaveSVG();
  const width = 1080;
  const c = 0; // width / 2;
  const r = 432;
  const ad = 3;
  const gd = 15;
  const a = [...Array(gd).keys()].map(k => (360 / gd) * k);
  const rp = (angle: number, radius: number): Point =>
    radialPoint(angle, radius, { x: c, y: c });

  const polar = (angle: number): number => angle * (Math.PI / 180);

  const cardioid = (angle: number, radius: number): number =>
    (radius / 2) * (1 - Math.cos(polar(angle)));

  const crp = (angle: number, radius: number): Point =>
    rp(angle, cardioid(angle, radius));

  return (
    <svg
      ref={svgRef}
      id="Cardioid"
      viewBox={`${-width / 2} ${-width / 2} ${width} ${width}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <rect
        x={-width / 2}
        y={-width / 2}
        width={width}
        height={width}
        fill="hsl(270, 100%, 2%)"
      />{' '} */}
      <defs>
        <g id="cardioid" transform={`rotate(90, ${c}, ${c})`}>
          {[...Array(360 / ad).keys()].map(a => (
            <circle
              key={a}
              cx={crp(a * ad, r).x}
              cy={crp(a * ad, r).y}
              r={r * PHIm1 ** 10}
              stroke={`hsl(${a * ad - 0}, 100%, 50%)`}
              fill={`hsl(${a * ad - 0}, 100%, 50%)`}
            />
          ))}
        </g>
      </defs>
      {a.map(a => (
        <use
          key={a}
          xlinkHref="#cardioid"
          transform={`rotate(${a}, ${c}, ${c})`}
        />
      ))}
    </svg>
  );
};

// export default Cardioid;
