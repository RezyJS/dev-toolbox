export const toBinary = (numToConvert: number): string => {
  const binaryNum: number[] = [];
  let numCopy = numToConvert;
  while (numCopy > 0) {
    binaryNum.unshift(numCopy % 2);
    numCopy = Math.floor(numCopy / 2);
  }
  while (binaryNum.length < 6) {
    binaryNum.unshift(0);
  }
  return binaryNum.join('');
};
