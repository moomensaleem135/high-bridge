'use client';

import React from 'react';
import IncomeCard from '@/components/common/IncomeCard';

const cardData = [
  {
    text: 'Lorem Ipsum is simply dummy  text of the printing and typesetting industry.',
    title: 'Goods & Services',
  },
  {
    text: 'Lorem Ipsum is simply dummy  text of the printing and typesetting industry.',
    title: 'Manufacturing Plant',
  },
  {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    title: 'Farmland',
  },

  {
    text: 'Lorem Ipsum is simply dummy  text of the printing and typesetting industry.',
    title: 'Animal Livestock',
  },
  {
    text: 'Lorem Ipsum is simply dummy  text of the printing and typesetting industry.',
    title: 'Real Estate',
  },
  {
    text: 'Lorem Ipsum is simply dummy  text of the printing and typesetting industry.',
    title: 'Rentals',
  },
];

export default function CommercialCards() {
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
