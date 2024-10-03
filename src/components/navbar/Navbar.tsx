'use client';
import React, { useEffect, useState } from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import { ILayoutProps } from '@/lib/types';

import LeftNavbar from './Components/LeftNavbar';
import TopNavbar from './Components/TopNavbar';
import { Hamburger } from './Components/Hamburger';
import { NavIcon } from '@/assets/svgs';

interface INavbar extends ILayoutProps {}

function Navbar({ children, ...props }: INavbar) {
  const [open, setOpen] = useState(false);
  const [collapseNav, setCollapseNav] = useState<boolean>(true);

  return (
    <>
      {/* Hamburger Menu */}
      <div className="lg:hidden pl-4 pr-4 pt-4 pb-8 flex  items-center">
        <Hamburger open={open} setOpen={setOpen} />

        {open && (
          <div className="flex w-full justify-center items-center">
            <NavIcon />
          </div>
        )}
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
          <hr className="w-full border-[1px] border-solid border-underline xs:hidden lg:block" />
          <div className="flex flex-col h-full">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
