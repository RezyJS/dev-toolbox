import { decToHex } from '@/shared/lib/HexConverters';
import { Button } from '@/shared/ui/button';
import { Slider } from '@/shared/ui/slider';
import { TextPlate } from '@/shared/ui/text-plate';
import { RotateCcw } from 'lucide-react';

type TRGBASelectorProps = {
  defaultValue: number;
  selectedColorDec: number;
  setSelectedColorDec: (value: number) => void;
  resetSelectedColorDec: () => void;
  text?: string;
};

export default function RGBASelector(props: TRGBASelectorProps) {
  const {
    selectedColorDec,
    setSelectedColorDec,
    resetSelectedColorDec,
    defaultValue,
    text,
  } = props;
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col'>
        <p>{text}</p>
        <div className='flex gap-2 items-center'>
          <Slider
            min={0}
            max={255}
            defaultValue={[defaultValue]}
            value={selectedColorDec}
            onValueChange={(e) => setSelectedColorDec(Number(e))}
            className='w-50!'
          />
          <Button
            disabled={selectedColorDec === defaultValue}
            onClick={resetSelectedColorDec}
          >
            <RotateCcw />
          </Button>

          <TextPlate text={decToHex(selectedColorDec)} />
        </div>
      </div>
    </div>
  );
}
