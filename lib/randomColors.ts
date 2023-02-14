function random(arr: Array<number | string>) {
  return Math.floor(Math.random() * arr.length);
}

function getRandomColor() {
  const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hex[random(hex)];
  }
  return color;
}

export default getRandomColor;
