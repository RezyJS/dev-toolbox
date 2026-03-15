import { fromBase64Map } from './consts';

export const fromBase64Letter = (letter: string) => fromBase64Map[letter];

export const toASCIILetters = (binaryString: string): string => {
  const ASCIILetters: string[] = [];

  for (let i = 0; i < binaryString.length - 7; i += 8) {
    const oneNum = binaryString.slice(i, i + 8);
    const decimal = parseInt(oneNum, 2);
    ASCIILetters.push(String.fromCharCode(decimal));
  }

  return ASCIILetters.join('');
};
