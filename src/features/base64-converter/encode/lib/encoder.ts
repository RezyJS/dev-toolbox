import { toBinary } from '@/shared/lib/toBinary';
import { divideInto6Bits, toBase64Letter } from './converters';

export const encodeBase64String = (encodeString: string): string => {
  const letters = encodeString.split('');

  const numbers = letters.map((letter) => letter.charCodeAt(0));
  const binaryNumbers = numbers.map((num) => toBinary(num).padStart(8, '0'));

  const binaryString = binaryNumbers.join('');

  const unformattedBase64NumbersBinary = divideInto6Bits(binaryString);

  const base64NumbersBinary = unformattedBase64NumbersBinary.map(
    (number) => '00' + number,
  );

  const base64Numbers = base64NumbersBinary.map((number) =>
    parseInt(number, 2),
  );

  const encodedString = base64Numbers.map((number) => toBase64Letter(number));

  return encodedString.join('');
};
