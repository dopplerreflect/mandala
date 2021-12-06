export default () => {
  const w = 1080; // canvas width
  const d = 80; // number of divisions

  const randomArray = (): boolean[] => [...Array(d)].map(k => Math.random() > 0.5);

  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox={`0 0 ${w} ${w}`}>
      <path d={`M0,0H${w}V${w}H0Z`} fill='white' />
      {randomArray().map((v, i) =>
        [...Array(d).keys()].map(
          (k, j) =>
            k % 2 === 0 && (
              <path
                d={`M${v ? (w / d) * j : (w / d) * j + w / d},${(w / d) * i}H${
                  v ? (w / d) * j + w / d : (w / d) * j + (w / d) * 2
                }`}
                stroke={`hsl(${(360 / d) * j}, 100%, 20%)`}
                strokeWidth={w / 256}
              ></path>
            )
        )
      )}
      {randomArray().map((v, i) =>
        [...Array(d).keys()].map(
          (k, j) =>
            k % 2 === 0 && (
              <path
                d={`M${(w / d) * i},${v ? (w / d) * j : (w / d) * j + w / d}V${
                  v ? (w / d) * j + w / d : (w / d) * j + (w / d) * 2
                }`}
                stroke={`hsl(${(360 / d) * j}, 100%, 20%)`}
                strokeWidth={w / 256}
              ></path>
            )
        )
      )}
    </svg>
  );
};
