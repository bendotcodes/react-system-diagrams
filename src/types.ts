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

export type ViewportState = {
  moving: boolean;
  position: Position;
  zoom: number;
};

export enum ComponentState {
  None,
  Selected,
  Moving,
  Editing,
  Scaling,
}

export type DiagramData = {
  components: Record<string, ComponentData>;
};

export enum ScalePosition {
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight,
}
