export type IMovement = "A" | "G" | "D";
export type IOrientation = "N" | "S" | "E" | "W";

export interface IAdventurer {
  priority: number;
  name: string;
  orientation: IOrientation;
  position: { x: number; y: number };
  pattern: IMovement[];
  treasures: number;
}
