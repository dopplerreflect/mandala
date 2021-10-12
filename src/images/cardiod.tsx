import Star from '../components/star';
import SVGTag from '../components/SVGTag';
import { PHI, PHIm1, Point, radialPoint } from '../utils';
const Cardiod = () => {
  const width = 1080;
  const c = width / 2;
  const r = (c / 10) * 9;
  const d = 2.25;
  const rp = (angle: number, radius: number): Point =>
    radialPoint(angle, radius, { x: c, y: c });

  const polar = (angle: number): number => angle * (Math.PI / 180);

  return (
    <SVGTag width={width} height={width}>
      <rect width={width} height={width} fill="black" />{' '}
      <g id="cardioid" transform={`rotate(90, ${c}, ${c})`}>
        {[...Array(360 / d).keys()].map(a => (
          <circle
            key={a}
            cx={
              rp(a * d, (r / 2) * (1 - Math.cos(polar(a * d)))).x * PHI ** 0.5
            }
            cy={rp(a * d, (r / 2) * (1 - Math.cos(polar(a * d)))).y}
            r={r * PHIm1 ** 10}
            // stroke="white"
            fill={`hsl(${a * d - 30}, 100%, 50%)`}
          />
        ))}
      </g>
      <use xlinkHref="#cardioid" transform={`rotate(72, ${c}, ${c})`} />
      <use xlinkHref="#cardioid" transform={`rotate(144, ${c}, ${c})`} />
      <use xlinkHref="#cardioid" transform={`rotate(216, ${c}, ${c})`} />
      <use xlinkHref="#cardioid" transform={`rotate(288, ${c}, ${c})`} />
    </SVGTag>
  );
};

export { Cardiod };
