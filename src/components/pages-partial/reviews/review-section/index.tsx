'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeftIcon } from '@/assets/svgs';
import { payZakatUrl } from '@/configs/constants';
import { useRouter } from 'next/navigation';
import { IncomeChoice } from '@/store/features/income/incomeSlice';

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
  const cash = useSelector((state: any) => state.cash.cash) || [];
  const router = useRouter();
  const dispatch = useDispatch();

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

  // Categorize cash items
  const categorizedCash = cash.reduce((acc: any, item: any) => {
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

  const hasPersonalItems =
    Object.keys(categorizedItems.personal || {}).length > 0 ||
    Object.keys(categorizedCash.personal || {}).length > 0;
  const hasCommercialItems =
    Object.keys(categorizedItems.commercial || {}).length > 0;

  return (
    <div>
      {/* Render Personal Items */}
      {hasPersonalItems && (
        <div>
          <h2 className="font-medium text-2xl mb-2">Personal Property:</h2>

          {/* Render Gold & Silver if present */}
          {categorizedItems.personal?.['Gold & Silver'] &&
            categorizedItems.personal['Gold & Silver'].length > 0 && (
              <div className="p-4 bg-cardbg rounded-xl border-cardBorder border-[1px] mb-4">
                <div className="font-medium text-xl flex gap-2">
                  Gold & Silver
                  <div className="font-medium text-sm flex justify-center items-center">
                    ({categorizedItems.personal['Gold & Silver'][0].religion})
                  </div>
                </div>
                {categorizedItems.personal['Gold & Silver'].map(
                  (item: any, index: any) => (
                    <div
                      key={index}
                      className="flex flex-col justify-start items-center gap-2 pl-7 pr-7 pt-1 pb-1 bg-white rounded border border-gray-300 w-full mt-2"
                    >
                      <div className="flex justify-between items-center w-full h-10">
                        <h2 className="text-cardHeading font-normal text-base text-start text-nowrap w-20">
                          {item.item}
                        </h2>
                        <span className="text-center font-normal text-base text-cardText text-wrap line-clamp-3 w-44">
                          {item.quality}, {item.weight} {item.quantity}
                        </span>
                        <span className="font-medium text-base text-zakatText w-20">
                          ${item.zakat}
                        </span>
                        <Link
                          href={'/income/income-details/add-items'}
                          className="flex justify-center items-center"
                        >
                          <Button
                            className="bg-black text-white font-medium text-xs hover:bg-[#5e5f5d] h-8 p-3"
                            onClick={() => {
                              dispatch(IncomeChoice(item.income));
                            }}
                          >
                            Preview
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

          {/* Render Cash & Checking if present */}
          {categorizedCash.personal?.['Cash & Checking'] &&
            categorizedCash.personal['Cash & Checking'].length > 0 && (
              <div className="p-4 bg-cardbg rounded-xl border-cardBorder border-[1px] mb-4">
                <div className="font-medium text-xl flex gap-2">
                  Cash & Checking
                  <div className="font-medium text-sm flex justify-center items-center">
                    ({categorizedCash.personal['Cash & Checking'][0].religion})
                  </div>
                </div>
                {categorizedCash.personal['Cash & Checking'].map(
                  (item: any, index: any) => (
                    <div
                      key={index}
                      className="flex flex-col justify-start items-center gap-2 pl-7 pr-7 pt-1 pb-1 bg-white rounded border border-gray-300 w-full mt-2"
                    >
                      <div className="flex justify-between items-center w-full h-10">
                        <h2 className="text-cardHeading font-normal text-base text-start text-nowrap w-20">
                          {item.item}
                        </h2>
                        <span className="text-center font-normal text-base text-cardText text-wrap line-clamp-3 w-44">
                          ${item.quantity}.00
                        </span>
                        <span className="font-medium text-base text-zakatText w-20">
                          ${item.zakat}
                        </span>
                        <Link
                          href={'/income/income-details/add-items'}
                          className="flex justify-center items-center"
                        >
                          <Button
                            className="bg-black text-white font-medium text-xs hover:bg-[#5e5f5d] h-8 p-3"
                            onClick={() => {
                              dispatch(IncomeChoice(item.income));
                            }}
                          >
                            Preview
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

          {/* Check if both sections are empty */}
          {categorizedItems.personal?.['Gold & Silver']?.length === 0 &&
            categorizedCash.personal?.['Cash & Checking']?.length === 0 && (
              <div className="text-gray-500">
                No personal properties entered.
              </div>
            )}
        </div>
      )}

      {/* Render Commercial Items */}
      {hasCommercialItems && (
        <div>
          <h2 className="font-medium text-2xl mb-2">Commercial Property:</h2>
          {Object.keys(categorizedItems.commercial).map((incomeKey) => (
            <div
              key={incomeKey}
              className="p-5 bg-cardbg rounded-xl border-cardBorder border-[1px] mb-4"
            >
              <div className="font-medium text-xl flex gap-2">
                {incomeKey}
                <div className="font-medium text-sm flex justify-center items-center">
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
                      <span className="text-cardHeading font-normal text-base text-center text-nowrap w-52">
                        {item.item}
                      </span>
                      <span className="text-center font-normal text-base text-cardText text-wrap line-clamp-3">
                        {item.quality}, {item.weight} Grams
                      </span>
                      <span className="font-medium text-base text-zakatText">
                        {item.zakat}
                      </span>
                      <Link
                        href={'income-details'}
                        className="flex justify-center items-center"
                      >
                        <Button className="bg-black text-white font-medium text-xs hover:bg-[#5e5f5d] h-8 p-3">
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
          <hr className="w-full border-[1px] border-solid border-underline" />
          <div className="flex flex-row justify-between items-center w-full">
            <Link className="flex justify-start items-center" href={''}>
              <ArrowLeftIcon />
              Back
            </Link>
            <div>
              <Button
                className="bg-detailsBtn text-btnText font-medium text-base w-6/6 hover:bg-btnHover"
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