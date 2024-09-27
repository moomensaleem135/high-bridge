'use client';

import React from 'react';

import AppLayout from '@/components/common/layout/AppLayout';
import ComingSoon from '@/components/common/ComingSoon';
import MainSection from './item-section/main';

export default function PartialAddItems() {
  return (
    <AppLayout>
      <div className="flex flex-col self-stretch w-full gap-y-4 my-16">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-center px-4 text-3xl font-semibold">
            Add Gold & Sliver Items
          </h1>
          <span className="text-center px-4 font-normal text-lg mt-2 leading-6">
            Here’s what you have so far. Please add your gold and silver items
            such as tola, grams, or ounces.
          </span>
        </div>
        <div className="flex justify-center items-center mt-2">
          <MainSection />
        </div>
      </div>
    </AppLayout>
  );
}
