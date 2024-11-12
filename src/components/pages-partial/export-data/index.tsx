'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import AppLayout from '@/components/layouts/AppLayout';
import { textConstants } from '@/configs/textConstants';
import ExportCard from '@/components/common/exportCard';
import { ArrowLeftIcon } from '@/assets/svgs';
import { Button } from '@/components/ui/button';

const cardData = [
  {
    text: 'Send your data directly to Google Sheets for easy access and collaboration.',
    title: 'Export Data to Google Sheets',
  },
  {
    text: 'Download your data to your device for offline use and secure storage.',
    title: 'Export Data Locally',
  },
];

export default function PartialExportData() {
  const router = useRouter();
  return (
    <AppLayout>
      <div className="flex flex-col self-stretch w-full gap-y-4 overflow-y-scroll xs:mb-16 lg:my-5 gridscrollbar pb-20">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="px-4 text-3xl font-semibold text-center tracking-tight">
            {textConstants.exportDataMainHeading}
          </h1>
          <span className="text-center px-4 font-normal text-base mt-2 leading-6 mb-2">
            {textConstants.exportDataMainParagraph}
          </span>
          <hr className="w-full border-[1px] border-underlineTop" />
        </div>

        <div className="xl:flex xl:flex-row flex-col w-full justify-center items-center gap-x-6 mt-2">
          <ExportCard cardData={cardData} />
        </div>
        <div className="flex flex-col justify-evenly items-center gap-5 md:mt-12 xs:mt-6">
          <hr className=" max-w-[860px] border-[1px] border-solid border-underline min-[1280px]:w-full min-[768px]:w-[410px] max-[1279px]:w-[410px] min-xs:w-[320px] max-[767px]:w-[320px]" />
          <div className="flex justify-between items-center max-w-[860px] md:flex-row md:justify-between md:items-center min-[1280px]:w-full min-[768px]:w-[410px] max-[1279px]:w-[410px] min-xs:w-[320px] max-[767px]:w-[320px]">
            <div
              className="flex justify-start items-center text-base font-medium cursor-pointer"
              onClick={() => {
                router.back();
              }}
            >
              <ArrowLeftIcon />
              {textConstants.formBackButtonText}
            </div>

            <Button className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover">
              {textConstants.formNextButtonText}
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
