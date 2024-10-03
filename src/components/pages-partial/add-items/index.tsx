'use client';

import React from 'react';
import { useSelector } from 'react-redux';

import AppLayout from '@/components/common/layout/AppLayout';
import MainSection from './item-section/main';
import Link from 'next/link';
import { ArrowLeftIcon } from '@/assets/svgs';
import { Button } from '@/components/ui/button';

export default function PartialAddItems() {
  const items = useSelector((state: any) => state.items.items) || [];
  const income = useSelector((state: any) => state.income.income);
  return (
    <AppLayout>
      <div className="flex flex-col self-stretch w-full gap-y-4 my-5">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-center px-4 text-3xl font-semibold">
            Add {income ? income : 'Gold & Sliver'} Items
          </h1>
          <span className="text-center px-4 font-normal text-base mt-2 leading-6 mb-2">
            Here’s what you have so far. Please add your gold and silver items
            such as tola, grams, or ounces.
          </span>
          <hr className="w-full border-[1px] border-underlineTop" />
        </div>
        <div className="flex flex-col justify-center items-center gap-y-3">
          <div className="flex justify-center items-center mt-2 w-full">
            <MainSection />
          </div>

          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col justify-evenly items-center w-[75%] gap-5 mt-6">
              <hr className="w-full border-[1px] border-solid border-underline max-w-[850px]" />
              <div className="flex justify-between items-center w-full max-w-[850px] md:flex-row md:justify-between md:items-center xs:flex-col-reverse xs:gap-y-4 xs:justify-start xs:items-start">
                <Link
                  className="flex justify-start items-center "
                  href={'/income-details'}
                >
                  <ArrowLeftIcon />
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
