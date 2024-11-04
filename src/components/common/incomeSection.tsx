'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '@/lib/cn';
import { Button } from '../ui/button';
import Link from 'next/link';
import { IncomeChoice } from '@/store/features/income/incomeSlice';
import { Inter } from 'next/font/google';
import { useAppSelector } from '@/store/hooks';
import CustomToast from './CustomToast';
import toast from 'react-hot-toast';

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

const IncomeSection: React.FC<IncomeSectionProps> = ({
  texts,
  containerClassName = 'bg-accordionBg tracking-tight border-[1px] border-accodionBorder text-xl font-medium text-accordionText flex justify-between items-center w-full max-w-[850px] p-3 pl-6 pr-6 rounded-md xs:flex-col xs:text-center xs:gap-y-2 min-[500px]:flex min-[500px]:flex-row',
  title,
  titleClassName,
}) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.setup.setup);

  return (
    <div className="lg:flex flex-col justify-evenly">
      <section className="flex flex-col justify-center items-center">
        <h1 className="text-left w-full max-w-[850px] font-medium leading-9 text-2xl mb-2">
          {title}
        </h1>
        <div className="flex flex-col w-full justify-center items-center gap-y-3">
          {texts.map((text, index) => {
            const isDisabled =
              text.text !== 'Gold & Silver' && text.text !== 'Cash & Checking';

            const handleClick = (e: React.MouseEvent) => {
              if (isDisabled) {
                e.preventDefault(); // Prevent navigation if disabled
              } else if (
                selector.year === '' ||
                selector.religion === '' ||
                selector.startDate === null
              ) {
                e.preventDefault(); // Prevent navigation
                toast.error(
                  `You have not setup your profile yet, please complete setup to proceed.`,
                  {
                    position: 'top-right',
                  }
                );
              } else {
                dispatch(IncomeChoice(text.text));
              }
            };

            return (
              <div key={index} className={containerClassName}>
                <span>{text.text}</span>

                <Link
                  href={'income/income-details/add-items'}
                  onClick={handleClick}
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
                    Start
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
