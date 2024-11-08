'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import AppLayout from '@/components/layouts/AppLayout';
import IncomeSection from '@/components/common/incomeSection';

const personalText = [
  {
    text: 'Gold & Silver',
  },
  {
    text: 'Liquid Assets (Cash, Checking, Saving, Loan)',
  },
  {
    text: 'House',
  },
  {
    text: 'Stocks',
  },
  {
    text: 'Retirement Accounts',
  },
];

const commercialText = [
  {
    text: 'Goods & Services',
  },
  {
    text: 'Manufacturing Plant',
  },
  {
    text: 'Farmland',
  },
  {
    text: 'Animal Livestock',
  },
  {
    text: 'Real Estate',
  },
  {
    text: 'Rentals',
  },
];

export default function Income() {
  const pathname = usePathname();
  React.useEffect(() => {
    if (pathname !== '/income/income-details/add-items/item-details') {
      localStorage.clear();
    }
  }, [pathname]);
  return (
    <AppLayout>
      <div className="flex flex-col self-stretch w-full gap-y-4 pb-16 overflow-y-scroll xs:mb-16 lg:my-5 gridscrollbar">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="px-4 text-3xl font-semibold text-center tracking-tight">
            Zakat on Various Income Sources
          </h1>
          <span className="px-4 font-normal text-base mt-2 text-center leading-6 mb-2">
            Start calculating your zakat by selecting your income sources from
            the options below.
          </span>
          <hr className="w-full border-[1px] border-underlineTop" />
        </div>
        <div className="flex flex-col justify-evenly items-center gap-10 pt-2">
          <div className="flex justify-center items-center w-[70%]">
            <section className="flex flex-col w-full gap-y-8 justify-center">
              <IncomeSection texts={personalText} title="Personal Property:" />
              <IncomeSection
                texts={commercialText}
                title="Commercial Property:"
              />
            </section>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
