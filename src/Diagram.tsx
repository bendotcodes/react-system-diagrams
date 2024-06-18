import { css } from '@emotion/css';

import { ComponentState, DiagramData } from './types';
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
      onMouseLeave={() => {
        dispatch({
          type: 'leave',
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
          transform: `translate(${state.state.viewport.position.x.toString()}px, ${state.state.viewport.position.y.toString()}px)`,
        }}
      >
        <Grid
          moving={state.state.viewport.moving}
          position={state.state.viewport.position}
          onMouseDown={() => {
            dispatch({ type: 'viewport-begin' });
          }}
          onMouseUp={() => {
            dispatch({ type: 'viewport-end' });
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
                : ComponentState.Default
            }
            onMouseDown={() => {
              dispatch({ type: 'move-begin', id });
            }}
            onMouseUp={() => {
              dispatch({ type: 'move-end' });
            }}
            onDoubleClick={() => {
              dispatch({ type: 'edit-begin', id });
            }}
            onEditDone={(text: string) => {
              dispatch({ type: 'edit-end', text });
            }}
          />
        ))}
      </g>
    </svg>
  );
}
