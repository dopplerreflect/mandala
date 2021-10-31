import useSaveSVG from '@dopplerreflect/use-save-svg';

type Point = {
  x: number;
  y: number;
};

const Tesseract = () => {
  const svgRef = useSaveSVG();
  const w = 1080;
  const r1 = w / Math.sqrt(5);
  const a = [...Array(8).keys()].map(a => ((Math.PI * 2) / 8) * a);

  const point = (angle: number, radius: number): Point => ({
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  });

  const pointString = (angle: number, radius: number): string =>
    `${point(angle, radius).x},${point(angle, radius).y}`;

  const pointFromCenter = (
    angle: number,
    radius: number,
    cx: number,
    cy: number
  ): Point => ({
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  });

  const pointStringFromCenter = (
    angle: number,
    radius: number,
    cx: number,
    cy: number
  ): string =>
    `${pointFromCenter(angle, radius, cx, cy).x},${
      pointFromCenter(angle, radius, cx, cy).y
    }`;

  const chordLength = (angle: number, radius: number): number =>
    2 * radius * Math.sin(angle / 2);

  const lineLength = (x1: number, x2: number, y1: number, y2: number): number =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const ce = pointFromCenter(
    (90 + 45 + 22.5) * (Math.PI / 180),
    chordLength(45 * (Math.PI / 180), r1),
    point(0, r1).x,
    point(0, r1).y
  );

  const r2 = lineLength(ce.x, 0, ce.y, 0);
  console.log({ r2 });

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      id="Tesseract"
      viewBox={`${-w / 2} ${-w / 2} ${w} ${w}`}
    >
      <defs>
        <path
          id="octant"
          d={[
            `M${pointString(a[0], r1)}`,
            `L${pointString(a[1], r1)}`,
            `L${pointString(a[0], r2)}`,
            `L${pointString(a[7], r1)}`,
            `L${pointString(a[0], r1)}`,
            `L${pointString(a[1], r2)}`,
            `L${pointString(a[4], r2)}`,
            `L${pointString(a[7], r2)}`,
            `Z`,
          ].join()}
          fill="none"
          strokeLinejoin="bevel"
        />
        <filter id="glow">
          <feFlood floodColor="hsl(270, 50%, 10%)" result="color0" />
          <feComposite
            in="color0"
            in2="SourceGraphic"
            operator="in"
            result="color0Composite"
          />
          <feMorphology
            in="color0Composite"
            radius="12"
            operator="dilate"
            result="color0Dilate"
          />

          <feFlood floodColor="hsl(240, 100%, 75%)" result="color1" />
          <feComposite
            in="color1"
            in2="SourceGraphic"
            operator="in"
            result="color1Composite"
          />
          <feMorphology
            in="color1Composite"
            radius="1"
            operator="dilate"
            result="color1Dilate"
          />
          <feGaussianBlur
            in="color1Dilate"
            stdDeviation="2.5"
            result="color1Blur"
          />

          <feFlood floodColor="hsl(210, 100%, 75%)" result="color2" />
          <feComposite
            in="color2"
            in2="SourceGraphic"
            operator="in"
            result="color2Composite"
          />
          <feMorphology
            in="color2Composite"
            radius="1"
            operator="dilate"
            result="color2Dilate"
          />
          <feGaussianBlur
            in="color2Dilate"
            stdDeviation="5"
            result="color2Blur"
          />

          <feMerge>
            <feMergeNode in="color0Dilate" />
            <feMergeNode in="color2Blur" />
            <feMergeNode in="color1Blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g
        id="tesseract"
        stroke="hsl(270, 100%, 75%)"
        strokeWidth="2"
        filter="url(#glow)"
      >
        {a.map(a => (
          <use
            key={a}
            href="#octant"
            transform={`rotate(${a * (180 / Math.PI)})`}
          />
        ))}
      </g>
    </svg>
  );
};

export { Tesseract };
