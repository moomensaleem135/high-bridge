'use client';
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
        className="flex w-full relative bg-background "
        style={{ height: '100lvh' }}
      >
        <LeftNavbar open={open} setOpen={setOpen} />
        <div className="flex flex-col w-full mb-12">
          <TopNavbar open={open} setOpen={setOpen} {...props} />
          <hr className="w-full border-[1px] border-solid border-[#DFE3E6]" />
          <div className="flex flex-col h-full xl:ml-3 ">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
