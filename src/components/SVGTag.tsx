import useSaveSVG from '@dopplerreflect/use-save-svg';
import { ReactNode } from 'react';

type SVGTagProps = {
  id: string;
  width: number;
  height?: number;
  viewBox?: string;
  children: ReactNode;
};

export default function SVGTag({
  id,
  width,
  height,
  viewBox,
  children,
}: SVGTagProps) {
  const svgRef = useSaveSVG();
  if (!height) height = width;
  return (
    <svg
      id={id}
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={
        viewBox ? viewBox : `-${width / 2} -${height / 2} ${width} ${height}`
      }
    >
      {children}
    </svg>
  );
}
