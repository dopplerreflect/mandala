import Star from '../components/star';
import SVGTag from '../components/SVGTag';
import { PHI, PHIm1, Point, radialPoint } from '../utils';
const Cardiod = () => {
  const width = 1080;
  const c = width / 2;
  const r = (c / 10) * 9;
  const ad = 2.25;
  const gd = 5;
  const a = [...Array(gd).keys()].map(k => (360 / gd) * k);
  const rp = (angle: number, radius: number): Point =>
    radialPoint(angle, radius, { x: c, y: c });

  const polar = (angle: number): number => angle * (Math.PI / 180);

  return (
    <SVGTag width={width} height={width}>
      <rect width={width} height={width} fill="black" />{' '}
      <defs>
        <g id="cardioid" transform={`rotate(90, ${c}, ${c})`}>
          {[...Array(360 / ad).keys()].map(a => (
            <circle
              key={a}
              cx={
                rp(a * ad, (r / 2) * (1 - Math.cos(polar(a * ad)))).x *
                PHI ** (Math.PI / 10) //PHIm1
              }
              cy={rp(a * ad, (r / 2) * (1 - Math.cos(polar(a * ad)))).y}
              r={r * PHIm1 ** 8}
              // stroke="none"
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
