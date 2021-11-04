type OutlineProps = {
  id: string;
  radius: number;
  color: string;
};

export default function Outline({
  id,
  radius,
  color,
}: OutlineProps): JSX.Element {
  return (
    <filter id={id}>
      <feMorphology operator="dilate" radius={radius} result="dilate" />
      <feFlood in="dilate" floodColor={color} floodOpacity={1} result="flood" />
      <feComposite in="flood" in2="dilate" operator="in" result="outline" />
      <feMerge>
        <feMergeNode in="outline" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}
