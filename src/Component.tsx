import { css } from '@emotion/css';
import { useDraggable } from '@dnd-kit/core';
import { ComponentData } from './types';

type Props = {
  id: string;
  data: ComponentData;
  active: boolean;
};

export default function Component({ id, data }: Props) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <div
      className={css`
        display: inline-block;
        position: absolute;
        background: white;
        box-shadow: 0.3rem 0.3rem 0.3rem #d3d3d3;
        border: 1px solid #d3d3d3;
        padding: 2rem;
        cursor: move;
        top: ${data.position.y}px;
        left: ${data.position.x}px;
      `}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {data.name}
    </div>
  );
}
