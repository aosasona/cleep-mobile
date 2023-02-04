export function generateRandomColor(opacity: number = 1) {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return `rgba(${parseInt(color.substring(1, 3), 16)}, ${parseInt(
    color.substring(3, 5),
    16
  )}, ${parseInt(color.substring(5, 7), 16)}, ${opacity})`;
}
