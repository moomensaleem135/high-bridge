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
import { cn } from '@/lib/cn';

interface ITopNavbar extends ILayoutProps {
  open: boolean;
  setOpen: (state: boolean) => void;
  collapseNav: boolean;
  setCollapseNav: (state: boolean) => void;
}

const TopNavbar = ({
  open,
  setOpen,
  collapseNav,
  setCollapseNav,
}: ITopNavbar) => {
  return (
    <div className="px-2 min-h-[70px] xs:min-h-[45px] sm:min-h-[70px] flex w-full items-center justify-between xs:hidden lg:flex">
      <div className="flex items-center gap-x-2 w-3/5">
        {/* Back Icon */}
        <div
          onClick={() => setCollapseNav(!collapseNav)}
          className={cn(
            'rounded-lg justify-center items-center  bg-background border-solid border-[1px] border-navBorder w-[30px] h-[30px] hidden lg:flex absolute top-9 z-50 transition-all duration-300',
            collapseNav ? 'left-[17rem]' : 'left-[3rem]'
          )}
        >
          <ArrowLeftIcon
            className={cn(
              'w-6 h-6 cursor-pointer ',
              collapseNav ? '' : 'rotate-180'
            )}
          />
        </div>

        {/* Search Input */}
        <div className="hidden lg:flex pl-7">
          <span className="text-lg font-medium">
            Zakat Due:{' '}
            <span className="text-zakatText font-bold text-xl">$0.00</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-x-4">
        <div className="w-full hidden lg:flex pr-7">
          <span className="text-sm font-medium">
            Zakat Pay Date : 24-05-2024
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
