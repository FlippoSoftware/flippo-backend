export default (length: number = 1) => {
  if (length === 0) throw new Error("Length must be greater than 0.");

  const lowerBound = Number(`1${new Array(length - 1).fill(0).join("")}`);
  const upperBound = Number(`${new Array(length).fill(9).join("")}`);

  const code = Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound).toString();

  return code;
};
