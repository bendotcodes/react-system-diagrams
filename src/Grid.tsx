import { Position } from './types';

type Props = {
  moving: boolean;
  position: Position;
  onMouseDown: () => void;
  onMouseUp: () => void;
};

export default function Grid({
  moving,
  position,
  onMouseDown,
  onMouseUp,
}: Props) {
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
        x={-position.x}
        y={-position.y}
        width="100%"
        height="100%"
        fill="url(#grid)"
        style={{ cursor: moving ? 'grabbing' : 'grab' }}
        onMouseDown={() => {
          onMouseDown();
        }}
        onMouseUp={() => {
          onMouseUp();
        }}
      />
    </>
  );
}
