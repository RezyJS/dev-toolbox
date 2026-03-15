import { toBinary } from '@/shared/lib/toBinary';
import { fromBase64Letter, toASCIILetters } from './converters';

export const checkBase64InputValidity = (text: string): boolean => {
  if (text.length === 0) return false;
  if (text.length % 4 === 1) return false;
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(text)) return false;
  if (text.includes('=') && text.length % 4 !== 0) return false;

  return true;
};

export const decodeBase64String = (decodeString: string): string => {
  const remainder = decodeString.length % 4;
  const base64Letters = decodeString.split('');
  const paddingToAdd = (4 - remainder) % 4;

  for (let i = 0; i < paddingToAdd; ++i) {
    base64Letters.push('=');
  }

  let padding = 0;
  for (let i = base64Letters.length - 1; base64Letters[i] === '='; i -= 1) {
    padding += 1;
  }

  const fixedBase64Letters = base64Letters.slice(
    0,
    base64Letters.length - padding,
  );

  const base64MappedLetters = fixedBase64Letters.map((letter) =>
    fromBase64Letter(letter),
  );

  const base64BinaryLetters = base64MappedLetters
    .map((num) => toBinary(num))
    .join('');

  const base64ConcatBinVals = base64BinaryLetters.slice(
    0,
    base64BinaryLetters.length - padding * 2,
  );

  const base64decoded = toASCIILetters(base64ConcatBinVals);

  return base64decoded;
};
