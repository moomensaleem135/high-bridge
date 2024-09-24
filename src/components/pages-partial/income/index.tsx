'use client';

import React from 'react';
import IncomeCard from '@/components/common/IncomeCard';
import AppLayout from '@/components/common/layout/AppLayout';

const cardData = [
  {
    text: 'Lorem Ipsum is simply dummy  text of the printing and typesetting industry.',
    title: 'Wages & Salaries',
  },
  {
    text: 'Lorem Ipsum is simply dummy  text of the printing and typesetting industry.',

    title: 'Gold & Silver',
  },
  {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',

    title: 'Cash & Checking',
  },
  {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',

    title: 'Savings',
  },
  {
    text: 'Lorem Ipsum is simply dummy  text of the printing and typesetting industry.',

    title: 'House',
  },
  {
    text: 'Lorem Ipsum is simply dummy  text of the printing and typesetting industry.',
    title: 'Land',
  },
  {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    title: 'Business',
  },
];

export default function PartialIncome() {
  return (
    <AppLayout>
      <div className="flex flex-col self-stretch w-full gap-y-4 my-20">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-[700]">
            Zakat on Various Income Sources
          </h1>
          <span className="font-[400] text-lg">
            Start calculating your zakat by selecting your income sources from
            the options below.
          </span>
        </div>
        <div className="flex flex-col justify-evenly items-center gap-10 pt-5">
          <div className="flex justify-center items-center">
            <section className="grid grid-cols-3 grid-rows-3 w-[55%] gap-6">
              <IncomeCard cardData={cardData} className="flex h-10" />
            </section>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
