import useSaveSVG from '@dopplerreflect/use-save-svg';

export default () => {
  const svgRef = useSaveSVG();

  const PI = Math.PI;
  const PHI = (Math.sqrt(5) + 1) / 2;
  const w = 1080;
  const or = w * (PHI - 1) ** 2;
  const r = [...Array(3).keys()].map(k => or * (PHI - 1) ** k);
  const a = [...Array(30).keys()].map(k => ((PI * 2) / 30) * k - (PI * 2) / 4);
  const ps = (angle: number, radius: number): string =>
    `${radius * Math.cos(angle)},${radius * Math.sin(angle)}`;

  return (
    <svg
      id="DRLogo"
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${-w / 2} ${-w / 2} ${w} ${w}`}
    >
      <defs>
        <filter x={-w / 2} y={-w / 2} width={w} height={w} id="shine">
          <feGaussianBlur
            in="SourceAlpha"
            stdDeviation={or * (PHI - 1) ** 5}
            result="blur"
          />
          <feOffset in="blur" dx={0} dy={or * (PHI - 1) ** 6} result="offset" />
          <feSpecularLighting
            in="blur"
            lightingColor="white"
            surfaceScale={10}
            specularConstant={0.5}
            specularExponent={50}
            result="lighting"
          >
            <fePointLight x={w / 4} y={-w / 2} z={w / 2} />
          </feSpecularLighting>
          <feComposite
            in="lighting"
            in2="SourceAlpha"
            operator="in"
            result="composite1"
          />
          <feComposite
            in="composite1"
            in2="SourceGraphic"
            operator="arithmetic"
            k2={1}
            k3={1}
            result="composite2"
          />
          <feComposite in="composite2" in2="offset" operator="over" />
        </filter>
      </defs>
      <path
        d={`M${-w / 2},${-w / 2}H${w}V${w}H${-w / 2}Z`}
        fill="hsl(240, 100%, 5%)"
      />
      {r.map((cr, i) => (
        <circle
          key={cr}
          r={cr}
          stroke="hsl(225, 100%, 75%)"
          fill="none"
          strokeWidth={or * (PHI - 1) ** 6}
        />
      ))}
      {a.map((a, i) => (
        <g key={i}>
          <path key={a} d={`M0,0L${ps(a, r[0])}`} stroke="white" />
          {/* <text
            x={(20 + r[0]) * Math.cos(a)}
            y={(20 + r[0]) * Math.sin(a)}
            fill="white"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {i}
          </text> */}
        </g>
      ))}
      <path
        id="star"
        d={[
          `M${ps(a[0], r[0])}`,
          `L${ps(a[3], r[2])}`,
          `L${ps(a[6], r[0])}`,
          `L${ps(a[9], r[2])}`,
          `L${ps(a[12], r[0])}`,
          `L${ps(a[15], r[2])}`,
          `L${ps(a[18], r[0])}`,
          `L${ps(a[21], r[2])}`,
          `L${ps(a[24], r[0])}`,
          `L${ps(a[27], r[2])}`,
          'Z',
        ].join(' ')}
        stroke="hsl(225, 100%, 75%)"
        fill="none"
        strokeWidth={or * (PHI - 1) ** 6}
      />
      <g id="DR" opacity={0.9}>
        <path
          id="D"
          d={[
            `M${ps(a[0], r[0])}`,
            `A${r[0]},${r[0]} 0 1 1 ${ps(a[18], r[0])}`,
            `Z`,
          ].join(' ')}
          fill="none"
          stroke="hsl(225, 100%, 50%)"
          strokeWidth={or * (PHI - 1) ** 3}
          filter="url(#shine)"
        />
        <path
          id="R"
          d={[
            `M${ps(a[25], r[1])}`,
            `A${r[1]},${r[1]} 0 1 1 ${ps(a[11], r[1])}`,
            `L${ps(a[12], r[0])}`,
            `L${ps(a[15], r[2])}`,
            `L${ps(a[17], r[1])}`,
            `A${r[1]},${r[1]} 0 0 1 ${ps(a[19], r[1])}`,
            `L${ps(a[27], r[2])}`,
            `Z`,
          ].join(' ')}
          fill="none"
          stroke="hsl(45, 100%, 50%)"
          strokeWidth={or * (PHI - 1) ** 3}
          filter="url(#shine)"
        />
      </g>
    </svg>
  );
};
