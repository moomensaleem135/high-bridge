"use client"
import React, { useState } from 'react';
import { ILayoutProps } from '@/lib/types';

import LeftNavbar from './Components/LeftNavbar';
import TopNavbar from './Components/TopNavbar';

interface INavbar extends ILayoutProps {}

function Navbar({ children, ...props }: INavbar) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="flex w-full relative bg-background"
        style={{ height: '100dvh' }}
      >
        <LeftNavbar open={open} setOpen={setOpen} />
        <div className="flex flex-col w-full pl-0 xl:pl-[150px] mb-12">
          <TopNavbar open={open} setOpen={setOpen} {...props} />
          <div className="flex flex-col h-full xl:ml-3">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
