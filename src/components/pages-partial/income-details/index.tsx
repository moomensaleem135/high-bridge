'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import IncomeDetailsCard from '@/components/common/IncomeDetailsCard';
import AppLayout from '@/components/common/layout/AppLayout';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { incomeUrl } from '@/configs/constants';
import { ArrowLeftIcon } from '@/assets/svgs';

const cardData = [
  {
    text: 'Known for its flexibility and  extensive use of reasoning.',
    title: 'Hanafi',
  },
  {
    text: 'Emphasizes the practices of  the people of Medina.',
    title: 'Maliki',
  },
  {
    text: 'Combines both traditional and  rational sources of law.',
    title: `Shafi'i`,
  },
  {
    text: 'Stresses strict adherence to the Quran and Hadith.',
    title: 'Hanbali',
  },
  {
    text: `Provides jurisprudential rulings based on contemporary issues.`,
    title: 'Islamic Fiqh Council',
  },
  {
    text: 'Offers guidance on Islamic law for Muslims living in North America.',
    title: 'Assembly of Muslim Jurists of America',
  },
];

export default function PartialIncome() {
  const [religion, setReligion] = useState<string | undefined>('');
  const [checked, setChecked] = useState<boolean>(false);
  const router = useRouter();

  const selector = useSelector((state: any) => state.income.income);
  const handleClick = () => {
    if (!religion) {
      alert('select a religion to proceed please');
    } else {
      router.push('income-details/add-items');
    }
  };
  return (
    <AppLayout>
      <div className="flex flex-col self-stretch w-full gap-y-4 overflow-y-scroll overflow-x-hidden xs:mb-16 lg:my-5">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-center px-4 text-3xl font-semibold">
            {selector ? selector : 'Gold & Silver'} Entry
          </h1>
          <span className="text-center px-4 font-normal text-base mt-2 leading-6 mb-2">
            Please select the Islamic school of thought (madhab) you are
            following:
          </span>
          <hr className="w-full border-[1px] border-underlineTop" />
        </div>
        <div className="flex flex-col justify-evenly items-center gap-10 pt-5 mt-5">
          <div className="flex flex-col justify-center items-center gap-12">
            <section className="flex flex-wrap justify-center items-center max-w-[830px] gap-6">
              <IncomeDetailsCard
                cardData={cardData}
                className="flex h-10"
                setReligion={setReligion}
              />
            </section>
            <div className="flex flex-col justify-evenly items-center w-full gap-5 ">
              <hr className="w-full max-lg:w-[75%] border-[1px] border-solid border-underline" />
              <div className="flex flex-row justify-between items-center w-full max-lg:w-[70%] pb-4">
                <Link
                  className="flex justify-start items-center text-base font-medium"
                  href={''}
                  onClick={() => router.back()}
                >
                  <ArrowLeftIcon />
                  Back
                </Link>
                <div>
                  <Button
                    disabled={religion ? false : true}
                    className="bg-detailsBtn text-btnText font-normal w-6/6 hover:bg-btnHover"
                    onClick={handleClick}
                  >
                    {/* {religion ? 'Next' : 'Select to proceed'} */}
                    {'Next'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
