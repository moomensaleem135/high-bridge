import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { textConstants } from '@/configs/textConstants';

export const CommercialItemCard = ({ title, items }: any) => {
  return (
    <div className="p-5 bg-cardbg rounded-xl border-cardBorder border-[1px] mb-4">
      <div className="font-medium text-xl flex gap-2">{title}</div>
      {items.map((item: any, index: any) => (
        <div
          key={index}
          className="flex flex-col justify-start items-center gap-2 pl-6 pr-6 pt-1 pb-1 bg-white rounded border border-gray-300 w-full mt-2"
        >
          <div className="flex justify-between items-center w-full h-10">
            <span className="text-cardHeading font-normal text-base text-center">
              {item.item}
            </span>
            <span className="text-center font-normal text-base text-cardText">
              {item.quality}, {item.weight} Grams
            </span>
            <span className="font-medium text-base text-zakatText">
              ${item.zakat.toFixed(2)}
            </span>
            <Link
              href={'income-details'}
              className="flex justify-center items-center"
            >
              <Button className="bg-black text-white font-medium text-xs hover:bg-[#5e5f5d]">
                {textConstants.previewButtonText}
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
