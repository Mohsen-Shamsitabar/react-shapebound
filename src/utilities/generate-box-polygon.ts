import { Box, type Polygon, Vector } from "sat-ts";

const generateBoxPolygon = (options: {
  x: number;
  y: number;
  width: number;
  height: number;
}): Polygon => {
  const { height, width, x, y } = options;

  const box = new Box(new Vector(x, y), width, height);
  const polygon = box.toPolygon();

  return polygon;
};

export default generateBoxPolygon;
