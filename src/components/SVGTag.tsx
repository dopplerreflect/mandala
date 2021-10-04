import { ReactNode } from 'react';

type SVGTagProps = {
  width: number;
  height: number;
  children: ReactNode;
};

export default function SVGTag({ width, height, children }: SVGTagProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      {children}
    </svg>
  );
}
