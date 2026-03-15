import { toBase64Map } from './consts';

export const toBase64Letter = (value: number) => toBase64Map[value];

export const divideInto6Bits = (binaryString: string): string[] => {
  const bits: string[] = [];

  for (let i = 0; i < binaryString.length - 5; i += 6) {
    bits.push(binaryString.slice(i, i + 6));
  }

  const remainder = binaryString.length % 6;
  if (remainder > 0) {
    bits.push(binaryString.slice(binaryString.length - remainder));
    bits[bits.length - 1] = bits[bits.length - 1].padEnd(6, '0');
  }

  return bits;
};
