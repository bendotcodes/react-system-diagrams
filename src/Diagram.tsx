import { css } from '@emotion/css';

import { DiagramData, AnchorPosition } from './types';
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
          type: 'mouseMove',
          movement: {
            x: e.movementX,
            y: e.movementY,
          },
        });
      }}
      onMouseUp={() => {
        dispatch({
          type: 'mouseUp',
        });
      }}
      onMouseLeave={() => {
        dispatch({
          type: 'mouseLeave',
        });
      }}
      onWheel={(e) => {
        dispatch({
          type: 'mouseWheel',
          delta: e.deltaY,
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
          transform: `translate(${state.state.position.x.toString()}px, ${state.state.position.y.toString()}px) scale(${state.state.zoom.toString()}, ${state.state.zoom.toString()})`,
        }}
      >
        <Grid
          position={state.state.position}
          zoom={state.state.zoom}
          moving={state.state.action.type === 'ViewportMoving'}
          onMouseDown={() => {
            dispatch({ type: 'viewport-begin' });
          }}
        />
        {Object.keys(state.data.components).map((id) => (
          <Component
            key={id}
            id={id}
            data={state.data.components[id]}
            editing={
              state.state.selected.includes(id) &&
              state.state.action.type === 'Editing'
            }
            selected={state.state.selected.includes(id)}
            onMouseDown={() => {
              dispatch({ type: 'move-begin', id });
            }}
            onDoubleClick={() => {
              dispatch({ type: 'edit-begin', id });
            }}
            onEdit={(text: string) => {
              dispatch({ type: 'edit-end', text });
            }}
            onScaleBegin={(position: AnchorPosition) => {
              dispatch({ type: 'scale-begin', id, position });
            }}
          />
        ))}
      </g>
    </svg>
  );
}
