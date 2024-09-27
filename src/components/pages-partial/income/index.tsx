'use client';

import React from 'react';
import AppLayout from '@/components/common/layout/AppLayout';
import IncomeAccordion from './income-cards/IncomeAccordion';
import IncomeSection from '@/components/common/incomeSection';

const personalText = [
  {
    text: 'Gold & Silver',
  },
  {
    text: 'Cash & Checking',
  },
  {
    text: 'Savings & Stock',
  },
  {
    text: 'Retirement Accounts',
  },
  {
    text: 'House',
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
  return (
    <AppLayout>
      <div className="flex flex-col self-stretch w-full gap-y-4 pb-3 overflow-y-scroll xs:mb-16 lg:my-16">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="px-4 text-3xl font-semibold text-center tracking-tight">
            Zakat on Various Income Sources
          </h1>
          <span className="px-4 font-normal text-lg mt-2 text-center leading-6">
            Start calculating your zakat by selecting your income sources from
            the options below.
          </span>
        </div>
        <div className="flex flex-col justify-evenly items-center gap-10 pt-2">
          <div className="flex justify-center items-center w-[90%]">
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
