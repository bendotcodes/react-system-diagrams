import { css } from '@emotion/css';
import { ComponentData, ComponentState } from './types';
import { useEffect, useRef } from 'react';

type Props = {
  id: string;
  data: ComponentData;
  state: ComponentState;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onDoubleClick: () => void;
  onEditDone: (text: string) => void;
};

export default function Component({
  data: { name, position, size },
  state,
  onMouseDown,
  onMouseUp,
  onDoubleClick,
  onEditDone,
}: Props) {
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state === ComponentState.Editing) {
      if (inputRef.current) {
        inputRef.current.innerHTML = name;
        inputRef.current.focus();
      }
    }
  }, [state]);

  return (
    <g
      className={css`
        cursor: ${state === ComponentState.Editing ? 'text' : 'move'};
        user-select: none;
      `}
      onMouseDown={() => {
        onMouseDown();
      }}
      onMouseUp={() => {
        onMouseUp();
      }}
      onDoubleClick={() => {
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
        {state === ComponentState.Editing ? (
          <div
            ref={inputRef}
            contentEditable
            onBlur={(e) => {
              onEditDone(e.target.innerHTML);
            }}
            onKeyDown={(e) => {
              if (e.code === 'Escape') {
                const target = e.target as HTMLDivElement;
                onEditDone(target.innerHTML);
                console.log(target.innerHTML);
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
    </g>
  );
}
