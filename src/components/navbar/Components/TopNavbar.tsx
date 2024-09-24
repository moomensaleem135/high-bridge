import React from 'react';
import UserImage from '@/assets/png/user.png';
import {
  ArrowLeftIcon,
  NotificationIcon,
  SearchIcon,
  SearchRightIcon,
} from '@/assets/svgs';
import NextImage from '@/components/ui/next-image';
import { ILayoutProps } from '@/lib/types';
import { IconInput } from '@/components/ui/icon-input';
import { Hamburger } from './Hamburger';

interface ITopNavbar extends ILayoutProps {
  open: boolean;
  setOpen: (state: boolean) => void;
}

const TopNavbar = ({ open, setOpen }: ITopNavbar) => {
  return (
    <div className="px-2 min-h-[70px] flex w-full items-center justify-between">
      <div className="flex items-center gap-x-2 w-3/5">
        {/* Back Icon */}
        <div className="rounded-lg justify-center items-center bg-background border-solid border-[1px] border-[#DFE3E6] w-[30px] h-[30px] flex absolute left-[19rem] top-9 z-50">
          <ArrowLeftIcon className="w-6 h-6 cursor-pointer " />
        </div>

        {/* Search Input */}
        <div className="w-2/6 hidden xl:flex pl-7 ">
          <span className="text-[1.1rem] font-[500]">
            Zakat Due: <span className="text-[#4CAF50] font-[700]">$0.00</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-x-4">
        <div className="w-full hidden xl:flex pr-7">
          <span className="text-[1.1rem] font-[500]">
            Zakat Pay Date : 24-05-2024
          </span>
        </div>
        {/* Hamburger Menu */}
        <div className="xl:hidden">
          <Hamburger open={open} setOpen={setOpen} />
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
