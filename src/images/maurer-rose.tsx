import { useState } from 'react';
import SVGTag from '../components/SVGTag';

const MaurerRose = (): JSX.Element => {
  const showSlider = false;
  const width = 1080;
  const n = 5;
  const [d, setD] = useState(17);

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
      <SVGTag width={width} height={width}>
        <rect
          x={-width / 2}
          y={-width / 2}
          width={width}
          height={width}
          fill="black"
        />
        <path
          d={verticesPath}
          stroke={`hsl(30, 100%, 50%)`}
          strokeWidth={2}
          strokeOpacity={1}
          fill="none"
          transform="rotate(180,0,0)"
        />
        <path
          d={maurerVerticesPath}
          stroke={`hsl(45, 100%, 50%)`}
          fill={`hsl(30, 100%, 50%)`}
          fillOpacity={0.5}
          // fillRule="evenodd"
          transform="rotate(180,0,0)"
        />
        <text
          x={-width / 2}
          y={-width / 2 + 16}
          fontSize={16}
          fontFamily="monospace"
          fill="white"
        >
          n={n} d={d}
        </text>
      </SVGTag>
    </>
  );
};

export { MaurerRose };
