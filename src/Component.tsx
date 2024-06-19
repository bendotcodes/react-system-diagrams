import { css } from '@emotion/css';
import { ComponentData, AnchorPosition } from './types';
import { useEffect, useRef } from 'react';

type Props = {
  id: string;
  data: ComponentData;
  selected: boolean;
  editing: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
  onEdit: (text: string) => void;
  onScaleBegin: (position: AnchorPosition) => void;
};

export default function Component({
  data: { name, position, size },
  selected,
  editing,
  onMouseDown,
  onDoubleClick,
  onEdit,
  onScaleBegin,
}: Props) {
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editing) {
      if (inputRef.current) {
        inputRef.current.innerHTML = name;
        inputRef.current.focus();
      }
    }
  }, [editing]);

  return (
    <g
      className={css`
        cursor: ${editing ? 'text' : 'move'};
        user-select: none;
      `}
      onMouseDown={(e) => {
        e.stopPropagation();
        onMouseDown();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick();
      }}
    >
      <rect
        fill="#ffffff"
        stroke="#d3d3d3"
        strokeWidth={1}
        x={position.x}
        y={position.y}
        width={size.width}
        height={size.height}
        style={{
          filter: 'drop-shadow(3px 3px 2px #d3d3d3)',
        }}
      />

      <foreignObject
        x={position.x}
        y={position.y}
        width={size.width}
        height={size.height}
      >
        {editing ? (
          <div
            ref={inputRef}
            contentEditable
            onBlur={(e) => {
              onEdit(e.target.innerHTML);
            }}
            onKeyDown={(e) => {
              if (e.code === 'Escape') {
                const target = e.target as HTMLDivElement;
                onEdit(target.innerHTML);
              }
            }}
            onFocus={(e) => {
              const target = e.target as HTMLDivElement;
              const selection = window.getSelection();

              if (selection) {
                const range = document.createRange();
                selection.removeAllRanges();
                range.selectNodeContents(target);
                range.collapse(false);
                selection.addRange(range);
                target.focus();
              }
            }}
            className={css`
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              justify-content: center;
              outline: 0;
            `}
          />
        ) : (
          <div
            className={css`
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              justify-content: center;
              outline: 0;
            `}
            dangerouslySetInnerHTML={{ __html: name }}
          ></div>
        )}
      </foreignObject>

      <rect
        fill={selected ? '#29b6f2' : 'transparent'}
        x={position.x - 4}
        y={position.y - 4}
        width={8}
        height={8}
        className={css`
          cursor: nw-resize;
        `}
        onMouseDown={(e) => {
          e.stopPropagation();
          onScaleBegin(AnchorPosition.TopLeft);
        }}
      />
      <rect
        fill={selected ? '#29b6f2' : 'transparent'}
        x={position.x + size.width - 4}
        y={position.y - 4}
        width={8}
        height={8}
        className={css`
          cursor: ne-resize;
        `}
        onMouseDown={(e) => {
          e.stopPropagation();
          onScaleBegin(AnchorPosition.TopRight);
        }}
      />
      <rect
        fill={selected ? '#29b6f2' : 'transparent'}
        x={position.x - 4}
        y={position.y + size.height - 4}
        width={8}
        height={8}
        className={css`
          cursor: sw-resize;
        `}
        onMouseDown={(e) => {
          e.stopPropagation();
          onScaleBegin(AnchorPosition.BottomLeft);
        }}
      />
      <rect
        fill={selected ? '#29b6f2' : 'transparent'}
        x={position.x + size.width - 4}
        y={position.y + size.height - 4}
        width={8}
        height={8}
        className={css`
          cursor: se-resize;
        `}
        onMouseDown={(e) => {
          e.stopPropagation();
          onScaleBegin(AnchorPosition.BottomRight);
        }}
      />
    </g>
  );
}
