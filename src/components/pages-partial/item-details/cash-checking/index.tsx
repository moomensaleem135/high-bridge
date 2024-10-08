'use client';

import React from 'react';
import ItemDetailsForm from './detailsForm';

export default function CashItemDetails() {
  return (
    <div className="flex flex-col self-stretch w-full gap-y-4 overflow-y-scroll xs:mb-16 lg:my-5">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-center px-4 text-3xl font-semibold">
          Add Cash & Checking Items
        </h1>
        <span className="text-center px-4 font-normal text-base mt-2 leading-6 mb-2 lg:w-3/4 w-full">
          Here’s what you have so far. Please add your cash and checking account
          balances for accurate zakat calculation
        </span>
        <hr className="w-full border-[1px] border-underline" />
      </div>

      <div className="flex justify-center items-center mt-2 flex-col ">
        <ItemDetailsForm />
      </div>
    </div>
  );
}
