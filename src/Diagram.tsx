import { DndContext, DragStartEvent, DragMoveEvent } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { css } from '@emotion/css';

import { DiagramData } from './types';
import Component from './Component';
import useDiagram from './Diagram.reducer';
import Grid from './Grid';

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
  };

  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = () => {
    dispatch({ type: 'viewport-begin' });
  };

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    dispatch({
      type: 'viewport-move',
      position: { x: e.movementX, y: e.movementY },
    });
  };

  const onMouseUp: React.MouseEventHandler<HTMLDivElement> = () => {
    dispatch({ type: 'viewport-end' });
  };

  console.log(state);

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      className={css`
        position: relative;
        height: 100%;
        cursor: ${state.state.viewport.moving ? 'grabbing' : 'grab'};
        overflow: hidden;
      `}
    >
      <Grid />
      <div
        className={css`
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transform: translate(
            ${state.state.viewport.position.x}px,
            ${state.state.viewport.position.y}px
          );
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
    </div>
  );
}
