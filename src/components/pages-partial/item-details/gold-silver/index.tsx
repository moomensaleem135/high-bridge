'use client';

import React from 'react';
import ItemDetailsForm from './detailsForm';
import { useSearchParams } from 'next/navigation';

export default function GoldItemDetails() {
  const searchparams = useSearchParams();
  const id = searchparams.get('id');
  return (
    <div className="flex flex-col self-stretch w-full gap-y-4 overflow-y-scroll xs:mb-16 lg:my-5 gridscrollbar">
      <div className="flex flex-col justify-center items-center ">
        {id ? (
          <h1 className="text-center px-4 text-3xl font-semibold">
            Edit Gold & Sliver Items
          </h1>
        ) : (
          <h1 className="text-center px-4 text-3xl font-semibold">
            Add Gold & Sliver Items
          </h1>
        )}

        <span className="text-center px-4 font-normal text-base mt-2 leading-6 mb-2">
          Here’s what you have so far. Please add your gold and silver items
          such as tola, grams, or ounces.
        </span>
        <hr className="w-full border-[1px] border-underline" />
      </div>

      <div className="flex justify-center items-center mt-2 flex-col ">
        <ItemDetailsForm />
      </div>
    </div>
  );
}
