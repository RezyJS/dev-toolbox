import { RGBASelector } from '@/features/color-converter/rgba-input';
import { SetStateAction } from 'react';

type TRGBSelectorProps = {
  defaultColor: Record<string, number>;
  selectedColor: Record<string, number>;
  setSelectedColor: (value: SetStateAction<Record<string, number>>) => void;
};

const colors = ['red', 'green', 'blue', 'alpha'];

export default function RGBSelector(props: TRGBSelectorProps) {
  const { defaultColor, selectedColor, setSelectedColor } = props;

  return (
    <div>
      {colors.map((color: string) => (
        <RGBASelector
          key={`RGBASelector-color-${color}`}
          text={color}
          defaultValue={defaultColor[color]}
          selectedColorDec={selectedColor[color]}
          setSelectedColorDec={(value: number) =>
            setSelectedColor((prev) => ({ ...prev, [color]: value }))
          }
          resetSelectedColorDec={() =>
            setSelectedColor((prev) => ({
              ...prev,
              [color]: defaultColor[color],
            }))
          }
        />
      ))}
    </div>
  );
}
