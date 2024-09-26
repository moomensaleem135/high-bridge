'use client';
import React, { useEffect, useState } from 'react';
import { ILayoutProps } from '@/lib/types';

import LeftNavbar from './Components/LeftNavbar';
import TopNavbar from './Components/TopNavbar';
import { Hamburger } from './Components/Hamburger';

interface INavbar extends ILayoutProps {}

function Navbar({ children, ...props }: INavbar) {
  const [open, setOpen] = useState(false);
  const [collapseNav, setCollapseNav] = useState<boolean>(true);

  return (
    <>
      {/* Hamburger Menu */}
      <div className="lg:hidden">
        <Hamburger open={open} setOpen={setOpen} />
      </div>
      <div
        className="flex w-full relative bg-background "
        style={{ height: '100lvh' }}
      >
        <LeftNavbar
          open={open}
          setOpen={setOpen}
          collapseNav={collapseNav}
          setCollapseNav={setCollapseNav}
        />
        <div className="flex flex-col w-full mb-12">
          <TopNavbar
            open={open}
            setOpen={setOpen}
            collapseNav={collapseNav}
            setCollapseNav={setCollapseNav}
          />
          <hr className="w-full border-[1px] border-solid border-[#DFE3E6] lg:flex hidden" />
          <div className="flex flex-col h-full lg:ml-3">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
