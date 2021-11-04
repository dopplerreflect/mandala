import { useState } from 'react';
import useSaveSVG from '@dopplerreflect/use-save-svg';
// import useSaveSVG from '../../../use-save-svg/src/index';

export default (): JSX.Element => {
  const width = 1080;
  const n = 5;
  const [d, setD] = useState(1);

  const maurerVertices = [...Array(361).keys()].map(theta => {
    const k = (theta * d * Math.PI) / 180;
    const r = (width / 2) * Math.sin(n * k);
    const x = r * Math.cos(k);
    const y = r * Math.sin(k);
    return `L${x},${y}`;
  });
  const maurerVerticesPath = [`M0,0`, ...maurerVertices].join(' ');

  const vertices = [...Array(361).keys()].map(theta => {
    const k = (theta * Math.PI) / 180;
    const r = (width / 2) * Math.sin(n * k);
    const x = r * Math.cos(k);
    const y = r * Math.sin(k);
    return `L${x},${y}`;
  });
  const verticesPath = [`M0,0`, ...vertices].join(' ');

  const svgRef = useSaveSVG();
  return (
    <>
      {/* <div>
        <input
          type="range"
          min={1}
          max={180}
          value={d}
          onChange={e => setD(~~e.target.value)}
        />
      </div> */}
      <svg
        ref={svgRef}
        id={`MaurerRose-n${n}-d${d}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`${-width / 2} ${-width / 2} ${width} ${width}`}
      >
        <filter id="glow">
          <feFlood
            floodColor={`hsl(255, 100%, 50%)`}
            floodOpacity={1}
            result="flood"
          />
          <feComposite
            in="flood"
            in2="SourceGraphic"
            operator="in"
            result="mask"
          />
          <feMorphology
            in="mask"
            operator="dilate"
            radius="1"
            result="dilate"
          />
          <feGaussianBlur in="dilate" stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* <rect
          x={-width / 2}
          y={-width / 2}
          width={width}
          height={width}
          fill="black"
        /> */}
        <path
          filter="url(#glow)"
          d={verticesPath}
          stroke={`hsl(255, 100%, 70%)`}
          strokeWidth={2}
          strokeOpacity={1}
          fill="none"
          transform="rotate(180,0,0)"
        />
        <path
          // filter="url(#glow)"
          d={maurerVerticesPath}
          stroke={`hsl(120, 100%, 50%)`}
          fill={`hsl(240, 100%, 50%)`}
          fillOpacity={0.5}
          // fillRule="evenodd"
          transform="rotate(180,0,0)"
        />
        {/* <text
          x={-width / 2}
          y={-width / 2 + 16}
          fontSize={16}
          fontFamily="monospace"
          fill="white"
        >
          n={n} d={d}
        </text> */}
      </svg>
    </>
  );
};
