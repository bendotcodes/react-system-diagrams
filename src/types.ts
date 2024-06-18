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

export enum ComponentState {
  Default,
  Moving,
  Editing,
}

export type DiagramData = {
  components: Record<string, ComponentData>;
};
