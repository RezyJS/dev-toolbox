import { decToHex } from '@/shared/lib/HexConverters';
import { TextPlate } from '@/shared/ui/text-plate';

type TColorSquareProps = {
  selectedColor: Record<string, number>;
};

export default function ColorSquare(props: TColorSquareProps) {
  const { selectedColor } = props;
  return (
    <div className='w-1/2 h-full items-center flex flex-col gap-2'>
      <div
        className='w-100 h-100 border rounded-md'
        key={`rgba-square-${decToHex(selectedColor['red'])}-${decToHex(selectedColor['green'])}-${decToHex(selectedColor['blue'])}-${decToHex(selectedColor['alpha'])}`}
        style={{
          backgroundColor: `#${decToHex(selectedColor['red'])}${decToHex(selectedColor['green'])}${decToHex(selectedColor['blue'])}${decToHex(selectedColor['alpha'])}`,
        }}
      ></div>
      <TextPlate
        className='self-center'
        hasCopyButton
        canCopyOnClick
        text={`#${decToHex(selectedColor['red'])}${decToHex(selectedColor['green'])}${decToHex(selectedColor['blue'])}${decToHex(selectedColor['alpha'])}`}
      />
    </div>
  );
}
