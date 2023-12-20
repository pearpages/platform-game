type Plan = string;

type ActorLavaChar = HorizontalLavaChar | VerticalLavaChar | DrippingLavaChar;
type ActorCoinChar = "o";
type ActorPlayerChar = "@";
type StaticLavaChar = "+";
type StaticWallChar = "#";
type StaticEmptyChar = ".";
type HorizontalLavaChar = "=";
type VerticalLavaChar = "|";
type DrippingLavaChar = "v";

type Char =
  | StaticEmptyChar
  | StaticWallChar
  | StaticLavaChar
  | ActorCoinChar
  | ActorLavaChar
  | ActorPlayerChar;
type StaticMapElement = StaticLavaChar | StaticWallChar | StaticEmptyChar;

export type {
  StaticMapElement,
  Plan,
  ActorLavaChar,
  Char,
  ActorPlayerChar,
  ActorCoinChar,
};
