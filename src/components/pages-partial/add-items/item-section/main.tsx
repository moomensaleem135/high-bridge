import React from 'react';
import { AddIcon } from '@/assets/svgs/add-icon';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import GridSection from './table';

const MainSection = () => {
  const router = useRouter();
  const selector = useSelector((state: any) => state.sect.sect);
  const setup = useSelector((state: any) => state.setup.setup);
  const income = useSelector((state: any) => state.income.income);
  const items = useSelector((state: any) => state.items.items) || [];

  const [mainText, bracketedText] =
    typeof income === 'string' && income.includes('(')
      ? income.split(/(\(.*\))/)
      : [income, ''];

  console.log(mainText, bracketedText);

  return (
    <div className="flex flex-col self-stretch w-[76%] max-w-[850px] bg-tableBg border-[1px] border-tableBorder rounded-lg ">
      <div className="flex justify-between items-center w-full pt-3 pb-3 pl-4 pr-4">
        <span className="font-medium text-lg text-agTableTop">
          {income ? (
            <span>
              {mainText}
              {bracketedText && (
                <span className="text-sm">{bracketedText}</span>
              )}
            </span>
          ) : (
            'Gold & Silver'
          )}
        </span>
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push('add-items/item-details');
          }}
        >
          <AddIcon />
        </div>
      </div>
      <GridSection />
    </div>
  );
};

export default MainSection;
