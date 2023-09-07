import { SymbolKeyValue } from "highcharts";

const accessibleColors = [
  "#0074D9", // Blue
  "#FF4136", // Red
  "#2ECC40", // Green
  "#FF851B", // Orange
  "#001f3f", // Navy
  "#39CCCC", // Teal
  "#FFDC00", // Yellow
  "#7FDBFF", // Light Blue
  "#01FF70", // Lime
  "#FFD700", // Gold
  "#FF69B4", // Pink
];

export const generateColor = (num: number) => {
  const index = num % accessibleColors.length;
  const color = accessibleColors[index];

  if (color === undefined) {
    throw new Error("hexColor is undefined");
  }

  return color;
};

const symbolArray: SymbolKeyValue[] = ["circle", "square", "diamond", "triangle", "triangle-down"];

export const generateSymbol = (num: number) => {
  const index = num % symbolArray.length;
  const symbol = symbolArray[index];

  if (symbol === undefined) {
    throw new Error("symbol is undefined");
  }

  return symbol;
};
