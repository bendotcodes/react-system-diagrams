import { useReducer } from 'react';
import { ComponentState, DiagramData, Position } from './types';

type State = {
  data: DiagramData;
  state: DiagramState;
};

type DiagramState = {
  activeComponent: ActiveComponent | null;
  viewport: ViewportState;
};

type ActiveComponent = {
  id: string;
  state: ComponentState;
};

type ViewportState = {
  moving: boolean;
  position: Position;
};

type DiagramAction =
  | { type: 'move-begin'; id: string }
  | { type: 'move-end' }
  | { type: 'viewport-begin' }
  | { type: 'viewport-end' }
  | { type: 'move'; position: Position }
  | { type: 'leave' }
  | { type: 'edit-begin'; id: string }
  | { type: 'edit-end'; text: string };

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
      if (state.state.activeComponent) {
        return state;
      } else {
        return {
          data: state.data,
          state: {
            ...state.state,
            activeComponent: {
              id: action.id,
              state: ComponentState.Moving,
            },
          },
        };
      }

    case 'move-end':
      if (state.state.activeComponent?.state === ComponentState.Moving) {
        return {
          ...state,
          state: {
            ...state.state,
            activeComponent: null,
          },
        };
      } else {
        return state;
      }

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

    case 'viewport-end':
      if (state.state.viewport.moving) {
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
      } else {
        return state;
      }

    case 'move':
      if (state.state.activeComponent?.state === ComponentState.Moving) {
        const activeId = state.state.activeComponent.id;
        const newComponent = { ...state.data.components[activeId] };
        newComponent.position = {
          x: newComponent.position.x + action.position.x,
          y: newComponent.position.y + action.position.y,
        };

        return {
          data: {
            ...state.data,
            components: {
              ...state.data.components,
              [activeId]: newComponent,
            },
          },
          state: state.state,
        };
      } else if (state.state.viewport.moving) {
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

    case 'leave':
      if (state.state.activeComponent?.state === ComponentState.Moving) {
        return {
          ...state,
          state: {
            ...state.state,
            activeComponent: null,
            viewport: {
              ...state.state.viewport,
              moving: false,
            },
          },
        };
      } else {
        return state;
      }

    case 'edit-begin':
      return {
        data: state.data,
        state: {
          ...state.state,
          activeComponent: {
            id: action.id,
            state: ComponentState.Editing,
          },
        },
      };

    case 'edit-end':
      if (state.state.activeComponent?.state === ComponentState.Editing) {
        const activeId = state.state.activeComponent.id;
        const newComponent = { ...state.data.components[activeId] };
        newComponent.name = action.text;

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
            activeComponent: null,
          },
        };
      } else {
        return state;
      }

    default:
      return state;
  }
}
