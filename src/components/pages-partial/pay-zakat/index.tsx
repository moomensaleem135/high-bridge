import React from 'react';
import AppLayout from '@/components/layouts/AppLayout';
import ComingSoon from '@/components/common/ComingSoon';
import { textConstants } from '@/configs/textConstants';

export default function PartialPayZakat() {
  return (
    <AppLayout>
      <div className="flex flex-col self-stretch w-full gap-y-4 xs:mb-16 lg:my-7 overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="px-4 text-3xl font-semibold text-center tracking-tight">
            {textConstants.payZakatMainHeading}
          </h1>
          <span className="text-center px-4 font-normal text-base mt-2 leading-6 mb-2 ">
            {textConstants.payZakatMainParagraph}
          </span>
          <hr className="w-full border-[1px] border-underlineTop" />
        </div>
        <ComingSoon />
      </div>
    </AppLayout>
  );
}
