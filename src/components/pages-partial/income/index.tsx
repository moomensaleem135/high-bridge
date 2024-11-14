'use client';

import React from 'react';

import AppLayout from '@/components/layouts/AppLayout';
import IncomeSection from '@/components/common/incomeSection';
import { textConstants } from '@/configs/textConstants';

const personalText = [
  {
    text: textConstants.goldAndSilverItem || '',
  },
  {
    text: textConstants.liquidAssetsItem || '',
  },
  {
    text: textConstants.houseItem || '',
  },
  {
    text: textConstants.stockItem || '',
  },
  {
    text: textConstants.retirementItem || '',
  },
];

const commercialText = [
  {
    text: textConstants.goodAndServiceItem || '',
  },
  {
    text: textConstants.manufactureItem || '',
  },
  {
    text: textConstants.farmItem || '',
  },
  {
    text: textConstants.livestockItem || '',
  },
  {
    text: textConstants.realEstateItem || '',
  },
  {
    text: textConstants.rentalItem || '',
  },
];

export default function Income() {
  return (
    <AppLayout>
      <div className="flex flex-col self-stretch w-full gap-y-4 pb-16 overflow-y-scroll xs:mb-16 lg:my-5 gridscrollbar">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="px-4 text-3xl font-semibold text-center tracking-tight">
            {textConstants.incomeSourceText}
          </h1>
          <span className="px-4 font-normal text-base mt-2 text-center leading-6 mb-2">
            {textConstants.zakatCalculationText}
          </span>
          <hr className="w-full border-[1px] border-underlineTop" />
        </div>
        <div className="flex flex-col justify-evenly items-center gap-10 pt-2">
          <div className="flex justify-center items-center w-[70%]">
            <section className="flex flex-col w-full gap-y-8 justify-center">
              <IncomeSection
                texts={personalText}
                title={textConstants.personalPropertyType}
              />
              <IncomeSection
                texts={commercialText}
                title={textConstants.commercialPropertyType}
              />
            </section>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
