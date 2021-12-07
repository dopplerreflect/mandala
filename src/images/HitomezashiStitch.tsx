import useSaveSVG from '@dopplerreflect/use-save-svg';
export default () => {
  const svgRef = useSaveSVG();
  const w = 1080; // canvas width
  const d = 48; // number of divisions

  const randomArray = (): boolean[] => [...Array(d)].map(k => Math.random() > 0.5);

  const h = [...Array(d).keys()].map(k => k % 3 === 0);
  const v = [...Array(d).keys()].map(k => k % 3 === 0);

  return (
    <svg
      id='HitomezashiStitch'
      ref={svgRef}
      xmlns='http://www.w3.org/2000/svg'
      viewBox={`0 0 ${w} ${w}`}
    >
      <path d={`M0,0H${w}V${w}H0Z`} fill='black' />
      {h.map((v, i) =>
        [...Array(d).keys()].map(
          (k, j) =>
            k % 2 === 0 && (
              <path
                d={`M${v ? (w / d) * j : (w / d) * j + w / d},${(w / d) * i}H${
                  v ? (w / d) * j + w / d : (w / d) * j + (w / d) * 2
                }`}
                stroke='white'
                strokeWidth={w / d / 4}
              ></path>
            )
        )
      )}
      {v.map((v, i) =>
        [...Array(d).keys()].map(
          (k, j) =>
            k % 2 === 0 && (
              <path
                d={`M${(w / d) * i},${v ? (w / d) * j : (w / d) * j + w / d}V${
                  v ? (w / d) * j + w / d : (w / d) * j + (w / d) * 2
                }`}
                stroke='white'
                strokeWidth={w / d / 4}
                // strokeLinecap='square'
              ></path>
            )
        )
      )}
    </svg>
  );
};
