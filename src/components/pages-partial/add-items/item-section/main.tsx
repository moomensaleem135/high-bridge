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

  return (
    <div className="flex flex-col self-stretch w-[76%] max-w-[850px] bg-tableBg border-[1px] border-tableBorder rounded-lg ">
      <div className="flex justify-between items-center w-full pt-3 pb-3 pl-4 pr-4">
        <span className="font-medium text-lg text-agTableTop">
          {income ? income : 'Gold & Silver'}
          <span className="font-medium text-sm ">
            (Assembly of Muslim Jurists of America)
          </span>
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
