'use client';

import { decToHex, hexToDec } from '@/shared/lib/HexConverters';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/shared/ui/input';
import { decodeBase64String } from '@/features/base64-converter/decode/lib/decoder';
import { encodeBase64String } from '@/features/base64-converter/encode/lib/encoder';
import { TextPlate } from '@/shared/ui/text-plate';

type TColor = { r: number; g: number; b: number; a: number };
type TMouseValue = { x: number; y: number };
type CanvasEvent = React.MouseEvent<HTMLCanvasElement>;
type TColorChannel = keyof TColor;

const COLOR_CHANNELS: TColorChannel[] = ['r', 'g', 'b', 'a'];

const convertToRGBAText = (color: TColor): string => {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a / 255})`;
};

const convertToHexText = (color: TColor): string => {
  const hexRed = decToHex(color.r);
  const hexGreen = decToHex(color.g);
  const hexBlue = decToHex(color.b);
  const hexAlpha = decToHex(color.a);

  return `${hexRed}${hexGreen}${hexBlue}${hexAlpha}`;
};

const makeGradientBG = ({
  canvas,
  mouseX,
  mouseY,
  color,
}: {
  canvas: HTMLCanvasElement;
  mouseX: number;
  mouseY: number;
  color: TColor;
}) => {
  const width = canvas.width;
  const height = canvas.height;

  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = convertToRGBAText(color);
  ctx.fillRect(0, 0, width, height);

  const whiteGradient = ctx.createLinearGradient(0, 0, width, 0);
  whiteGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  whiteGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = whiteGradient;
  ctx.fillRect(0, 0, width, height);

  const blackGradient = ctx.createLinearGradient(0, 0, 0, height);
  blackGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  blackGradient.addColorStop(1, 'rgba(0, 0, 0, 1)');

  ctx.fillStyle = blackGradient;
  ctx.fillRect(0, 0, width, height);

  ctx.beginPath();
  ctx.arc(mouseX, mouseY, 6, 0, Math.PI * 2);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(mouseX, mouseY, 8, 0, Math.PI * 2);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.stroke();
};

// const color: Record<string, TColor> = {
//   'red': { r: 255, g: 0, b: 0, a: 255 },
//   'orange': { r: 255, g: 127, b: 0, a: 255 },
//   'yellow': { r: 255, g: 255, b: 0, a: 255 },
//   'green': { r: 0, g: 255, b: 0, a: 255 },
//   'light blue': { r: 0, g: 255, b: 255, a: 255 },
//   'blue': { r: 0, g: 0, b: 255, a: 255 },
//   'purple': { r: 148, g: 0, b: 211, a: 255 },
// };

const DEFAULT_DECODED_BASE_COLOR = 'FF0000FF';
const DECODED_DEFAULT_SEPARATOR = '$';
const DEFAULT_DECODED_MOUSE_XY = '0' + DECODED_DEFAULT_SEPARATOR + '0';

const parseBaseColor = (decodedBaseColor: string) => {
  const colors = [];

  for (let i = 0; i < 8; i += 2) {
    colors.push(hexToDec(decodedBaseColor.slice(i, i + 2)));
  }

  const namedColors = {
    r: colors[0],
    g: colors[1],
    b: colors[2],
    a: colors[3],
  };

  return namedColors;
};

const parseMouse = (decodedMouseXY: string) => {
  return decodedMouseXY
    .split(DECODED_DEFAULT_SEPARATOR)
    .map((val) => Number(val));
};

const serialize = (separator: string, ...value: unknown[]) => {
  return value.join(separator);
};

export default function Test() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const encodedBaseColor = searchParams.get('base');
  const encodedMouseXY = searchParams.get('mouse');

  const decodedBaseColor =
    encodedBaseColor ?
      decodeBase64String(encodedBaseColor)
    : DEFAULT_DECODED_BASE_COLOR;

  const decodedMouseXY =
    encodedMouseXY ?
      decodeBase64String(encodedMouseXY)
    : DEFAULT_DECODED_MOUSE_XY;

  const baseColor: TColor = parseBaseColor(decodedBaseColor);
  const [mouseX, mouseY] = parseMouse(decodedMouseXY);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedColor, setSelectedColor] = useState<TColor>(baseColor);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const changeQuery = (param: string, value: string) => {
    const encodedValue = encodeBase64String(value);

    const params = new URLSearchParams(searchParams.toString());
    params.set(param, encodedValue);

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleChangeMouseValue = (value: TMouseValue) => {
    changeQuery(
      'mouse',
      serialize(DECODED_DEFAULT_SEPARATOR, value.x, value.y),
    );
  };

  const handleSelectColor = async (e: CanvasEvent) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const pixel = ctx.getImageData(x, y, 1, 1);
    const [r, g, b, a] = pixel.data;

    setSelectedColor({ r, g, b, a });
    handleChangeMouseValue({ x, y });
  };

  const handleChangeBaseColor = (param: string, value: string) => {
    const numValue = Number(value);

    if (isNaN(numValue) || numValue < 0 || numValue > 255) return;

    const newValue = convertToHexText({
      ...baseColor,
      [param]: numValue,
    });

    changeQuery('base', newValue);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    makeGradientBG({
      canvas,
      mouseX,
      mouseY,
      color: baseColor,
    });
  }, [baseColor, mouseX, mouseY]);

  const handleOnPointerDown = (e: CanvasEvent) => {
    setIsDragging(true);
    handleSelectColor(e);
  };

  const handleOnPointerMove = (e: CanvasEvent) => {
    if (!isDragging) return;

    handleSelectColor(e);
  };

  const handleOnPointerLeave = () => {
    setIsDragging(false);
  };

  const handleOnPointerUp = () => {
    setIsDragging(false);
  };

  // TODO: показывать отдельно rgba выбранного цвета и rgba выбиралки

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col gap-5'>
        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          className='w-150 h-75'
          onPointerDown={handleOnPointerDown}
          onPointerMove={handleOnPointerMove}
          onPointerLeave={handleOnPointerLeave}
          onPointerUp={handleOnPointerUp}
        ></canvas>
        <div className='flex gap-5 justify-center items-center'>
          <div
            className='rounded w-5 h-5 border border-black'
            style={{
              backgroundColor: convertToRGBAText(selectedColor),
            }}
          ></div>
          <TextPlate
            className='self-center'
            hasCopyButton
            canCopyOnClick
            text={`#${convertToHexText(selectedColor)}`}
          />
        </div>
        <div className='grid grid-cols-4 gap-5 self-center'>
          {COLOR_CHANNELS.map((colorName) => (
            <div
              key={`Input-group-current-color-${colorName}`}
              className='flex items-center h-max gap-2'
            >
              <label
                htmlFor={`InputColor${colorName}`}
                className='font-semibold text-lg'
              >
                {colorName.toUpperCase()}
              </label>
              <Input
                id={`InputColor${colorName}`}
                className='w-10'
                value={String(baseColor[colorName])}
                onChange={(e) =>
                  handleChangeBaseColor(colorName, e.currentTarget.value)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
