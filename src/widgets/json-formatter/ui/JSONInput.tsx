'use client';

import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import {
  minifyJSON,
  prettifyJSON,
  verifyJSON,
} from '@/features/json-formatter';
import { TJSONInput } from '../model/types';

export default function JSONInput(props: TJSONInput) {
  const { setFormattedJSON } = props;

  const [json, setJSON] = useState<string>('{}');

  const handleVerifyJSON = () => {
    const { text } = verifyJSON(json);
    setFormattedJSON(text);
  };

  const handlePrettifyJSON = () => {
    const result = prettifyJSON(json);
    setFormattedJSON(result);
  };

  const handleMinifyJSON = () => {
    const result = minifyJSON(json);
    setFormattedJSON(result);
  };

  return (
    <div className='flex min-h-0 min-w-0 flex-1 flex-col gap-2'>
      <div className='flex shrink-0 justify-between'>
        <label
          htmlFor='json-input'
          className='font-semibold'
        >
          JSON Formatter
        </label>
        <div className='flex justify-end gap-2'>
          <Button
            className='text-md px-3 py-3 font-semibold'
            onClick={handleVerifyJSON}
          >
            Verify
          </Button>
          <Button
            className='text-md px-3 py-3 font-semibold'
            onClick={handlePrettifyJSON}
          >
            Pretty
          </Button>
          <Button
            className='text-md px-3 py-3 font-semibold'
            onClick={handleMinifyJSON}
          >
            Minify
          </Button>
        </div>
      </div>
      <Textarea
        id='json-input'
        className='h-full min-h-0 min-w-0 flex-1'
        value={json}
        onChange={(e) => setJSON(e.currentTarget.value)}
      />
    </div>
  );
}
