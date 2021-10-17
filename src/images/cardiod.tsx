import Star from '../components/star';
import SVGTag from '../components/SVGTag';
import { PHI, PHIm1, Point, radialPoint } from '../utils';
const Cardiod = () => {
  const width = 1080;
  const c = 0; // width / 2;
  const r = 432;
  const ad = 2.25;
  const gd = 5;
  const a = [...Array(gd).keys()].map(k => (360 / gd) * k);
  const rp = (angle: number, radius: number): Point =>
    radialPoint(angle, radius, { x: c, y: c });

  const polar = (angle: number): number => angle * (Math.PI / 180);

  const cardioid = (angle: number, radius: number): number =>
    (radius / 2) * (1 - Math.cos(polar(angle)));

  const crp = (angle: number, radius: number): Point =>
    rp(angle, cardioid(angle, radius));

  return (
    <SVGTag width={width} height={width}>
      <rect
        x={-width / 2}
        y={-width / 2}
        width={width}
        height={width}
        fill="black"
      />{' '}
      <defs>
        <g id="cardioid" transform={`rotate(90, ${c}, ${c})`}>
          {[...Array(360 / ad).keys()].map(a => (
            <circle
              key={a}
              cx={crp(a * ad, r).x * PHI ** (Math.PI / 10)}
              cy={crp(a * ad, r).y}
              r={r * PHIm1 ** 10}
              stroke={`hsl(${a * ad - 0}, 100%, 50%)`}
              fill="none"
            />
          ))}
        </g>
      </defs>
      {a.map(a => (
        <use xlinkHref="#cardioid" transform={`rotate(${a}, ${c}, ${c})`} />
      ))}
    </SVGTag>
  );
};

export { Cardiod };
