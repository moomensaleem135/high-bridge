'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ArrowLeftIcon } from '@/assets/svgs';
import { payZakatUrl } from '@/configs/constants';
import { useRouter } from 'next/navigation';

const personalText = [
  'Gold & Silver',
  'Cash & Checking',
  'Savings & Stock',
  'Retirement Accounts',
  'House',
];

const commercialText = [
  'Goods & Services',
  'Manufacturing Plant',
  'Farmland',
  'Animal Livestock',
  'Real Estate',
  'Rentals',
];

const ZakatCard = () => {
  const items = useSelector((state: any) => state.items.items) || [];
  const router = useRouter();
  const categorizedItems = items.reduce((acc: any, item: any) => {
    const category = personalText.includes(item.income)
      ? 'personal'
      : commercialText.includes(item.income)
        ? 'commercial'
        : null;

    if (category) {
      if (!acc[category]) {
        acc[category] = {};
      }
      if (!acc[category][item.income]) {
        acc[category][item.income] = [];
      }
      acc[category][item.income].push(item);
    }
    return acc;
  }, {});

  return (
    <div>
      {/* Render Personal Items */}
      {categorizedItems.personal &&
        Object.keys(categorizedItems.personal).length > 0 && (
          <div>
            <h2 className="font-medium text-2xl mb-2">Personal Property:</h2>
            {Object.keys(categorizedItems.personal).map((incomeKey) => (
              <div
                key={incomeKey}
                className="p-4 bg-cardbg rounded-xl border-cardBorder border-[1px] mb-4"
              >
                <div className="font-medium text-2xl flex gap-2">
                  {incomeKey}
                  <div className="font-medium text-lg flex justify-center items-center">
                    ({categorizedItems.personal[incomeKey][0].religion})
                  </div>
                </div>
                {categorizedItems.personal[incomeKey].map(
                  (item: any, index: any) => (
                    <div
                      key={index}
                      className="flex flex-col justify-start items-center gap-2 pl-7 pr-7 pt-1 pb-1 bg-white rounded border border-gray-300 w-full mt-2"
                    >
                      <div className="flex justify-between items-center w-full h-10">
                        <h2 className="text-cardHeading font-medium text-lg text-center text-nowrap">
                          {item.item}
                        </h2>
                        <span className="text-center font-normal text-base text-cardText text-wrap line-clamp-3 w-52">
                          {item.quality}, {item.weight} Grams
                        </span>
                        <span className="font-medium text-lg text-zakatText">
                          $100.00
                        </span>
                        <Link
                          href={'/income/income-details/add-items'}
                          className="flex justify-center items-center"
                        >
                          <Button className="bg-black text-white font-medium text-base hover:bg-[#5e5f5d] h-8 p-3">
                            Preview
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        )}

      {/* Render Commercial Items */}
      {categorizedItems.commercial &&
        Object.keys(categorizedItems.commercial).length > 0 && (
          <div>
            <h2 className="font-medium text-2xl mb-2">Commercial Property:</h2>
            {Object.keys(categorizedItems.commercial).map((incomeKey) => (
              <div
                key={incomeKey}
                className="p-5 bg-cardbg rounded-xl border-cardBorder border-[1px] mb-4"
              >
                <div className="font-medium text-2xl flex gap-2">
                  {incomeKey}
                  <div className="font-medium text-lg flex justify-center items-center">
                    ({categorizedItems.commercial[incomeKey][0].religion})
                  </div>
                </div>
                {categorizedItems.commercial[incomeKey].map(
                  (item: any, index: any) => (
                    <div
                      key={index}
                      className="flex flex-col justify-start items-center gap-2 pl-7 pr-7 pt-1 pb-1 bg-white rounded border border-gray-300 w-full mt-2"
                    >
                      <div className="flex justify-between items-center w-full h-10">
                        <span className="text-cardHeading font-medium text-lg text-center text-nowrap">
                          {item.item}
                        </span>
                        <span className="text-center font-normal text-base text-cardText text-wrap line-clamp-3 w-52">
                          {item.quality}, {item.weight} Grams
                        </span>
                        <span className="font-medium text-lg text-zakatText">
                          $100.00
                        </span>
                        <Link
                          href={'income-details'}
                          className="flex justify-center items-center"
                        >
                          <Button className="bg-black text-white font-medium text-base hover:bg-[#5e5f5d] h-8 p-3">
                            Preview
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        )}
      {items.length !== 0 && (
        <div className="flex flex-col justify-evenly items-center w-full gap-5 mt-12">
          <hr className="w-full max-lg:w-[75%] border-[1px] border-solid border-underline" />
          <div className="flex flex-row justify-between items-center w-full max-lg:w-[70%] ">
            <Link
              className="flex justify-start items-center "
              href={''}
              // onClick={() => router.back()}
            >
              <ArrowLeftIcon />
              Back
            </Link>
            <div>
              <Button
                className="bg-detailsBtn text-btnText font-normal w-6/6 hover:bg-btnHover"
                onClick={() => router.push(payZakatUrl)}
              >
                Pay Zakat
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZakatCard;
