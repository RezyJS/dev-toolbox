import { TestWidget } from '@/widgets/color-converter';
import { Suspense } from 'react';

export default function ColorConverterPage() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Suspense fallback={<p>Loading...</p>}>
        <TestWidget />
      </Suspense>
    </div>
  );
}
