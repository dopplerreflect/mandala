import React, {
  useRef,
  useState,
  ChangeEvent,
  useLayoutEffect,
  useEffect,
} from 'react';
import SVGTag from '../components/SVGTag';
import { Point, radialPoint, radialPointString, round } from '../utils';

const width = 1080;
const cx = 0;
const r = (width / 10) * 4;
const divisions = 360;

const angles = [...Array(divisions).keys()].map(k => (360 / divisions) * k);

const rps = (angle: number, radius: number): string =>
  radialPointString(angle, radius, { x: cx, y: cx });

export default () => {
  const [factor, setFactor] = useState(2);
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

  // const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   console.log(event);
  //   setFactor(Number(event.target.value));
  // };
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
    <SVGTag id="TimesTable" width={width} height={width}>
      <path
        d={`M${-width / 2} ${-width / 2}H${width / 2}V${width / 2}H${
          -width / 2
        }Z`}
      />
      <g transform={`rotate(90 ${cx} ${cx})`}>
        {angles.map((a, i) => (
          <path
            key={i}
            d={`M${rps(a, r)}L${rps((360 / divisions) * i * factor, r)}`}
            stroke={`hsl(${Math.round(a)} 100% ${colorLevel}%`}
          />
        ))}
      </g>
      <text x={-width / 2 + 30} y={-width / 3} fontSize="32" fill="white">
        {factor}
      </text>
    </SVGTag>
  );
};
