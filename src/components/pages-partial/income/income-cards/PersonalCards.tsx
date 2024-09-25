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
    <section className="grid grid-cols-3 grid-rows-2 w-[70%] gap-6 mt-6 mb-6">
      <IncomeCard cardData={cardData} className="flex h-10" />
    </section>
  );
}
