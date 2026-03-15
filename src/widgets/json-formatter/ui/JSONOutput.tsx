import { Textarea } from '@/shared/ui/textarea';
import { TJSONOutput } from '../model/types';

export default function JSONOutput(props: TJSONOutput) {
  const { formattedJSON } = props;

  return (
    <div className='flex min-h-0 min-w-0 flex-1 flex-col gap-2'>
      <label
        htmlFor='json-output-formatted'
        className='shrink-0 font-semibold'
      >
        Formatted JSON
      </label>
      <Textarea
        id='json-output-formatted'
        className='h-full min-h-0 min-w-0 flex-1 cursor-text! opacity-100!'
        value={formattedJSON}
        disabled
      />
    </div>
  );
}
