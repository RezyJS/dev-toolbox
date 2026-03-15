import { Base64Decode } from '@/widgets/base64/base64-decode';
import { Base64Encode } from '@/widgets/base64/base64-encode';

export default function Base64Converter() {
  return (
    <div className='w-full h-full flex gap-4'>
      <Base64Encode />
      <Base64Decode />
    </div>
  );
}
