import { Position } from './types';

type Props = {
  position: Position;
  zoom: number;
  moving: boolean;
  onMouseDown: () => void;
};

export default function Grid({ position, zoom, moving, onMouseDown }: Props) {
  return (
    <>
      <defs>
        <pattern
          id="smallGrid"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 8 0 L 0 0 0 8"
            fill="none"
            stroke="gray"
            strokeWidth="0.5"
          />
        </pattern>
        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="80" height="80" fill="url(#smallGrid)" />
          <path
            d="M 80 0 L 0 0 0 80"
            fill="none"
            stroke="gray"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect
        x={-position.x / zoom}
        y={-position.y / zoom}
        width={`${((1 / zoom) * 100).toString()}%`}
        height={`${((1 / zoom) * 100).toString()}%`}
        fill="url(#grid)"
        style={{ cursor: moving ? 'grabbing' : 'grab' }}
        onMouseDown={() => {
          onMouseDown();
        }}
      />
    </>
  );
}
