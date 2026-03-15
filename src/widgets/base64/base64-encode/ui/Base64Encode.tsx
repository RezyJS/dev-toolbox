'use client';

import { EncodeButton } from '@/features/base64-converter/encode';
import { Textarea } from '@/shared/ui/textarea';
import { useState } from 'react';

export default function Base64Encode() {
  const [decodedString, setDecodedString] = useState<string>('');
  const [encodedString, setEncodedString] = useState<string>('');

  return (
    <div className='flex flex-col flex-1 h-full gap-2'>
      <div className='flex flex-col gap-1'>
        <label
          htmlFor='base64-decoded-input'
          className='font-semibold'
        >
          Base64 Encoder
        </label>
        <Textarea
          id='base64-decoded-input'
          className='h-60'
          placeholder='some text here…'
          value={decodedString}
          onChange={(e) => setDecodedString(e.currentTarget.value)}
        />
      </div>
      <EncodeButton
        decodedString={decodedString}
        setEncodedString={setEncodedString}
      />
      <Textarea
        id='base64-decoded-output'
        className='h-60 opacity-100! cursor-text!'
        value={encodedString}
        disabled
      />
    </div>
  );
}
