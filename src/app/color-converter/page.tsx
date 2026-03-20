'use client';

import { ColorSquare } from '@/features/color-converter/color-showcase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { RGBSelector } from '@/widgets/color-converter';
import { useState } from 'react';

const defaultColor = { red: 0, green: 0, blue: 0, alpha: 255 };

export default function ColorConverterPage() {
  const [selectedColor, setSelectedColor] =
    useState<Record<string, number>>(defaultColor);
  // const [selectedMode, setSelectedMode] = useState('rgba');
  // TODO: change text unde square according to mode

  return (
    <div className='w-full h-full flex md:flex-row flex-col gap-5 justify-start items-center pt-20'>
      <ColorSquare selectedColor={selectedColor} />
      <Tabs className='w-1/2 h-full items-center flex flex-col gap-2'>
        <TabsList>
          <TabsTrigger value='rgba-selector'>RGBA</TabsTrigger>
          <TabsTrigger value='hsl-selector'>HSL</TabsTrigger>
          <TabsTrigger value='cmyk-selector'>CMYK</TabsTrigger>
        </TabsList>
        <TabsContent
          value='rgba-selector'
          className='flex pt-20'
        >
          <RGBSelector
            defaultColor={defaultColor}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </TabsContent>
        <TabsContent
          value='hsl-selector'
          className='flex pt-20'
        >
          <p className='font-semibold text-2xl'>WIP</p>
        </TabsContent>
        <TabsContent
          value='cmyk-selector'
          className='flex pt-20'
        >
          <p className='font-semibold text-2xl'>WIP</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
