import React from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { Inter } from 'next/font/google';

import { ArrowLeftIcon } from '@/assets/svgs';
import { IncomeChoice } from '@/store/features/income/incomeSlice';
import { textConstants } from '@/configs/textConstants';
import { Button } from '@/components/ui/button';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const PersonalItemCard = ({ title, items }: any) => {
  const dispatch = useDispatch();

  const [mainText, bracketedText] = title.includes('(')
    ? title.split(/(\(.*\))/)
    : [title, ''];

  return (
    <div className="p-4 bg-cardbg rounded-xl border-cardBorder border-[1px] mb-4">
      <div className="font-medium text-xl flex gap-2">
        <div className="xs:text-base sm:text-xl text-agTableTop">
          <span>
            {mainText}
            {bracketedText && <span className="text-sm">{bracketedText}</span>}
          </span>
        </div>
      </div>
      {items.map((item: any, index: any) => (
        <div
          key={index}
          className="flex flex-col justify-start items-center gap-2 pl-6 pr-6 pt-1 pb-1 bg-white rounded border border-gray-300 w-full mt-2"
        >
          <div className="flex justify-between items-center w-full h-10">
            <h2
              className={`text-cardHeading font-normal text-base text-start text-nowrap w-20 flex-1 ${inter.className}`}
            >
              {item.item}
            </h2>
            <span
              className={`text-start font-normal text-base text-cardText text-wrap line-clamp-3 flex-1 xs:hidden xl:block ${inter.className}`}
            >
              {item.quality && item.weight
                ? `${item.quality}, ${item.weight} ${item.quantity}`
                : '$' + Number(item.quantity).toFixed(2)}
            </span>
            <span
              className={`font-medium text-base text-zakatText flex-1 text-center xs:hidden sm:block ${inter.className}`}
            >
              ${item.zakat.toFixed(2)}
            </span>
            <Link
              href={'/income/income-details/add-items'}
              className="flex justify-end items-center flex-1"
            >
              <Button
                className={`bg-black text-white font-medium text-sm hover:bg-[#5e5f5d] h-7 rounded-md pl-4 pr-4 pt-1 pb-1 xs:hidden sm:flex ${inter.className}`}
                onClick={() => dispatch(IncomeChoice(item.income))}
              >
                {textConstants.previewButtonText}
              </Button>
              <span
                className="xs:flex sm:hidden"
                onClick={() => dispatch(IncomeChoice(item.income))}
              >
                <ArrowLeftIcon className="rotate-180 h-6" />
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
