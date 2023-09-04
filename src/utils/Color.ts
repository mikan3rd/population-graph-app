export const generateColors = (num: number) => {
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
  ];

  const index = num % accessibleColors.length; // 余りを計算
  const hexColor = accessibleColors[index];

  if (hexColor === undefined) {
    throw new Error("hexColor is undefined");
  }

  // 商が1以上の場合、カラーコードの16進数に商の分だけ加算
  const quotient = Math.floor(num / accessibleColors.length);
  const hexWithoutHash = hexColor.slice(1); // 先頭の#を削除
  const intValue = parseInt(hexWithoutHash, 16);
  const incrementedValue = intValue + quotient * 80;

  const newHexColor = `#${incrementedValue.toString(16)}`;
  return newHexColor;
};
