import { css } from '@emotion/css';

import { ComponentState, DiagramData, ScalePosition } from './types';
import useDiagram from './Diagram.reducer';
import Grid from './Grid';
import Component from './Component';

type Props = {
  initialData: DiagramData;
};

export default function Diagram({ initialData }: Props) {
  const [state, dispatch] = useDiagram(initialData);

  return (
    <svg
      className={css`
        width: 100%;
        height: 100%;
      `}
      onMouseMove={(e) => {
        dispatch({
          type: 'move',
          position: {
            x: e.movementX,
            y: e.movementY,
          },
        });
      }}
      onMouseUp={() => {
        dispatch({
          type: 'mouse-up',
        });
      }}
      onMouseLeave={() => {
        dispatch({
          type: 'leave',
        });
      }}
      onWheel={(e) => {
        dispatch({
          type: e.deltaY > 0 ? 'zoom-in' : 'zoom-out',
          value: Math.abs(e.deltaY) * 0.05,
        });
      }}
    >
      <filter id="shadow">
        <feDropShadow
          dx="0.2"
          dy="0.4"
          stdDeviation="0.2"
          floodColor="#d3d3d3"
        />
      </filter>
      <g
        style={{
          transform: `translate(${state.state.viewport.position.x.toString()}px, ${state.state.viewport.position.y.toString()}px) scale(${state.state.viewport.zoom.toString()}, ${state.state.viewport.zoom.toString()})`,
        }}
      >
        <Grid
          viewport={state.state.viewport}
          onMouseDown={() => {
            dispatch({ type: 'viewport-begin' });
          }}
        />
        {Object.keys(state.data.components).map((id) => (
          <Component
            key={id}
            id={id}
            data={state.data.components[id]}
            state={
              id === state.state.activeComponent?.id
                ? state.state.activeComponent.state
                : ComponentState.None
            }
            onMouseDown={() => {
              dispatch({ type: 'move-begin', id });
            }}
            onDoubleClick={() => {
              dispatch({ type: 'edit-begin', id });
            }}
            onEditDone={(text: string) => {
              dispatch({ type: 'edit-end', text });
            }}
            onScaleBegin={(position: ScalePosition) => {
              dispatch({ type: 'scale-begin', id, position });
            }}
          />
        ))}
      </g>
    </svg>
  );
}
