'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';

import { ArrowLeftIcon } from '@/assets/svgs';
import { completeZakatUrl } from '@/configs/constants';
import { IncomeChoice } from '@/store/features/income/incomeSlice';
import { textConstants } from '@/configs/textConstants';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const personalText = [
  textConstants.goldAndSilverItem,
  textConstants.liquidAssetsItem,
  textConstants.stockItem,
  textConstants.retirementItem,
  textConstants.houseItem,
];

const commercialText = [
  textConstants.goodAndServiceItem,
  textConstants.manufactureItem,
  textConstants.farmItem,
  textConstants.livestockItem,
  textConstants.realEstateItem,
  textConstants.rentalItem,
];

const ZakatCard = () => {
  const items = useSelector((state: any) => state.items.items) || [];
  const cash = useSelector((state: any) => state.cash.cash) || [];
  const house = useSelector((state: any) => state.house.house);
  const setup = useSelector((state: any) => state.setup.setup);

  const router = useRouter();
  const dispatch = useDispatch();

  const [mainText, bracketedText] =
    textConstants.reviewCashAndChecking.includes('(')
      ? textConstants.reviewCashAndChecking.split(/(\(.*\))/)
      : [textConstants.reviewCashAndChecking, ''];

  const categorizedItems = items.reduce((acc: any, item: any) => {
    const category = personalText?.includes(item.income)
      ? 'personal'
      : commercialText?.includes(item.income)
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

  const houseItems = house.reduce((acc: any, item: any) => {
    const category = personalText?.includes(item.income)
      ? 'personal'
      : commercialText?.includes(item.income)
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
    const category = personalText?.includes(item.income)
      ? 'personal'
      : commercialText?.includes(item.income)
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
    Object.keys(categorizedItems.personal || {})?.length > 0 ||
    Object.keys(categorizedCash.personal || {})?.length > 0 ||
    Object.keys(houseItems.personal || {})?.length > 0;
  const hasCommercialItems =
    Object.keys(categorizedItems.commercial || {})?.length > 0;

  return (
    <div className="mb-8">
      {/* Render Personal Items */}
      {hasPersonalItems && (
        <div>
          <h2 className="font-medium text-2xl mb-2">
            {textConstants.personalPropertyType}
          </h2>

          {/* Render Gold & Silver if present */}
          {categorizedItems.personal?.['Gold & Silver'] &&
            categorizedItems.personal['Gold & Silver']?.length > 0 && (
              <div className="p-4 bg-cardbg rounded-xl border-cardBorder border-[1px] mb-4">
                <div className="font-medium text-xl flex gap-2">
                  <div className="xs:text-base sm:text-xl text-agTableTop">
                    {textConstants.reviewGoldAndSilver}
                  </div>
                  <div className="font-medium text-sm flex justify-center items-center text-agTableTop">
                    {/* ({categorizedItems.personal['Gold & Silver'][0].religion}) */}
                    {/* (Assembly of Muslim Jurists of America) */}
                  </div>
                </div>
                {categorizedItems.personal['Gold & Silver'].map(
                  (item: any, index: any) => (
                    <div
                      key={index}
                      className="flex flex-col justify-start items-center gap-2 pl-6 pr-6 pt-1 pb-1 bg-white rounded border border-gray-300 w-full mt-2"
                    >
                      <div className="flex justify-between items-center w-full h-10">
                        <h2
                          className={`text-cardHeading font-normal text-base text-start text-nowrap w-20 flex-1 ${inter.className}`}
                        >
                          {item.item}
                        </h2>
                        <span
                          className={`text-start font-normal text-base text-cardText text-wrap line-clamp-3 flex-1 xs:hidden md:block ${inter.className}`}
                        >
                          {item.quality}, {item.weight} {item.quantity}
                        </span>
                        <span
                          className={`font-medium text-base text-zakatText w-20 flex-1 text-center xs:hidden md:block ${inter.className}`}
                        >
                          ${item.zakat.toFixed(2)}
                        </span>
                        <Link
                          href={'/income/income-details/add-items'}
                          className="flex justify-end items-center flex-1"
                        >
                          <Button
                            className="bg-black text-white font-medium text-xs hover:bg-[#5e5f5d] h-7 rounded-md pl-4 pr-4 pt-1 pb-1 xs:hidden sm:flex"
                            onClick={() => {
                              dispatch(IncomeChoice(item.income));
                            }}
                          >
                            <span
                              className={`text-sm font-medium ${inter.className}`}
                            >
                              {textConstants.previewButtonText}
                            </span>
                          </Button>
                          <span
                            className="xs:flex sm:hidden"
                            onClick={() => {
                              dispatch(IncomeChoice(item.income));
                            }}
                          >
                            <ArrowLeftIcon className="rotate-180 h-6" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

          {/* Render Cash & Checking if present */}
          {houseItems.personal?.['House'] &&
            houseItems.personal['House']?.length > 0 && (
              <div className="p-4 bg-cardbg rounded-xl border-cardBorder border-[1px] mb-4">
                <div className="font-medium text-xl flex gap-2">
                  <div className="xs:text-base sm:text-xl text-agTableTop">
                    {textConstants.reviewHouse}
                  </div>
                  <div className="font-medium text-sm flex justify-center items-center text-agTableTop">
                    {/* ({houseItems.personal['Cash & Checking'][0].religion}) */}
                    {/* (Assembly of Muslim Jurists of America) */}
                  </div>
                </div>
                {houseItems.personal['House'].map((item: any, index: any) => (
                  <div
                    key={index}
                    className="flex flex-col justify-start items-center gap-2 pl-6 pr-6 pt-1 pb-1 bg-white rounded border border-gray-300 w-full mt-2"
                  >
                    <div className="flex justify-between items-center w-full h-10">
                      <h2
                        className={`text-cardHeading font-normal text-base text-start text-nowrap w-20 flex-1 ${inter.className}`}
                      >
                        {item.item}
                      </h2>
                      <span
                        className={`text-start font-normal text-base text-cardText text-wrap line-clamp-3 w-fit-content flex-1  xs:hidden md:block ${inter.className}`}
                      >
                        ${item.quantity}.00
                      </span>
                      <span
                        className={`font-medium text-base text-zakatText w-20 flex-1 text-center  xs:hidden md:block ${inter.className}`}
                      >
                        ${item.zakat.toFixed(2)}
                      </span>
                      <Link
                        href={'/income/income-details/add-items'}
                        className="flex justify-end items-center flex-1"
                      >
                        <Button
                          className="bg-black text-white flex justify-center items-center hover:bg-[#5e5f5d] h-7 rounded-md pl-4 pr-4 pt-1 pb-1 xs:hidden sm:flex"
                          onClick={() => {
                            dispatch(IncomeChoice(item.income));
                          }}
                        >
                          <span
                            className={`text-sm font-medium ${inter.className}`}
                          >
                            {textConstants.previewButtonText}
                          </span>
                        </Button>
                        <span
                          className="xs:flex sm:hidden"
                          onClick={() => {
                            dispatch(IncomeChoice(item.income));
                          }}
                        >
                          <ArrowLeftIcon className="rotate-180 h-6" />
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

          {/* Render Cash & Checking if present */}
          {categorizedCash.personal?.[
            'Liquid Assets (Cash, Checking, Saving, Loan)'
          ] &&
            categorizedCash.personal[
              'Liquid Assets (Cash, Checking, Saving, Loan)'
            ].length > 0 && (
              <div className="p-4 bg-cardbg rounded-xl border-cardBorder border-[1px] mb-4">
                <div className="font-medium text-xl flex gap-2">
                  <div className="xs:text-base sm:text-xl te`xt-agTableTop">
                    <span>
                      {mainText}
                      {bracketedText && (
                        <span className="text-sm">{bracketedText}</span>
                      )}
                    </span>
                  </div>
                  <div className="font-medium text-sm flex justify-center items-center text-agTableTop">
                    {/* ({categorizedCash.personal['Cash & Checking'][0].religion}) */}
                    {/* (Assembly of Muslim Jurists of America) */}
                  </div>
                </div>
                {categorizedCash.personal[
                  'Liquid Assets (Cash, Checking, Saving, Loan)'
                ].map((item: any, index: any) => (
                  <div
                    key={index}
                    className="flex flex-col justify-start items-center gap-2 pl-6 pr-6 pt-1 pb-1 bg-white rounded border border-gray-300 w-full mt-2"
                  >
                    <div className="flex justify-between items-center w-full h-10">
                      <h2
                        className={`text-cardHeading font-normal text-base text-start text-nowrap w-20 flex-1 ${inter.className}`}
                      >
                        {item.item}
                      </h2>
                      <span
                        className={`text-start font-normal text-base text-cardText text-wrap line-clamp-3 w-fit-content flex-1  xs:hidden md:block ${inter.className}`}
                      >
                        ${item.quantity}.00
                      </span>
                      <span
                        className={`font-medium text-base text-zakatText w-20 flex-1 text-center  xs:hidden md:block ${inter.className}`}
                      >
                        ${item.zakat.toFixed(2)}
                      </span>
                      <Link
                        href={'/income/income-details/add-items'}
                        className="flex justify-end items-center flex-1"
                      >
                        <Button
                          className="bg-black text-white flex justify-center items-center hover:bg-[#5e5f5d] h-7 rounded-md pl-4 pr-4 pt-1 pb-1 xs:hidden sm:flex"
                          onClick={() => {
                            dispatch(IncomeChoice(item.income));
                          }}
                        >
                          <span
                            className={`text-sm font-medium ${inter.className}`}
                          >
                            {textConstants.previewButtonText}
                          </span>
                        </Button>
                        <span
                          className="xs:flex sm:hidden"
                          onClick={() => {
                            dispatch(IncomeChoice(item.income));
                          }}
                        >
                          <ArrowLeftIcon className="rotate-180 h-6" />
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

          {/* Check if both sections are empty */}
          {categorizedItems.personal?.['Gold & Silver']?.length === 0 &&
            houseItems.personal?.['House']?.length === 0 &&
            categorizedCash.personal?.[
              'Liquid Assets (Cash, Checking, Saving, Loan)'
            ]?.length === 0 && (
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
                    className="flex flex-col justify-start items-center gap-2 pl-6 pr-6 pt-1 pb-1 bg-white rounded border border-gray-300 w-full mt-2"
                  >
                    <div className="flex justify-between items-center w-full h-10">
                      <span className="text-cardHeading font-normal text-base text-center text-nowrap w-52">
                        {item.item}
                      </span>
                      <span className="text-center font-normal text-base text-cardText text-wrap line-clamp-3">
                        {item.quality}, {item.weight} Grams
                      </span>
                      <span className="font-medium text-base text-zakatText">
                        ${item.zakat.toFixed(2)}
                      </span>
                      <Link
                        href={'income-details'}
                        className="flex justify-center items-center"
                      >
                        <Button className="bg-black text-white font-medium text-xs hover:bg-[#5e5f5d]">
                          {textConstants.previewButtonText}
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

      {items?.length !== 0 || cash?.length !== 0 || house.length !== 0 ? (
        <div className="flex flex-col justify-evenly items-center w-full gap-5 mt-12">
          <hr className="w-full border-[1px] border-solid border-underline" />
          <div className="flex flex-row justify-end items-center w-full">
            <div>
              <Button
                className="bg-detailsBtn text-btnText font-medium text-base w-6/6 hover:bg-btnHover"
                onClick={() => router.push(completeZakatUrl)}
              >
                {textConstants.completeZakatButtonText}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ZakatCard;
