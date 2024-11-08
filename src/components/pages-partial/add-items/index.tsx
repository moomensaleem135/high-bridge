'use client';

import React from 'react';
import { useSelector } from 'react-redux';

import AppLayout from '@/components/layouts/AppLayout';
import MainSection from './item-section/main';
import Link from 'next/link';
import { ArrowLeftIcon } from '@/assets/svgs';
import { useRouter } from 'next/navigation';
import { textConstants } from '@/configs/textConstants';

export default function PartialAddItems() {
  const router = useRouter();
  const income = useSelector((state: any) => state.income.income);
  return (
    <AppLayout>
      <div className="flex flex-col self-stretch w-full gap-y-4 xs:my-0 lg:my-5 overflow-y-auto overflow-x-hidden pb-10 gridscrollbar">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-center px-4 text-3xl font-semibold">
            Add{' '}
            {income === 'Liquid Assets (Cash, Checking, Saving, Loan)'
              ? 'Liquid Assets'
              : income || 'Gold & Silver'}{' '}
            Items
          </h1>
          <div className="w-full md:w-2/3 text-center pb-4 pt-2">
            {income === 'Gold & Silver' ? (
              <span className="text-center px-4 font-normal text-base mt-2 leading-6 mb-2">
                {textConstants.addGoldAndSilverItemsText}
              </span>
            ) : income === 'House' ? (
              <span className="text-center px-4 font-normal text-base mt-2 leading-6 mb-2">
                {textConstants.addHouseItemsText}
              </span>
            ) : (
              <span className="text-center px-4 font-normal text-base mt-2 leading-6 mb-2">
                {textConstants.addCashAndCheckingItemsText}
              </span>
            )}
          </div>

          <hr className="w-full border-[1px] border-underlineTop" />
        </div>
        <div className="flex flex-col justify-center items-center gap-y-3">
          <div className="flex justify-center items-center mt-2 w-full">
            <MainSection />
          </div>

          <div className="flex justify-center items-center w-full xs:pb-20 md:pb-10">
            <div className="flex flex-col justify-evenly items-center w-[75%] gap-5 mt-6">
              <hr className="w-full border-[1px] border-solid border-underline max-w-[850px]" />
              <div className="flex justify-between items-center w-full max-w-[850px] md:flex-row md:justify-between md:items-center xs:flex-col-reverse xs:gap-y-4 xs:justify-start xs:items-start">
                <Link
                  className="flex justify-start items-center font-medium text-base"
                  onClick={() => router.back()}
                  href={''}
                >
                  <ArrowLeftIcon />
                  {textConstants.formBackButtonText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
