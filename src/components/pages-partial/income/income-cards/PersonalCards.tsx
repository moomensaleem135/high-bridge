'use client';

import React from 'react';
import IncomeCard from '@/components/common/IncomeCard';

const cardData = [
  {
    text: 'Lorem Ipsum is simply dummy  text of the printing and typesetting industry.',
    title: 'Cash & Checking',
  },
  {
    text: 'Lorem Ipsum is simply dummy  text of the printing and typesetting industry.',
    title: 'Gold & Silver',
  },
  {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    title: 'Savings & Stock',
  },

  {
    text: 'Lorem Ipsum is simply dummy  text of the printing and typesetting industry.',
    title: 'Retirement Accounts',
  },
  {
    text: 'Lorem Ipsum is simply dummy  text of the printing and typesetting industry.',
    title: 'House',
  },
];

export default function PersonalCards() {
  return (
    // <div className="flex flex-col self-stretch w-full gap-y-4 my-20">
    //   <div className="flex flex-col justify-evenly items-center gap-10 pt-5">
    //     <div className="flex justify-center items-center">
    <section className="grid grid-cols-3 grid-rows-3 w-[70%] gap-6 mt-6">
      <IncomeCard cardData={cardData} className="flex h-10" />
    </section>
    //     </div>
    //   </div>
    // </div>
  );
}
