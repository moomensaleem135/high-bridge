import React from 'react';
import { AddIcon } from '@/assets/svgs/add-icon';
import { useRouter } from 'next/navigation';
import GridSection from './table';

const MainSection = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col self-stretch w-[57%] bg-[#F8F8F8] border-[1px] border-[#DFE3E6] rounded-lg ">
      <div className="flex justify-between items-center w-full pt-3 pb-3 pl-4 pr-4">
        <span>Gold & Silver (Hanafi)</span>
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push('/item-details');
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
