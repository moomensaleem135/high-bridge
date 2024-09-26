'use client';

import React from 'react';
import AppLayout from '@/components/common/layout/AppLayout';
import IncomeAccordion from './income-cards/IncomeAccordion';

export default function Income() {
  return (
    <AppLayout>
      <div className="flex flex-col self-stretch w-full gap-y-4 my-20 overflow-y-scroll">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="px-4 text-3xl font-semibold text-center tracking-tight">
            Zakat on Various Income Sources
          </h1>
          <span className="px-4 font-normal text-base mt-2  text-center tracking-tight">
            Start calculating your zakat by selecting your income sources from
            the options below.
          </span>
        </div>
        <div className="flex flex-col justify-evenly items-center gap-10 pt-5">
          <div className="flex justify-center items-center w-[90%]">
            <section className="flex flex-col w-full">
              <IncomeAccordion />
            </section>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
