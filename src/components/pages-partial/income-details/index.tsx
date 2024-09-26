'use client';

import React, { useState } from 'react';
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
    text: 'Stresses strict adherence to  the Quran and Hadith.',
    title: 'Hanbali',
  },
  {
    text: `Focuses on the teachings of the sixth Imam, Ja'far al-Sadiq.`,
    title: 'Jafari',
  },
  {
    text: 'Similar to Sunni practices but with distinct theological differences.',
    title: 'Zaidi',
  },
];

export default function PartialIncome() {
  const [religion, setReligion] = useState<string | undefined>('');
  const [checked, setChecked] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = () => {
    if (!religion) {
      alert('select a religion to proceed please');
    } else {
      router.push('/add-items');
    }
  };
  return (
    <AppLayout>
      <div className="flex flex-col self-stretch w-full gap-y-4 my-20 overflow-y-scroll overflow-x-hidden">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-center px-4 text-3xl font-bold">
            Review your Gold & Sliver
          </h1>
          <span className="text-center px-4 font-medium text-lg">
            Please select the Islamic school of thought (madhab) you are
            following:
          </span>
        </div>
        <div className="flex flex-col justify-evenly items-center gap-10 pt-5">
          <div className="flex flex-col justify-center items-center gap-12">
            <section className="flex flex-wrap justify-center items-center max-w-[1000px] gap-6">
              <IncomeDetailsCard
                cardData={cardData}
                className="flex h-10"
                setReligion={setReligion}
              />
            </section>
            <div className="flex flex-col justify-evenly items-center w-full gap-5">
              <hr className="w-full max-lg:w-[60%] border-[1px] border-solid border-[#DFE3E6]" />
              <div className="flex flex-row justify-between items-center w-full max-lg:px-12  ">
                <Link
                  className="flex justify-start items-center "
                  href={incomeUrl}
                >
                  <ArrowLeftIcon />
                  Back
                </Link>
                <div>
                  <Button
                    disabled={religion ? false : true}
                    className="bg-detailsBtn text-btnText font-normal w-6/6 hover:bg-[#5e5f5d]"
                    onClick={handleClick}
                  >
                    {religion ? 'Next' : 'Select to proceed'}
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
