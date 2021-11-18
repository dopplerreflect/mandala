import { radialPoint, radialPointString } from '@dopplerreflect/drawring-utils';
import Screenshot from '../components/clouds.jpg';
import SVGTag from '../components/SVGTag';

const PI = Math.PI;
const PHI = (Math.sqrt(5) + 1) / 2;

const randomShade = (hue: number): string => {
  const randomHue = Math.random() * 10;
  const randomSaturation = Math.random() * 10;
  let randomLightness = Math.random() * 10;
  if (Math.random() > 0.5) randomLightness = -randomLightness;
  return `hsl(${hue + randomHue}, ${100 - randomSaturation}%, ${
    50 + randomLightness
  }%)`;
};
const fillOpacity = 0.66;

export default () => {
  const width = 1080;
  const radius = width * 0.45;
  const strokeWidth = (width / 1080) * 4;
  const angles = [...Array(72).keys()].map(k => ((2 * PI) / 72) * k - PI / 2);
  const rings = [...Array(10).keys()].map(k => radius * (PHI - 1) ** k);
  return (
    <SVGTag
      id='StainedGlass'
      width={width}
      // viewBox={`${-rings[5]} ${-rings[3]} ${rings[2] * 2} ${rings[2] * 2}`}
      // viewBox={`${0} ${-width / 2} ${width / 2} ${width / 2}`}
    >
      <defs>
        <path
          id='bgSquare'
          d={`M${-width / 2},${-width / 2}H${width / 2}V${width / 2}H${
            -width / 2
          }Z`}
        />
        <mask id='innerPetalMask'>
          <use xlinkHref='#bgSquare' fill='white' />
          {[...Array(9).keys()].map(k => (
            <use
              key={k}
              xlinkHref='#innerPetal'
              transform={`rotate(${(360 / 9) * k})`}
              stroke='black'
              strokeWidth={strokeWidth}
              fill={'black'}
            />
          ))}
        </mask>
        <mask id='innerPetalSpikeMask'>
          <use xlinkHref='#bgSquare' fill='white' />
          <use
            xlinkHref='#innerPetalSpike'
            stroke='black'
            strokeWidth={strokeWidth}
            fill={'black'}
          />
        </mask>
        <mask id='leafMask'>
          <use xlinkHref='#bgSquare' fill='white' />
          {[...Array(9).keys()].map(k => (
            <g key={k}>
              <use
                xlinkHref='#leafInner'
                transform={`rotate(${(360 / 9) * k})`}
                stroke='black'
                strokeWidth={strokeWidth}
                fill='black'
              />
              <use
                xlinkHref='#leafOuter'
                transform={`rotate(${(360 / 9) * k})`}
                stroke='black'
                strokeWidth={strokeWidth}
                fill='black'
              />
              <circle r={rings[2]} fill='black' />
            </g>
          ))}
        </mask>
        <mask id='leafMask2'>
          <use xlinkHref='#bgSquare' fill='white' />
          {[...Array(18).keys()].map(k => (
            <g key={k}>
              <use
                xlinkHref='#leafInner'
                transform={`rotate(${(360 / 18) * k})`}
                stroke='black'
                strokeWidth={strokeWidth}
                fill='black'
              />
              <use
                xlinkHref='#leafOuter'
                transform={`rotate(${(360 / 18) * k})`}
                stroke='black'
                strokeWidth={strokeWidth}
                fill='black'
              />
            </g>
          ))}
        </mask>
        <mask id='leafMask3'>
          <use xlinkHref='#bgSquare' fill='white' />
          {[...Array(18).keys()].map(k => (
            <g key={k}>
              <use
                xlinkHref='#leafInner'
                transform={`rotate(${(360 / 18) * k})`}
                stroke='black'
                strokeWidth={strokeWidth}
                fill='black'
              />
              <use
                xlinkHref='#leafOuter'
                transform={`rotate(${(360 / 18) * k})`}
                stroke='black'
                strokeWidth={strokeWidth}
                fill='black'
              />
              <circle
                cx={radialPoint(angles[2], radius - rings[2]).x}
                cy={radialPoint(angles[2], radius - rings[2]).y}
                r={rings[6]}
                transform={`rotate(${(360 / 18) * k})`}
                stroke='black'
                fill='black'
              />
            </g>
          ))}
        </mask>
        <mask id='radiusMask'>
          <use xlinkHref='#bgSquare' fill='rgba(255,255,255,0.25)' />
          <circle r={radius} fill='white' />
        </mask>
        <path
          id='innerPetal'
          mask='url(#innerPetalSpikeMask)'
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
          id='innerPetalSpike'
          d={[
            `M${radialPointString(angles[0], rings[2])}`,
            `Q${radialPointString(angles[0], rings[3])},${radialPointString(
              angles[4],
              rings[3]
            )}`,
            `Q${radialPointString(angles[0], rings[3])},${radialPointString(
              angles[0],
              rings[4]
            )}`,
            `Q${radialPointString(angles[0], rings[3])},${radialPointString(
              angles[68],
              rings[3]
            )}`,
            `Q${radialPointString(angles[0], rings[3])},${radialPointString(
              angles[0],
              rings[2]
            )}`,
            `Z`,
          ].join(' ')}
        />
        <path
          id='innerPoint'
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
          id='spikeSeperator'
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
        <path
          id='abcd'
          d={[
            `M${radialPointString(angles[0], rings[5])}`,
            `A${rings[5]},${rings[5]} 0 0 1 ${radialPointString(
              angles[8],
              rings[5]
            )}`,
            `L${radialPointString(angles[8], rings[6])}`,
            `A${rings[6]},${rings[6]} 0 0 0 ${radialPointString(
              angles[0],
              rings[6]
            )}`,
            `Z`,
          ].join(' ')}
        />
        <path
          id='abcde'
          d={[
            `M${radialPointString(angles[60], rings[6])}`,
            `A${rings[6]},${rings[6]} 0 0 1 ${radialPointString(
              angles[12],
              rings[6]
            )}`,
            `L${radialPointString(angles[60], rings[6])}`,
            `Z`,
          ].join(' ')}
        />
        <path
          id='leafInner'
          d={[
            `M${radialPointString(angles[0], rings[2])}`,
            `Q${radialPointString(angles[4], rings[2])}`,
            `${radialPointString(angles[4], radius - rings[3])}`,
            `Q${radialPointString(angles[4], rings[2])}`,
            `${radialPointString(angles[8], rings[2])}`,
            `Q${radialPointString(angles[4], rings[2])}`,
            `${radialPointString(angles[4], rings[3])}`,
            `Q${radialPointString(angles[4], rings[2])}`,
            `${radialPointString(angles[0], rings[2])}`,
          ].join(' ')}
        />
        <path
          id='leafOuter'
          d={[
            `M${radialPointString(angles[0], radius - rings[1])}`,
            `C${radialPointString(angles[0], radius - rings[2])}`,
            `${radialPointString(angles[4], radius - rings[2])}`,
            `${radialPointString(angles[4], radius - rings[3])}`,
            `C${radialPointString(angles[4], radius - rings[2])}`,
            `${radialPointString(angles[8], radius - rings[2])}`,
            `${radialPointString(angles[8], radius - rings[1])}`,
            `Q${radialPointString(angles[4], radius - rings[1])}`,
            `${radialPointString(angles[4], radius - rings[3])}`,
            `Q${radialPointString(angles[4], radius - rings[1])}`,
            `${radialPointString(angles[0], rings[2])}`,
          ].join(' ')}
        />
      </defs>
      {/* <use xlinkHref="#bgSquare" fill="hsl(300, 5%, 5%)" /> */}

      {/* <circle r={radius} stroke="white" fill="hsl(240, 20%, 10%)" /> */}
      <image
        mask='url(#radiusMask)'
        x={-width / 2}
        y={-width / 2}
        width={width}
        height={width}
        xlinkHref={Screenshot}
      />

      {/* {angles.map((a, i) => (
        <g key={a}>
          <text
            x={radialPoint(a, radius + 20).x}
            y={radialPoint(a, radius + 20).y}
            fill="orange"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {i}
          </text>
          <path d={`M0,0L${radialPointString(a, radius)}`} stroke="orange" />
        </g>
      ))}
      {rings.map((r, i) => (
        <g key={i}>
          <circle r={r} stroke="blue" fill="none" />
          <circle r={radius - r} stroke="yellow" fill="none" />
        </g>
      ))} */}

      <g id='innerPoints' mask='url(#innerPetalMask)'>
        {[...Array(9).keys()].map(k => (
          <use
            key={k}
            xlinkHref='#innerPoint'
            transform={`rotate(${(360 / 9) * k})`}
            stroke='black'
            strokeWidth={strokeWidth}
            fill={randomShade(60)}
            fillOpacity={0.33}
          />
        ))}
      </g>
      <g id='innerPetals'>
        {[...Array(9).keys()].map(k => (
          <use
            key={k}
            xlinkHref='#innerPetalSpike'
            transform={`rotate(${(360 / 9) * k})`}
            stroke='black'
            strokeWidth={strokeWidth}
            fill={randomShade(300)}
            fillOpacity={0.33}
          />
        ))}
      </g>
      {[...Array(9).keys()].map(k => (
        <use
          key={k}
          xlinkHref='#innerPetal'
          transform={`rotate(${(360 / 9) * k})`}
          stroke='black'
          strokeWidth={strokeWidth}
          fill={randomShade(270)}
          fillOpacity={fillOpacity}
        />
      ))}
      {[...Array(9).keys()].map(k => (
        <use
          key={k}
          xlinkHref='#spikeSeperator'
          transform={`rotate(${(360 / 9) * k})`}
          stroke='black'
          strokeWidth={strokeWidth}
          fill={randomShade(30)}
          fillOpacity={fillOpacity}
        />
      ))}
      {[...Array(9).keys()].map(k => (
        <use
          key={k}
          xlinkHref='#abcd'
          transform={`rotate(${(360 / 9) * k})`}
          stroke='black'
          strokeWidth={strokeWidth}
          fill={randomShade(90)}
          fillOpacity={fillOpacity}
        />
      ))}
      {[...Array(3).keys()].map(k => (
        <use
          key={k}
          xlinkHref='#abcde'
          transform={`rotate(${(360 / 3) * k})`}
          stroke='black'
          strokeWidth={strokeWidth}
          fill={randomShade(180)}
          fillOpacity={fillOpacity}
        />
      ))}
      <circle
        r={rings[8]}
        stroke='black'
        strokeWidth={strokeWidth}
        fill={randomShade(240)}
        fillOpacity={fillOpacity}
      />
      {[...Array(9).keys()].map(k => (
        <g key={k}>
          <use
            xlinkHref='#leafInner'
            transform={`rotate(${(360 / 9) * k})`}
            stroke='black'
            strokeWidth={strokeWidth}
            fill={randomShade(240)}
            fillOpacity={0.33}
          />
          <use
            xlinkHref='#leafOuter'
            transform={`rotate(${(360 / 9) * k})`}
            stroke='black'
            strokeWidth={strokeWidth}
            fill={randomShade(210)}
            fillOpacity={fillOpacity}
          />
        </g>
      ))}
      {[...Array(9).keys()].map(k => (
        <g key={k} mask='url(#leafMask)'>
          <use
            xlinkHref='#leafInner'
            transform={`rotate(${(360 / 9) * k + 20})`}
            stroke='black'
            strokeWidth={strokeWidth}
            fill={randomShade(180)}
            fillOpacity={0.33}
          />
          <use
            xlinkHref='#leafOuter'
            transform={`rotate(${(360 / 9) * k + 20})`}
            stroke='black'
            strokeWidth={strokeWidth}
            fill={randomShade(150)}
            fillOpacity={fillOpacity}
          />
        </g>
      ))}
      {[...Array(18).keys()].map(k => (
        <circle
          key={k}
          mask='url(#leafMask2)'
          cx={radialPoint(angles[2], radius - rings[2]).x}
          cy={radialPoint(angles[2], radius - rings[2]).y}
          r={rings[6]}
          transform={`rotate(${(360 / 18) * k})`}
          stroke='black'
          strokeWidth={strokeWidth}
          fill={randomShade(120)}
          fillOpacity={0.33}
        />
      ))}
      {[...Array(18).keys()].map(k => (
        <path
          mask='url(#leafMask3)'
          key={k}
          d={[
            `M${radialPointString(angles[0], radius - rings[2])}`,
            `A${rings[2]},${rings[2]} 0 0 1 ${radialPointString(
              angles[4],
              radius - rings[2]
            )}`,
            `L${radialPointString(angles[4], radius - rings[3])}`,
            `A${radius - rings[3]},${
              radius - rings[3]
            } 0 0 0 ${radialPointString(angles[0], radius - rings[3])}`,
          ].join('')}
          transform={`rotate(${(360 / 18) * k})`}
          stroke='black'
          strokeWidth={strokeWidth}
          fill={randomShade(240)}
          fillOpacity={fillOpacity}
        />
      ))}
      {[...Array(18).keys()].map(k => (
        <g key={k}>
          <path
            d={[
              `M${radialPointString(angles[70], radius - rings[3])}`,
              `A${radius - rings[3]},${
                radius - rings[3]
              } 0 0 1 ${radialPointString(angles[2], radius - rings[3])}`,
              `L${radialPointString(angles[2], radius - rings[4])}`,
              `A${radius - rings[4]},${
                radius - rings[4]
              } 0 0 0 ${radialPointString(angles[1], radius - rings[4])}`,
              `L${radialPointString(angles[1], radius - rings[5])}`,
              `A${radius - rings[5]},${
                radius - rings[5]
              } 0 0 0 ${radialPointString(angles[71], radius - rings[5])}`,
              `L${radialPointString(angles[71], radius - rings[4])}`,
              `A${radius - rings[4]},${
                radius - rings[4]
              } 0 0 0 ${radialPointString(angles[70], radius - rings[4])}`,
              `Z`,
            ].join(' ')}
            stroke='black'
            strokeWidth={strokeWidth}
            fill={randomShade(240)}
            fillOpacity={0.25}
            transform={`rotate(${(360 / 18) * k})`}
          />
          <path
            d={[
              `M${radialPointString(angles[0], radius - rings[5])}`,
              `A${radius - rings[5]},${
                radius - rings[5]
              } 0 0 0 ${radialPointString(angles[1], radius - rings[5])}`,
              `L${radialPointString(angles[1], radius - rings[4])}`,
              `A${radius - rings[4]},${
                radius - rings[4]
              } 0 0 1 ${radialPointString(angles[3], radius - rings[4])}`,
              `L${radialPointString(angles[3], radius - rings[5])}`,
              `A${radius - rings[5]},${
                radius - rings[5]
              } 0 0 1 ${radialPointString(angles[4], radius - rings[5])}`,
              `L${radialPointString(angles[4], radius - rings[6])}`,
              `A${radius - rings[6]},${
                radius - rings[6]
              } 0 0 0 ${radialPointString(angles[3], radius - rings[6])}`,
              `L${radialPointString(angles[3], radius - rings[7])}`,
              `A${radius - rings[7]},${
                radius - rings[7]
              } 0 0 0 ${radialPointString(angles[1], radius - rings[7])}`,
              `L${radialPointString(angles[1], radius - rings[6])}`,
              `A${radius - rings[6]},${
                radius - rings[6]
              } 0 0 0 ${radialPointString(angles[0], radius - rings[6])}`,
              `Z`,
            ].join(' ')}
            stroke='black'
            strokeWidth={strokeWidth}
            fill={randomShade(240)}
            fillOpacity={fillOpacity}
            transform={`rotate(${(360 / 18) * k})`}
          />
          <path
            d={`M${radialPointString(angles[70], radius)}L${radialPointString(
              angles[70],
              radius - rings[7]
            )}`}
            stroke='black'
            strokeWidth={strokeWidth}
            transform={`rotate(${(360 / 18) * k})`}
          />
        </g>
      ))}
      <circle
        r={radius - rings[8]}
        stroke='black'
        strokeWidth={strokeWidth}
        fill='none'
      />
      <circle r={radius} stroke='black' strokeWidth={strokeWidth} fill='none' />
    </SVGTag>
  );
};
