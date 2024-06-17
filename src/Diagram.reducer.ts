import { useReducer } from 'react';
import { DiagramData, Position } from './types';

type State = {
  data: DiagramData;
  state: DiagramState;
};

type DiagramState = {
  activeComponent: ComponentState | null;
  viewport: ViewportState;
};

type ComponentState = {
  id: string;
  delta: Position;
};

type ViewportState = {
  moving: boolean;
  position: Position;
};

type DiagramAction =
  | { type: 'move-begin'; id: string }
  | { type: 'move'; position: Position }
  | { type: 'move-end' }
  | { type: 'viewport-begin' }
  | { type: 'viewport-move'; position: Position }
  | { type: 'viewport-end' };

export default function useDiagram(initialData: DiagramData) {
  return useReducer(reducer, {
    data: initialData,
    state: {
      activeComponent: null,
      viewport: {
        moving: false,
        position: {
          x: 0,
          y: 0,
        },
      },
    },
  });
}

function reducer(state: State, action: DiagramAction): State {
  switch (action.type) {
    case 'move-begin':
      return {
        data: state.data,
        state: {
          ...state.state,
          activeComponent: {
            id: action.id,
            delta: {
              x: 0,
              y: 0,
            },
          },
        },
      };

    case 'move':
      if (state.state.activeComponent) {
        const activeId = state.state.activeComponent.id;
        const newComponent = { ...state.data.components[activeId] };
        newComponent.position = {
          x:
            newComponent.position.x +
            action.position.x -
            state.state.activeComponent.delta.x,
          y:
            newComponent.position.y +
            action.position.y -
            state.state.activeComponent.delta.y,
        };

        return {
          data: {
            ...state.data,
            components: {
              ...state.data.components,
              [activeId]: newComponent,
            },
          },
          state: {
            ...state.state,
            activeComponent: {
              ...state.state.activeComponent,
              delta: action.position,
            },
          },
        };
      } else {
        return state;
      }

    case 'move-end':
      return {
        ...state,
        state: {
          ...state.state,
          activeComponent: null,
        },
      };

    case 'viewport-begin':
      if (state.state.activeComponent) {
        return state;
      } else {
        return {
          ...state,
          state: {
            ...state.state,
            viewport: {
              ...state.state.viewport,
              moving: true,
            },
          },
        };
      }

    case 'viewport-move':
      if (state.state.viewport.moving) {
        return {
          ...state,
          state: {
            ...state.state,
            viewport: {
              ...state.state.viewport,
              position: {
                x: state.state.viewport.position.x + action.position.x,
                y: state.state.viewport.position.y + action.position.y,
              },
            },
          },
        };
      } else {
        return state;
      }

    case 'viewport-end':
      return {
        ...state,
        state: {
          ...state.state,
          viewport: {
            ...state.state.viewport,
            moving: false,
          },
        },
      };

    default:
      return state;
  }
}
