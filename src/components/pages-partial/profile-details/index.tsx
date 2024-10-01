'use client';

import React from 'react';

import AppLayout from '@/components/common/layout/AppLayout';
import ProfileDetailsForm from './detailsForm';

export default function PartialProfileDetails() {
  return (
    <AppLayout>
      <div className="flex flex-col self-stretch w-full gap-y-4  xs:mb-16 lg:my-5">
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

        <div className="flex justify-center items-center mt-2 flex-col ">
          <ProfileDetailsForm />
        </div>
      </div>
    </AppLayout>
  );
}
