'use client';

import { Button } from '@/shared/ui/button';
import { TEncodeButton } from '../model/types';
import { encodeBase64String } from '../lib/encoder';

export default function EncodeButton(props: TEncodeButton) {
  const { decodedString, setEncodedString } = props;

  const handleEncodeBase64String = () => {
    const resultString = encodeBase64String(decodedString);
    setEncodedString(resultString);
  };

  return (
    <Button onClick={handleEncodeBase64String}>Encode base64 string</Button>
  );
}
