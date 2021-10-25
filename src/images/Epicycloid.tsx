import React from 'react';
import useSaveSVG from '@dopplerreflect/use-save-svg';

const Epicycloid = () => {
  const svgRef = useSaveSVG();

  const width = 1080;

  const PHI = (Math.sqrt(5) + 1) / 2;

  const r1 = width / 5;
  const r2 = r1 / 15;
  const epicycloid = (angle: number): { x: number; y: number } => ({
    x: (r1 + r2) * Math.cos(angle) - r1 * Math.cos(((r1 + r2) / r2) * angle),
    y: (r1 + r2) * Math.sin(angle) - r1 * Math.sin(((r1 + r2) / r2) * angle),
  });
  const angles: number[] = [];
  for (let x = 0; x <= Math.PI * 2; x += 0.001) {
    angles.push(x);
  }
  const epicycloidPath = () => {
    const [o, ...rest] = angles;
    return `M${epicycloid(o).x},${epicycloid(o).y} ${rest
      .map(r => `L${epicycloid(r).x},${epicycloid(r).y}`)
      .join()}Z`;
  };
  return (
    <svg
      id="Epicycloid"
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${-width / 2} ${-width / 2} ${width} ${width}`}
    >
      <path
        d={`M${-width / 2},${-width / 2}H${width / 2}V${width / 2}H${
          -width / 2
        }Z`}
        fill={`hsl(230, 100%, 5%)`}
      />
      <path
        d={epicycloidPath()}
        stroke={`hsl(45, 100%, 50%)`}
        strokeWidth={2}
        fill={`hsl(230, 100%, 50%)`}
        fillRule="evenodd"
        fillOpacity={0.5}
      />
    </svg>
  );
};

export { Epicycloid };
