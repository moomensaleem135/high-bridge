'use client';
import React from 'react';
import AppLayout from '@/components/common/layout/AppLayout';
import ZakatCard from './review-section';

export default function PartialReviews() {
  return (
    <AppLayout>
      <div className="flex flex-col self-stretch w-full gap-y-4 xs:mb-16 lg:my-7 overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="px-4 text-3xl font-semibold text-center tracking-tight">
            Review Zakat
          </h1>
          <span className="text-center px-4 font-normal text-base mt-2 leading-6 mb-2 ">
            Review your zakat details below to ensure accuracy. Confirm the
            items, amounts,
            <br /> and selected madhab before finalizing your zakat payment.
          </span>
          <hr className="w-full border-[1px] border-underlineTop" />
        </div>
        <div className="flex flex-col justify-evenly items-center gap-10 pt-2">
          <div className="flex justify-center items-center w-[70%]">
            <section className="flex flex-col w-full gap-y-8 justify-center">
              <ZakatCard />
            </section>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
