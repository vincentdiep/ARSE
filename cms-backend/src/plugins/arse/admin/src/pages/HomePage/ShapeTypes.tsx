export interface ShapePosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Shape {
  name: string;
  shape: string;
  color: string;
  pos: ShapePosition;
}
