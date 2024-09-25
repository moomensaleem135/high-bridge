'use client';

import React from 'react';

import AppLayout from '@/components/common/layout/AppLayout';
import ComingSoon from '@/components/common/ComingSoon';
import MainSection from './item-section/main';

export default function PartialAddItems() {
  return (
    <AppLayout>
      <div className="flex flex-col self-stretch w-full gap-y-4 my-20">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-[700]">Add Gold & Sliver Items</h1>
          <span className="font-[400] text-lg">
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
