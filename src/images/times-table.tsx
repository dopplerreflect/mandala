import {
  useRef,
  useState,
  useLayoutEffect,
  ChangeEvent,
  useEffect,
} from 'react';
import SVGTag from '../components/SVGTag';
import { Point, radialPoint, radialPointString, round } from '../utils';

const width = 1080;
const cx = width / 2;
const r = (width / 10) * 4.5;
const divisions = 360;

const angles = [...Array(divisions).keys()].map(k => (360 / divisions) * k);

const rps = (angle: number, radius: number): string =>
  radialPointString(angle, radius, { x: cx, y: cx });

export const TimesTable = (): JSX.Element => {
  const [factor, setFactor] = useState(66);
  const [colorLevel, setColorLevel] = useState(100);
  // const [divisions, setDivisions] = useState(360);

  // const svgElement = useRef<SVGRectElement>(null);

  // const handleMouseMove = (event: MouseEvent) => {
  //   // setFactor(Math.round(event.clientX / (window.innerWidth / divisions)));
  //   setColorLevel(50 + Math.round(event.clientY / (window.innerHeight / 50)));
  //   // setDivisions(Math.round(event.clientY / (window.innerHeight / 360)));
  // };

  // useLayoutEffect(() => {
  //   document.addEventListener('mousemove', handleMouseMove);
  //   return () => document.removeEventListener('mousemove', handleMouseMove);
  // }, []);

  // const handleRangeChange = (event: ChangeEvent) =>
  //   //@ts-ignore
  //   setFactor(event.target.value);
  // setFactor(factor => round(event.target.value, 10e2));

  // const requestRef = useRef();
  // const animate = () => {
  //   setFactor(factor => round(factor + 0.001, 10e3));
  //   //@ts-ignore
  //   requestRef.current = requestAnimationFrame(animate);
  // };
  // useEffect(() => {
  //   //@ts-ignore
  //   requestRef.current = requestAnimationFrame(animate);
  //   //@ts-ignore
  //   return () => cancelAnimationFrame(requestRef.current);
  // }, []);

  return (
    <div>
      {/* <input
        type="range"
        min={0}
        max={360}
        step={1}
        value={factor}
        onChange={handleRangeChange}
      /> */}
      <SVGTag width={width} height={width}>
        <path d={`M0 0H${width}V${width}H0Z`} />
        <g transform={`rotate(90 ${cx} ${cx})`}>
          {angles.map((a, i) => (
            <path
              key={i}
              // d={`M${rps(a, r)}L${rps(angles[(i * factor) % divisions], r)}`}
              d={`M${rps(a, r)}L${rps((360 / divisions) * i * factor, r)}`}
              stroke={`hsl(${Math.round(a)} 100% ${colorLevel}%`}
            />
          ))}
        </g>
        {/* <text fontFamily="monospace" fontSize={24} x={0} y={24} fill="white">
          factor: {factor}
        </text> */}
      </SVGTag>
    </div>
  );
};
