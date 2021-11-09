import { PHI } from '../utils';

const PI2 = Math.PI * 2;

export default () => {
  const width = 1080;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${-width / 2} ${-width / 2} ${width} ${width}`}
    >
      <path
        d={`M${-width / 2},${-width / 2}H${width}V${width}H${-width / 2}Z`}
        fill="black"
      />
      {[...Array(8).keys()].map(i => {
        return [...Array(width / 24).keys()].map(k => {
          const x = -width / 2 + k * 24;
          const y = Math.sin((PI2 / width) * x) * (width / 2) * (PHI - 1) ** i;
          return (
            <circle
              key={`i${i}k${k}`}
              cx={x}
              cy={y}
              r={(width / 1080) * 4}
              fill="none"
              stroke={`hsl(${(360 / width / 2) * x}, 100%, 50%)`}
            />
          );
        });
      })}
    </svg>
  );
};
