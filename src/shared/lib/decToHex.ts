const toHexDigit: Record<number, string> = {
  10: 'A',
  11: 'B',
  12: 'C',
  13: 'D',
  14: 'E',
  15: 'F',
};

export const decToHex = (decNum: number): string => {
  if (decNum === 0) return '00';

  const hexNumber: string[] = [];

  for (let i = decNum; i > 0; i = Math.floor(i / 16)) {
    const division = i % 16;
    const hexDigit = division > 9 ? toHexDigit[division] : String(division);
    hexNumber.unshift(hexDigit);
  }

  if (hexNumber.length < 2) {
    hexNumber.unshift('0');
  }

  return hexNumber.join('');
};
