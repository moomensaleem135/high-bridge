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
        <div className="rounded-lg justify-center items-center bg-accent  w-[50px] h-[50px] flex xl:hidden">
          <ArrowLeftIcon className="w-6 h-6 cursor-pointer " />
        </div>

        {/* Search Input */}
        <div className="w-2/6 hidden xl:flex">
          <IconInput
            icon={SearchIcon}
            placeholder="Search highbridge"
            rightIcon={SearchRightIcon}
            className="border border-accent w-full"
            showRightIcon
            rightIconClassName="w-8 h-8"
          />
        </div>
      </div>

      <div className="flex items-center gap-x-4">
        {/* Notification Icon */}
        <NotificationIcon className="w-10 h-10 cursor-pointer hidden xl:flex" />

        {/* User Profile Image */}
        <div className="py-4 hidden xl:flex">
          <NextImage
            className="w-10 h-10 rounded-full"
            src={'/assets/png/user.png'}
            alt="User Profile"
          />
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
