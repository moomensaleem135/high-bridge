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
    <section className="flex flex-wrap justify-center items-center flex-row w-[85%] max-w-[1200px] gap-6 mt-6 mb-6">
      <IncomeCard cardData={cardData} className="flex h-10" />
    </section>
  );
}
