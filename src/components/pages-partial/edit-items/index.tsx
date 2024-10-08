'use client';

import React from 'react';

import AppLayout from '@/components/common/layout/AppLayout';
import EditDetailsForm from './detailsForm';

export default function PartialEditDetails() {
  return (
    <AppLayout>
      <div className="flex flex-col self-stretch w-full gap-y-4 overflow-y-scroll xs:mb-16 lg:my-5">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="text-center px-4 text-3xl font-semibold">
            Edit Gold & Sliver Items
          </h1>
          <span className="text-center px-4 font-normal text-base mt-2 leading-6 mb-2">
            Here’s what you have so far. Please add your gold and silver items
            such as tola, grams, or ounces.
          </span>
          <hr className="w-full border-[1px] border-underline" />
        </div>

        <div className="flex justify-center items-center mt-2 flex-col ">
          <EditDetailsForm />
        </div>
      </div>
    </AppLayout>
  );
}
