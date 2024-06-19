import { useReducer } from 'react';
import {
  ComponentState,
  DiagramData,
  Position,
  ScalePosition,
  ViewportState,
} from './types';

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
  scalePosition?: ScalePosition;
};

type DiagramAction =
  | { type: 'move-begin'; id: string }
  | { type: 'viewport-begin' }
  | { type: 'move'; position: Position }
  | { type: 'mouse-up' }
  | { type: 'leave' }
  | { type: 'edit-begin'; id: string }
  | { type: 'edit-end'; text: string }
  | { type: 'zoom-in'; value: number }
  | { type: 'zoom-out'; value: number }
  | { type: 'scale-begin'; id: string; position: ScalePosition };

export default function useDiagram(initialData: DiagramData) {
  return useReducer(reducer, {
    data: initialData,
    state: {
      activeComponent: null,
      viewport: {
        moving: false,
        zoom: 1,
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
        ...state,
        state: {
          ...state.state,
          activeComponent: {
            id: action.id,
            state: ComponentState.Moving,
          },
        },
      };

    case 'mouse-up':
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
      } else if (state.state.activeComponent) {
        return {
          ...state,
          state: {
            ...state.state,
            activeComponent: {
              ...state.state.activeComponent,
              state: ComponentState.Selected,
            },
          },
        };
      } else {
        return state;
      }

    case 'viewport-begin':
      return {
        ...state,
        state: {
          ...state.state,
          activeComponent: null,
          viewport: {
            ...state.state.viewport,
            moving: true,
          },
        },
      };

    case 'move':
      if (state.state.activeComponent?.state === ComponentState.Moving) {
        const activeId = state.state.activeComponent.id;
        const newComponent = { ...state.data.components[activeId] };
        newComponent.position = {
          x:
            newComponent.position.x +
            action.position.x / state.state.viewport.zoom,
          y:
            newComponent.position.y +
            action.position.y / state.state.viewport.zoom,
        };

        return {
          ...state,
          data: {
            ...state.data,
            components: {
              ...state.data.components,
              [activeId]: newComponent,
            },
          },
        };
      } else if (
        state.state.activeComponent?.state === ComponentState.Scaling
      ) {
        const activeId = state.state.activeComponent.id;
        const newComponent = { ...state.data.components[activeId] };
        const scalePosition = state.state.activeComponent.scalePosition;

        const xModifier = action.position.x / state.state.viewport.zoom;
        const yModifier = action.position.y / state.state.viewport.zoom;

        newComponent.position = {
          x:
            newComponent.position.x +
            (scalePosition === ScalePosition.TopLeft ||
            scalePosition === ScalePosition.BottomLeft
              ? xModifier
              : 0),
          y:
            newComponent.position.y +
            (scalePosition === ScalePosition.TopLeft ||
            scalePosition === ScalePosition.TopRight
              ? yModifier
              : 0),
        };
        newComponent.size = {
          width:
            newComponent.size.width +
            (scalePosition === ScalePosition.TopRight ||
            scalePosition === ScalePosition.BottomRight
              ? xModifier
              : -xModifier),
          height:
            newComponent.size.height +
            (scalePosition === ScalePosition.BottomLeft ||
            scalePosition === ScalePosition.BottomRight
              ? yModifier
              : -yModifier),
        };

        if (newComponent.size.width < 30 || newComponent.size.height < 30) {
          return state;
        }

        return {
          ...state,
          data: {
            ...state.data,
            components: {
              ...state.data.components,
              [activeId]: newComponent,
            },
          },
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
      } else if (state.state.activeComponent?.state === ComponentState.Moving) {
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
        ...state,
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
            activeComponent: null,
          },
        };
      } else {
        return state;
      }

    case 'zoom-in':
      return {
        ...state,
        state: {
          ...state.state,
          viewport: {
            ...state.state.viewport,
            zoom: state.state.viewport.zoom + 0.05 * action.value,
          },
        },
      };

    case 'zoom-out':
      return {
        ...state,
        state: {
          ...state.state,
          viewport: {
            ...state.state.viewport,
            zoom: Math.max(
              0.05,
              state.state.viewport.zoom - 0.05 * action.value,
            ),
          },
        },
      };

    case 'scale-begin':
      return {
        ...state,
        state: {
          ...state.state,
          activeComponent: {
            id: action.id,
            state: ComponentState.Scaling,
            scalePosition: action.position,
          },
        },
      };

    case 'scale-end':
      if (state.state.activeComponent?.state === ComponentState.Scaling) {
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

    default:
      return state;
  }
}
