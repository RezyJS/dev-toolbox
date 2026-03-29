const toHexDigit: Record<number, string> = {
  10: 'a',
  11: 'b',
  12: 'c',
  13: 'd',
  14: 'e',
  15: 'f',
};

const toDecNumber: Record<string, number> = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'a': 10,
  'b': 11,
  'c': 12,
  'd': 13,
  'e': 14,
  'f': 15,
};

export const hexToDec = (hexNum: string): number => {
  const _hexNum = hexNum.length === 1 ? `${hexNum}${hexNum}` : hexNum;

  const digits = _hexNum.split('').map((digit, index) => {
    return {
      digit,
      index: _hexNum.length - index - 1,
    };
  });

  let answer = 0;

  for (let i = 0; i < digits.length; ++i) {
    answer +=
      toDecNumber[digits[i].digit.toLowerCase()] *
      Math.pow(16, digits[i].index);
  }

  return answer;
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
