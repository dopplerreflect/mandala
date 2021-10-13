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
const r = (width / 10) * 4;
const divisions = 360;

const angles = [...Array(divisions).keys()].map(k => (360 / divisions) * k);

const rps = (angle: number, radius: number): string =>
  radialPointString(angle, radius, { x: cx, y: cx });

export const TimesTable = () => {
  const [factor, setFactor] = useState(6);
  const [colorLevel, setColorLevel] = useState(50);
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

  // const requestRef = useRef(0);
  // const animate = () => {
  //   setFactor(factor => round(factor + 0.001, 10e3));
  //   requestRef.current = requestAnimationFrame(animate);
  // };
  // useEffect(() => {
  //   requestRef.current = requestAnimationFrame(animate);
  //   return () => cancelAnimationFrame(requestRef.current);
  // }, []);

  return (
    <SVGTag width={width} height={width}>
      <path d={`M0 0H${width}V${width}H0Z`} />
      <g transform={`rotate(90 ${cx} ${cx})`}>
        {angles.map((a, i) => (
          <path
            key={i}
            d={`M${rps(a, r)}L${rps((360 / divisions) * i * factor, r)}`}
            stroke={`hsl(${Math.round(a)} 100% ${colorLevel}%`}
          />
        ))}
      </g>
    </SVGTag>
  );
};
