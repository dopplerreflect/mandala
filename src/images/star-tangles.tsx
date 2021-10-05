import { PHIm1, radialPoint, radialPointString, round } from '../utils';
import { SplitStar } from '.';
import SVGTag from '../components/SVGTag';
import Star from '../components/star';

const width = 1080;
const [cx, cy] = Array(2).fill(width / 2);
const r = (width / 10) * 4.5;
const r1 = round(r * PHIm1, 10e3);
const r2 = round(r * PHIm1 ** 2, 10e3);
const divisions = 5;
const a = [...Array(divisions).keys()]
  .map(k => (360 / (divisions * 4)) * k)
  .slice(1);

const rps = (angle: number, radius: number): string =>
  radialPointString(angle, radius, { x: cx, y: cx });

const rp = (angle: number, radius: number) =>
  radialPoint(angle, radius, { x: cx, y: cy });

export function StarTangles() {
  return (
    <SVGTag width={width} height={width}>
      <defs>
        <g id="circle-of-rectangles">
          {a.map((a, i) => (
            <path
              key={i}
              d={[
                `M${rp(a, r).x},${rp(a, r).y}`,
                `H${rp(180 - a, r).x}`,
                `V${rp(180 + a, r).y}`,
                `H${rp(360 - a, r).x}`,
                `Z`,
              ].join(' ')}
            />
          ))}
        </g>
        <mask id="mask">
          <rect width={width} height={width} fill="white" />
          <circle cx={cx} cy={cy} r={r2} fill="black" />
        </mask>
      </defs>
      <SplitStar />

      <use
        href="#circle-of-rectangles"
        fill={`hsl(${240} 100% 50%)`}
        fillOpacity={1 / divisions}
      />
      {[...Array(divisions).keys()].slice(0).map(k => {
        let a = (360 / divisions) * k;
        return (
          <use
            key={k}
            href="#circle-of-rectangles"
            stroke={`hsl(${200} 100% 50%)`}
            fill="none"
            fillOpacity={0}
            transform={`rotate(${a} ${cx} ${cy})`}
            mask="url(#mask)"
          />
        );
      })}
      <g id="stars">
        {[-18, 36, 72, 90].map(a => (
          <Star
            key={a}
            cx={cx}
            cy={cy}
            r={r}
            stroke={`hsl(${200} 100% 100%)`}
            fill="none"
            rotate={a}
          />
        ))}
      </g>
    </SVGTag>
  );
}
