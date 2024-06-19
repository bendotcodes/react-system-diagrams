export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type ComponentData = {
  name: string;
  position: Position;
  size: Size;
};

export type DiagramState = {
  position: Position;
  zoom: number;
  action: ActionState;
  selected: string[];
};

export type ActionState =
  | { type: 'None' }
  | { type: 'Moving' }
  | { type: 'ViewportMoving' }
  | { type: 'Editing' }
  | { type: 'Scaling'; anchor: AnchorPosition };

export type DiagramData = {
  components: Record<string, ComponentData>;
};

export enum AnchorPosition {
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight,
}
