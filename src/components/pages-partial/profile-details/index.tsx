'use client';

import React from 'react';

import AppLayout from '@/components/layouts/AppLayout';
import ProfileDetailsForm from './detailsForm';

export default function PartialProfileDetails() {
  return (
    <AppLayout>
      <div className="flex flex-col self-stretch w-full gap-y-4 overflow-y-scroll xs:mb-16 lg:my-5 gridscrollbar">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="px-4 text-3xl font-semibold text-center tracking-tight">
            Account Set Up
          </h1>
          <span className="text-center px-4 font-normal text-base mt-2 leading-6 mb-2">
            Begin calculating your zakat by choosing your income sources from
            the options listed below.
          </span>
          <hr className="w-full border-[1px] border-underlineTop" />
        </div>

        <div className="flex justify-center items-center mt-2 flex-col max-md:pb-24">
          <ProfileDetailsForm />
        </div>
      </div>
    </AppLayout>
  );
}
