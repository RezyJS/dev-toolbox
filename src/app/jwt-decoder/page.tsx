'use client';

import { decodeBase64String } from '@/features/base64-converter/decode/lib/decoder';
import { prettifyJSON } from '@/features/json-formatter';
import { Button } from '@/shared/ui/button';
import { Textarea } from '@/shared/ui/textarea';
import { useState } from 'react';

export default function JWTDecoder() {
  const [jwt, setJWT] = useState<string>('');
  const [decodedJWT, setDecodedJWT] = useState<{
    header?: string;
    payload?: string;
    text?: string;
  }>({
    header: '',
    payload: '',
  });

  const handleDecodeJWT = () => {
    const formattedJWT = jwt.replaceAll('-', '+').replace('_', '/');
    const parts = formattedJWT.split('.');

    if (parts.length < 3) {
      setDecodedJWT({ text: 'Invalid JWT' });
      return;
    }

    const [header, payload] = parts;

    const decodedHeader = decodeBase64String(header);
    const decodedPayload = decodeBase64String(payload);

    const prettyHeader = prettifyJSON(decodedHeader);
    const prettyPayload = prettifyJSON(decodedPayload);

    setDecodedJWT({ header: prettyHeader, payload: prettyPayload });
  };

  return (
    <div className='flex h-full min-h-0 w-full min-w-0 gap-5'>
      <div className='flex min-h-0 min-w-0 flex-1 flex-col gap-2'>
        <div className='flex justify-between'>
          <label
            htmlFor='json-output-formatted'
            className='shrink-0 font-semibold'
          >
            JWT Decoder
          </label>
          <Button onClick={handleDecodeJWT}>Decode</Button>
        </div>
        <Textarea
          id='json-output-formatted'
          className='h-full min-h-0 min-w-0 flex-1 cursor-text! opacity-100!'
          value={jwt}
          onChange={(e) => setJWT(e.currentTarget.value)}
        />
      </div>
      <div className='flex min-h-0 min-w-0 flex-1 flex-col gap-2'>
        <label
          htmlFor='json-output-formatted-header'
          className='shrink-0 font-semibold'
        >
          Decoded header
        </label>
        <Textarea
          id='json-output-formatted-header'
          className='h-full min-h-0 min-w-0 flex-1 cursor-text! opacity-100!'
          value={decodedJWT.header}
          disabled
        />
        <label
          htmlFor='json-output-formatted-payload'
          className='shrink-0 font-semibold'
        >
          Decoded payload
        </label>
        <Textarea
          id='json-output-formatted-payload'
          className='h-full min-h-0 min-w-0 flex-1 cursor-text! opacity-100!'
          value={decodedJWT.payload}
          disabled
        />
      </div>
    </div>
  );
}
