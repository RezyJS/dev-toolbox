'use client';

import { Button } from '@/shared/ui/button';
import { TDecodeButton } from '../model/types';
import { checkBase64InputValidity, decodeBase64String } from '../lib/decoder';

export default function DecodeButton(props: TDecodeButton) {
  const { encodedString, setDecodedString } = props;

  const handleDecodeBase64String = () => {
    const valid = checkBase64InputValidity(encodedString);

    if (valid === false) {
      setDecodedString('Invalid input');
      return;
    }

    const resultString = decodeBase64String(encodedString);

    setDecodedString(resultString);
  };

  return (
    <Button onClick={handleDecodeBase64String}>Decode base64 string</Button>
  );
}
