'use client';

import { useState } from 'react';
import { Button } from './button';
import { Copy, CopyCheck } from 'lucide-react';
import { cn } from '../lib/utils';

type TTextPlate = {
  hasLabel?: boolean;
  label?: string;
  text?: string;
  canCopyOnClick?: boolean;
  hasCopyButton?: boolean;
  className?: string;
};

const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

export function TextPlate(props: TTextPlate) {
  const {
    text = '',
    canCopyOnClick = false,
    label = '',
    hasLabel = false,
    hasCopyButton = false,
    className = '',
  } = props;
  const [isCopying, setIsCopying] = useState(false);

  const handleCopyText = async () => {
    if (isCopying) return;

    setIsCopying(true);
    const success = await copyToClipboard(text);

    // TODO: make toasts
    if (success) {
      console.log('copied to clipboard.');
    } else {
      console.log('error while trying to copy.');
    }

    setTimeout(() => setIsCopying(false), 2000);
  };

  const handleCopyOnClick = () => {
    if (canCopyOnClick === false) return;
    handleCopyText();
  };

  return (
    <div className={cn('flex flex-col', className)}>
      {hasLabel && <p>{label}</p>}
      <div className='flex gap-2 items-center'>
        <div
          className='border rounded-md px-4 py-1 hover:bg-gray-100'
          onClick={handleCopyOnClick}
        >
          <p className='font-semibold'>{text}</p>
        </div>
        {hasCopyButton && (
          <Button
            variant='outline'
            onClick={handleCopyText}
          >
            {isCopying ?
              <CopyCheck />
            : <Copy />}
          </Button>
        )}
      </div>
    </div>
  );
}
