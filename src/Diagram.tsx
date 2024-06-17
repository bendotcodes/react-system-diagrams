import { DndContext, DragStartEvent, DragMoveEvent } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { css } from '@emotion/css';

import { DiagramData } from './types';
import Component from './Component';
import useDiagram from './Diagram.reducer';

type Props = {
  initialData: DiagramData;
};

export default function Diagram({ initialData }: Props) {
  const [state, dispatch] = useDiagram(initialData);

  const onDragStart = (e: DragStartEvent) => {
    dispatch({ type: 'move-begin', id: e.active.id as string });
  };

  const onDragMove = (e: DragMoveEvent) => {
    dispatch({ type: 'move', position: e.delta });
  };

  const onDragEnd = () => {
    dispatch({ type: 'move-end' });
    console.log(JSON.stringify(state.data));
  };

  return (
    <div
      className={css`
        position: relative;
        width: 100%;
        height: 100%;
      `}
    >
      <DndContext
        modifiers={[restrictToParentElement]}
        onDragStart={onDragStart}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
      >
        {Object.keys(state.data.components).map((id) => (
          <Component
            key={id}
            id={id}
            data={state.data.components[id]}
            active={id === state.state.activeComponent?.id}
          />
        ))}
      </DndContext>
    </div>
  );
}
