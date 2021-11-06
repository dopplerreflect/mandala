import useSaveSVG from '@dopplerreflect/use-save-svg';
import Screenshot from './fol-bg.png';

type Point = {
  x: number;
  y: number;
};

const pc = (angle: number, radius: number): Point => ({
  x: radius * Math.cos(angle),
  y: radius * Math.sin(angle),
});

const angles = [...Array(6).keys()].map(k => ((Math.PI * 2) / 6) * k);
const angles24 = [...Array(24).keys()].map(k => ((Math.PI * 2) / 24) * k);
const angles12 = [...Array(12).keys()].map(k => (360 / 12) * k);

export default () => {
  const svgRef = useSaveSVG();
  const w = 1080;
  const r = w / 9;
  const stroke = 'hsl(45, 100%, 100%)';
  const strokeWidth = 5;
  return (
    <svg
      id="FlowerOfLife2"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      viewBox={`${-w / 2} ${-w / 2} ${w} ${w}`}
    >
      <defs>
        <g id="flower-of-life">
          <circle r={r} />
          {angles.map(a => (
            <circle key={a} cx={pc(a, r).x} cy={pc(a, r).y} r={r} />
          ))}
          {angles.map(a => (
            <circle key={a} cx={pc(a, r * 2).x} cy={pc(a, r * 2).y} r={r} />
          ))}
          {angles.map(a => (
            <circle
              key={a}
              cx={pc(a - Math.PI / 2, r * 1.732).x}
              cy={pc(a - Math.PI / 2, r * 1.732).y}
              r={r}
            />
          ))}
        </g>
        <path
          id="white-square"
          d={`M${-w / 2},${-w / 2}H${w}V${w}H${-w / 2}Z`}
          fill="white"
        />
        <mask id="fol-mask">
          <use href="#white-square" />
          <use href="#flower-of-life" />
        </mask>
        <path
          id="petal"
          d={`M${pc(angles24[1], r * 2.5).x},
          ${pc(angles24[1], r * 2.5).y}
          C${pc(angles24[1], r * 4).x},
          ${pc(angles24[1], r * 4).y}
          ${pc(angles24[0], r * 3.14).x},
          ${pc(angles24[0], r * 3.14).y}
          ${r * 4},${0}
          C${pc(angles24[0], r * 3.14).x},
          ${pc(angles24[0], r * 3.14).y}
          ${pc(angles24[23], r * 4).x},
          ${pc(angles24[23], r * 4).y}
          ${pc(angles24[23], r * 2.5).x},
          ${pc(angles24[23], r * 2.5).y}
          `}
        />
        <g id="petals">
          {angles12.map(a => (
            <use key={a} href="#petal" transform={`rotate(${a})`} />
          ))}
        </g>
        <mask id="petal-mask">
          <use href="#white-square" />
          <use
            href="#petals"
            stroke="black"
            fill="black"
            strokeWidth={5}
            transform="rotate(15)"
          />
        </mask>
        <linearGradient id="rearPetalGradient">
          <stop offset="25%" stopColor="hsl(15, 100%, 50%)" />
          <stop offset="100%" stopColor="hsl(60, 100%, 50%)" />
        </linearGradient>
        <linearGradient id="frontPetalGradient">
          <stop offset="25%" stopColor="hsl(45, 100%, 50%)" />
          <stop offset="100%" stopColor="hsl(0, 100%, 50%)" />
        </linearGradient>
        <filter id="stroke">
          <feFlood floodColor="hsl(240, 100%, 50%)" result="color" />
          <feComposite
            in="color"
            in2="SourceGraphic"
            operator="in"
            result="composite"
          />
          <feMorphology
            in="composite"
            operator="dilate"
            radius={strokeWidth * ((Math.cos(5) + 1) / 2)}
            result="dilate"
          />
          <feMerge>
            <feMergeNode in="dilate" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* <use href="#white-square" /> */}
      <image x={-w / 2} y={-w / 2} width={w} height={w} href={Screenshot} />
      <g mask="url(#fol-mask)" filter="url(#stroke)" opacity={0.75}>
        <use
          href="#petals"
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill="url(#rearPetalGradient)"
        />
        <use
          mask="url(#petal-mask)"
          href="#petals"
          stroke={stroke}
          strokeWidth={strokeWidth}
          transform="rotate(15)"
          fill="url(#frontPetalGradient)"
        />
      </g>
      <use
        filter="url(#stroke)"
        href="#flower-of-life"
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
        opacity={0.75}
      />
    </svg>
  );
};
