import React from 'react';
import useSaveSVG from '@dopplerreflect/use-save-svg';
import Star from '../components/star';

const Epicycloid = () => {
  const svgRef = useSaveSVG();

  const width = 1080;

  const PHI = (Math.sqrt(5) + 1) / 2;

  const R = width / 10;
  const k = 15 / 16;
  const r = R * k;

  // const epicycloid2 = (angle: number): { x: number; y: number } => ({
  //   x: (R + r) * Math.cos(angle) - R * Math.cos(((R + r) / r) * angle),
  //   y: (R + r) * Math.sin(angle) - R * Math.sin(((R + r) / r) * angle),
  // });

  const epicycloid = (angle: number): { x: number; y: number } => ({
    x: R * (k + 1) * Math.cos(angle) - R * Math.cos((k + 1) * angle),
    y: R * (k + 1) * Math.sin(angle) - R * Math.sin((k + 1) * angle),
  });
  const angles: number[] = [];
  for (let x = 0; x <= Math.PI * 32; x += 0.02) {
    angles.push(x);
  }
  const epicycloidPath = () => {
    const [o, ...rest] = angles;
    return `M${epicycloid(o).x},${epicycloid(o).y} ${rest
      .map(r => `L${epicycloid(r).x},${epicycloid(r).y}`)
      .join()}Z`;
  };
  // const epicycloidPath2 = () => {
  //   const [o, ...rest] = angles;
  //   return `M${epicycloid2(o).x},${epicycloid2(o).y} ${rest
  //     .map(r => `L${epicycloid2(r).x},${epicycloid2(r).y}`)
  //     .join()}Z`;
  // };
  return (
    <svg
      id="Epicycloid"
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${-width / 2} ${-width / 2} ${width} ${width}`}
      transform="rotate(-90)"
    >
      <path
        d={`M${-width / 2},${-width / 2}H${width / 2}V${width / 2}H${
          -width / 2
        }Z`}
        fill={`hsl(230, 100%, 5%)`}
      />
      <circle r={R * k} stroke="hsl(45, 100%, 50%)" strokeWidth={2} />
      <path
        d={epicycloidPath()}
        stroke={`hsl(45, 100%, 50%)`}
        strokeWidth={2}
        // fill={`hsl(230, 100%, 50%)`}
        fillRule="evenodd"
        fillOpacity={1}
      />
      {/* <Star
        cx={0}
        cy={0}
        r={R * k}
        stroke="white"
        rotate={0}
        transform="rotate(24)"
        fill="none"
      />
      <Star
        cx={0}
        cy={0}
        r={R * k}
        stroke="white"
        rotate={0}
        transform="rotate(48)"
        fill="none"
      /> */}

      <Star cx={0} cy={0} r={R * k} stroke="white" rotate={0} fill="none" />
      {/* <line x1={-width / 2} x2={width} y1={0} y2={0} stroke="white" />
      <line x1={0} x2={0} y1={-width / 2} y2={width} stroke="white" /> */}
    </svg>
  );
};

export { Epicycloid };
