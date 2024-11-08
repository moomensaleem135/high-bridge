'use client';
import React, { useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '@/lib/cn';
import { Button } from '../ui/button';
import Link from 'next/link';
import { IncomeChoice } from '@/store/features/income/incomeSlice';
import { Inter } from 'next/font/google';
import { useAppSelector } from '@/store/hooks';
import { CashIItems, HouseIItems } from '@/lib/types';
import { textConstants } from '@/configs/textConstants';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

interface IncomeSectionProps {
  texts: { text: string }[];
  containerClassName?: string;
  title?: string;
  titleClassName?: string;
}

const determineHref = (
  cash: CashIItems[],
  items: any[],
  house: HouseIItems[],
  text: string
): string => {
  if (text === 'Liquid Assets (Cash, Checking, Saving, Loan)') {
    return cash.length === 0
      ? 'income/income-details/add-items/item-details'
      : 'income/income-details/add-items';
  } else if (text === 'Gold & Silver') {
    return items.length === 0
      ? 'income/income-details/add-items/item-details'
      : 'income/income-details/add-items';
  } else if (text === 'House') {
    return house.length === 0
      ? 'income/income-details/add-items/item-details'
      : 'income/income-details/add-items';
  }
  return 'income/income-details/add-items';
};

const IncomeSection: React.FC<IncomeSectionProps> = ({
  texts,
  containerClassName = 'bg-accordionBg tracking-tight border-[1px] border-accodionBorder text-xl font-medium text-accordionText flex justify-between items-center w-full max-w-[850px] p-3 pl-6 pr-6 rounded-md xs:flex-col xs:text-center xs:gap-y-2 min-[500px]:flex min-[500px]:flex-row',
  title,
}) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.setup.setup);
  const items = useSelector((state: any) => state.items.items) || [];
  const income = useSelector((state: any) => state.income.income);
  const cash: CashIItems[] = useSelector((state: any) => state.cash.cash) || [];
  const house: HouseIItems[] = useAppSelector(
    (state: any) => state.house.house
  );

  const handleClick = useCallback(
    (e: React.MouseEvent, text: string, isDisabled: boolean) => {
      if (isDisabled) {
        e.preventDefault();
      } else if (selector.year === '' || selector.startDate === null) {
        e.preventDefault();
        toast.error(
          `You have not set up your profile yet. Please complete setup to proceed.`,
          { position: 'top-right' }
        );
      } else {
        dispatch(IncomeChoice(text));
      }
    },
    [dispatch, selector]
  );

  return (
    <div className="lg:flex flex-col justify-evenly">
      <section className="flex flex-col justify-center items-center">
        <h1 className="text-left w-full max-w-[850px] font-medium leading-9 text-2xl mb-2">
          {title}
        </h1>
        <div className="flex flex-col w-full justify-center items-center gap-y-3">
          {texts.map((item, index) => {
            const isDisabled = ![
              'Gold & Silver',
              'Liquid Assets (Cash, Checking, Saving, Loan)',
              'House',
            ].includes(item.text);
            const href = useMemo(
              () => determineHref(cash, items, house, item.text),
              [income, cash, items, house, item.text]
            );

            const [mainText, bracketedText] = item.text.includes('(')
              ? item.text.split(/(\(.*\))/)
              : [item.text, ''];

            return (
              <div key={index} className={containerClassName}>
                <span>
                  {mainText}
                  {bracketedText && (
                    <span className="text-sm">{bracketedText}</span>
                  )}
                </span>
                <Link
                  href={href}
                  onClick={(e) => handleClick(e, item.text, isDisabled)}
                  className="flex justify-end items-center"
                >
                  <Button
                    className={cn(
                      'bg-transparent border-black border-[1px] xs:w-full min-[500px]:w-2/3 text-white font-normal h-8 bg-black hover:bg-btnHover pl-6 pr-6 ',
                      isDisabled ? 'opacity-50 cursor-not-allowed' : '',
                      inter.className
                    )}
                    disabled={isDisabled}
                  >
                    {textConstants.incomeStartButtonText}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default IncomeSection;
