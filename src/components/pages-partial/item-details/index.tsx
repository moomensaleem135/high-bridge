'use client';

import React from 'react';

import AppLayout from '@/components/common/layout/AppLayout';
import ItemDetailsForm from './detailsForm';

export default function PartialItemDetails() {
  return (
    <AppLayout>
      <div className="flex flex-col self-stretch w-full gap-y-4 my-20 overflow-y-scroll">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="text-center px-4 text-3xl font-bold">
            Add Gold & Sliver Items
          </h1>
          <span className="text-center px-4 font-medium text-lg">
            Here’s what you have so far. Please add your gold and silver items
            such as tola, grams, or ounces.
          </span>
          <hr className="w-full border-[1px] border-[#DFE3E6]" />
        </div>

        <div className="flex justify-center items-center mt-2 flex-col">
          <ItemDetailsForm />
        </div>
      </div>
    </AppLayout>
  );
}