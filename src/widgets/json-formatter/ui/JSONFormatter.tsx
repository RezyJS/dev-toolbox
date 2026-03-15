'use client';

import { useState } from 'react';
import JSONInput from './JSONInput';
import JSONOutput from './JSONOutput';

export default function JSONFormatter() {
  const [formattedJSON, setFormattedJSON] = useState<string>('{}');

  return (
    <div className='flex h-full min-h-0 w-full min-w-0 gap-5'>
      <JSONInput setFormattedJSON={setFormattedJSON} />
      <JSONOutput formattedJSON={formattedJSON} />
    </div>
  );
}
