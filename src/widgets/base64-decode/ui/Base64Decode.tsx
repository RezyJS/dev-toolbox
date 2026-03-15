'use client';

import { Textarea } from '@/shared/ui/textarea';
import { useState } from 'react';
import { DecodeButton } from '@/features/base64-converter/decode';

export default function Base64Decode() {
  const [encodedString, setEncodedString] = useState<string>('');
  const [decodedString, setDecodedString] = useState<string>('');

  return (
    <div className='flex flex-col flex-1 h-full gap-2'>
      <div className='flex flex-col gap-1'>
        <label htmlFor='base64-encoded-input'>Base64 Decoder</label>
        <Textarea
          id='base64-encoded-input'
          className='h-60'
          value={encodedString}
          onChange={(e) => setEncodedString(e.currentTarget.value)}
        />
      </div>
      <DecodeButton
        encodedString={encodedString}
        setDecodedString={setDecodedString}
      />
      <Textarea
        id='base64-decoded-output'
        className='h-60 opacity-100! cursor-text!'
        value={decodedString}
        disabled
      />
    </div>
  );
}
