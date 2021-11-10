import { radialPoint, radialPointString } from '@dopplerreflect/drawring-utils';
import SVGTag from '../components/SVGTag';

const PI = Math.PI;
const PHI = (Math.sqrt(5) + 1) / 2;

const randomShade = (hue: number): string => {
  const randomHue = Math.random() * 5;
  const randomSaturation = Math.random() * 10;
  let randomLightness = Math.random() * 10;
  if (Math.random() > 0.5) randomLightness = -randomLightness;
  return `hsla(${hue + randomHue}, ${100 - randomSaturation}%, ${
    50 + randomLightness
  }%, 0.75)`;
};

export default () => {
  const width = 1080;
  const radius = width * 0.45;
  const strokeWidth = (width / 1080) * 4;
  const angles = [...Array(72).keys()].map(k => ((2 * PI) / 72) * k - PI / 2);
  const rings = [...Array(10).keys()].map(k => radius * (PHI - 1) ** k);
  return (
    <SVGTag
      id="StainedGlass"
      width={width}
      viewBox={`${-width / 8} ${-width / 8} ${width / 6} ${width / 6}`}
    >
      <defs>
        <mask id="innerPetalMask">
          <path
            d={`M${-width / 2},${-width / 2}H${width / 2}V${width / 2}H${
              -width / 2
            }Z`}
            fill="white"
          />
          {[...Array(9).keys()].map(k => (
            <use
              key={k}
              href="#innerPetal"
              transform={`rotate(${(360 / 9) * k})`}
              stroke="black"
              strokeWidth={strokeWidth}
              fill={'black'}
            />
          ))}
        </mask>
        <path
          id="innerPetal"
          d={[
            `M${radialPointString(angles[0], rings[2])}`,
            `Q${radialPointString(angles[5], rings[2])},${radialPointString(
              angles[3],
              rings[4]
            )}`,
            `A${rings[4]},${rings[4]} 0 0 0 ${radialPointString(
              angles[69],
              rings[4]
            )}`,
            `Q${radialPointString(angles[67], rings[2])},${radialPointString(
              angles[0],
              rings[2]
            )}`,
          ].join(' ')}
        />
        <path
          id="innerPoint"
          d={[
            `M${radialPointString(angles[4], rings[5])}`,
            `L${radialPointString(angles[3], rings[4])}`,
            `L${radialPointString(angles[3], rings[3])}`,
            `A${rings[3]},${rings[3]} 0 0 1 ${radialPointString(
              angles[5],
              rings[3]
            )}`,
            `L${radialPointString(angles[5], rings[4])}`,
            `Z`,
          ].join(' ')}
        />
        <path
          id="spikeSeperator"
          d={[
            `M${radialPointString(angles[68], rings[5])}`,
            `L${radialPointString(angles[69], rings[4])}`,
            `A${rings[4]},${rings[4]} 0 0 1 ${radialPointString(
              angles[3],
              rings[4]
            )}`,
            `L${radialPointString(angles[4], rings[5])}`,
            `A${rings[5]},${rings[5]} 0 0 0 ${radialPointString(
              angles[68],
              rings[5]
            )}`,
            `Z`,
          ].join(' ')}
        />
      </defs>
      <circle r={radius} stroke="white" fill="hsl(240, 20%, 50%)" />
      {angles.map((a, i) => (
        <g key={a}>
          <text
            x={radialPoint(a, radius + 20).x}
            y={radialPoint(a, radius + 20).y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {i}
          </text>
          <path d={`M0,0L${radialPointString(a, radius)}`} stroke="white" />
        </g>
      ))}
      <g id="innerPoints" mask="url(#innerPetalMask)">
        {[...Array(9).keys()].map(k => (
          <use
            key={k}
            href="#innerPoint"
            transform={`rotate(${(360 / 9) * k})`}
            stroke="black"
            strokeWidth={strokeWidth}
            fill={randomShade(60)}
          />
        ))}
      </g>
      <g id="innerPetals">
        {[...Array(9).keys()].map(k => (
          <use
            key={k}
            href="#innerPetal"
            transform={`rotate(${(360 / 9) * k})`}
            stroke="black"
            strokeWidth={strokeWidth}
            fill={randomShade(270)}
          />
        ))}
      </g>
      {[...Array(9).keys()].map(k => (
        <use
          key={k}
          href="#spikeSeperator"
          transform={`rotate(${(360 / 9) * k})`}
          stroke="black"
          strokeWidth={strokeWidth}
          fill={randomShade(30)}
        />
      ))}
      {/* {rings.map((r, i) => (
        <g key={i}>
          <circle r={r} stroke="yellow" fill="none" />
          <circle r={radius - r} stroke="red" fill="none" />
        </g>
      ))} */}
    </SVGTag>
  );
};
