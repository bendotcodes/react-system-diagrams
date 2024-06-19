import { useReducer } from 'react';
import { DiagramData, DiagramState, Position, AnchorPosition } from './types';

type State = {
  data: DiagramData;
  state: DiagramState;
};

type DiagramAction =
  | { type: 'move-begin'; id: string }
  | { type: 'viewport-begin' }
  | { type: 'mouseMove'; movement: Position }
  | { type: 'mouseUp' }
  | { type: 'mouseLeave' }
  | { type: 'edit-begin'; id: string }
  | { type: 'edit-end'; text: string }
  | { type: 'mouseWheel'; delta: number }
  | { type: 'scale-begin'; id: string; position: AnchorPosition };

export default function useDiagram(initialData: DiagramData) {
  return useReducer(reducer, {
    data: initialData,
    state: {
      position: {
        x: 0,
        y: 0,
      },
      zoom: 1,
      action: { type: 'None' },
      selected: [],
    },
  });
}

function reducer(state: State, action: DiagramAction): State {
  switch (action.type) {
    case 'move-begin':
      return {
        ...state,
        state: {
          ...state.state,
          action: { type: 'Moving' },
          selected: state.state.selected.length
            ? state.state.selected
            : [action.id],
        },
      };

    case 'mouseUp':
      if (
        state.state.action.type === 'Moving' ||
        state.state.action.type === 'ViewportMoving' ||
        state.state.action.type === 'Scaling'
      ) {
        return {
          ...state,
          state: {
            ...state.state,
            action: {
              type: 'None',
            },
          },
        };
      } else {
        return state;
      }

    case 'viewport-begin':
      if (state.state.action.type === 'None') {
        return {
          ...state,
          state: {
            ...state.state,
            action: { type: 'ViewportMoving' },
            selected: [],
          },
        };
      } else {
        return state;
      }

    case 'mouseMove':
      if (state.state.action.type === 'Moving') {
        const newComponents = {
          ...state.data.components,
        };

        state.state.selected.forEach((selectedId) => {
          newComponents[selectedId] = {
            ...newComponents[selectedId],
            position: {
              x:
                newComponents[selectedId].position.x +
                action.movement.x / state.state.zoom,
              y:
                newComponents[selectedId].position.y +
                action.movement.y / state.state.zoom,
            },
          };
        });

        return {
          ...state,
          data: {
            ...state.data,
            components: newComponents,
          },
        };
      } else if (state.state.action.type === 'Scaling') {
        const newComponents = {
          ...state.data.components,
        };

        const scalePosition = state.state.action.anchor;

        state.state.selected.forEach((selectedId) => {
          const xModifier = action.movement.x / state.state.zoom;
          const yModifier = action.movement.y / state.state.zoom;

          newComponents[selectedId] = {
            ...newComponents[selectedId],
            position: {
              x:
                newComponents[selectedId].position.x +
                (scalePosition === AnchorPosition.TopLeft ||
                scalePosition === AnchorPosition.BottomLeft
                  ? xModifier
                  : 0),
              y:
                newComponents[selectedId].position.y +
                (scalePosition === AnchorPosition.TopLeft ||
                scalePosition === AnchorPosition.TopRight
                  ? yModifier
                  : 0),
            },
            size: {
              width: Math.max(
                30,
                newComponents[selectedId].size.width +
                  (scalePosition === AnchorPosition.TopRight ||
                  scalePosition === AnchorPosition.BottomRight
                    ? xModifier
                    : -xModifier),
              ),
              height: Math.max(
                30,
                newComponents[selectedId].size.height +
                  (scalePosition === AnchorPosition.BottomLeft ||
                  scalePosition === AnchorPosition.BottomRight
                    ? yModifier
                    : -yModifier),
              ),
            },
          };
        });

        return {
          ...state,
          data: {
            ...state.data,
            components: newComponents,
          },
        };
      } else if (state.state.action.type === 'ViewportMoving') {
        return {
          ...state,
          state: {
            ...state.state,
            position: {
              x: state.state.position.x + action.movement.x,
              y: state.state.position.y + action.movement.y,
            },
          },
        };
      } else {
        return state;
      }

    case 'mouseLeave':
      if (
        state.state.action.type === 'ViewportMoving' ||
        state.state.action.type === 'Moving'
      ) {
        return {
          ...state,
          state: {
            ...state.state,
            action: { type: 'None' },
          },
        };
      } else {
        return state;
      }

    case 'edit-begin':
      return {
        ...state,
        state: {
          ...state.state,
          action: { type: 'Editing' },
        },
      };

    case 'edit-end':
      if (
        state.state.action.type === 'Editing' &&
        state.state.selected.length
      ) {
        const activeId = state.state.selected[0];
        const newComponent = { ...state.data.components[activeId] };
        newComponent.name = action.text;

        return {
          ...state,
          data: {
            ...state.data,
            components: {
              ...state.data.components,
              [activeId]: newComponent,
            },
          },
          state: {
            ...state.state,
            action: { type: 'None' },
            selected: [],
          },
        };
      } else {
        return state;
      }

    case 'mouseWheel':
      return {
        ...state,
        state: {
          ...state.state,
          zoom: state.state.zoom + 0.0025 * action.delta,
        },
      };

    case 'scale-begin':
      return {
        ...state,
        state: {
          ...state.state,
          action: { type: 'Scaling', anchor: action.position },
        },
      };

    default:
      return state;
  }
}
