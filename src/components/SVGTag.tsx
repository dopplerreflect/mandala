import { ReactNode } from 'react';

type SVGTagProps = {
  id: string;
  width: number;
  height: number;
  children: ReactNode;
};

export default function SVGTag({ id, width, height, children }: SVGTagProps) {
  return (
    <svg
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
    >
      {children}
    </svg>
  );
}
