export type Position = {
  x: number;
  y: number;
};

export type ComponentData = {
  name: string;
  position: Position;
};

export type DiagramData = {
  components: Record<string, ComponentData>;
};
