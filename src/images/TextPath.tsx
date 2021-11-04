type Point = {
  x: number;
  y: number;
};

const radialPoint = (angle: number, radius: number): Point => ({
  x: radius * Math.cos(angle),
  y: radius * Math.sin(angle),
});
const radialPointString = (angle: number, radius: number): string => {
  const point = radialPoint(angle, radius);
  return `${point.x},${point.y}`;
};

export default () => {
  const w = 1080;
  const r = w / 4;
  return (
    <svg
      id="TextPath"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${-w / 2} ${-w / 2} ${w} ${w}`}
    >
      <defs>
        <path
          id="textPath"
          d={[
            `M${radialPointString(Math.PI, r)}`,
            `A${r},${r} 0 0 0 ${radialPointString(0, r)}`,
          ].join(' ')}
        />
      </defs>
      {/* <circle r={r} stroke="white" /> */}
      <use href="#textPath" stroke="white" fill="none" />
      <text fill="white" fontSize="6em" textAnchor="middle">
        {/*//@ts-ignore*/}
        <textPath startOffset="50%" href="#textPath">
          @dopplerreflect
        </textPath>
      </text>
    </svg>
  );
};
