import useSaveSVG from '@dopplerreflect/use-save-svg';

import { Point, radialPoint } from '@dopplerreflect/drawring-utils';

const pathFromArray = (array: Point[]): string => {
  const [first, ...rest] = array;
  return [
    `M${first.x},${first.y}`,
    [...rest.map(r => `L${r.x},${r.y}`)].join(' '),
    'Z',
  ].join(' ');
};

export default () => {
  const svgRef = useSaveSVG();

  const width = 1080;
  const radius = (width / 10) * 4.5;
  const circle = Math.PI * 2;

  const threePolygons = [
    [...Array(3).keys()].map(a =>
      radialPoint((circle / 3) * a - circle / 4, radius)
    ),
    [...Array(5).keys()].map(a =>
      radialPoint((circle / 5) * a - circle / 4, radius)
    ),
    [...Array(8).keys()].map(a =>
      radialPoint((circle / 8) * a - circle / 4, radius)
    ),
  ];

  return (
    <svg
      ref={svgRef}
      id="ThreeFiveEight"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${-width / 2} ${-width / 2} ${width} ${width}`}
    >
      <circle r={radius} stroke="white" fill="none" />
      {threePolygons.map((p, i) => (
        <path key={i} d={pathFromArray(p)} stroke="white" fill="none" />
      ))}
    </svg>
  );
};
