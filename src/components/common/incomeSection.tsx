'use client';
import React from 'react';
import { useDispatch } from 'react-redux';
import { cn } from '@/lib/cn';
import { Button } from '../ui/button';
import Link from 'next/link';
import { IncomeChoice } from '@/store/features/income/incomeSlice';

interface IncomeSectionProps {
  texts: { text: string }[];
  containerClassName?: string;
  title?: string;
  titleClassName?: string;
}

const IncomeSection: React.FC<IncomeSectionProps> = ({
  texts,
  containerClassName = 'bg-accordionBg tracking-tight border-[1px] border-accodionBorder text-xl font-medium text-accordionText flex justify-between items-center w-full max-w-[850px] p-3 pl-6 pr-6 rounded-md',
  title,
  titleClassName,
}) => {
  const dispatch = useDispatch();

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

            return (
              <div key={index} className={containerClassName}>
                <span>{text.text}</span>
                <Link
                  href={'income/income-details'}
                  className="flex justify-center items-center"
                >
                  <Button
                    className={cn(
                      'bg-transparent border-black border-[1px] w-2/3 text-white font-medium h-8 bg-black hover:bg-btnHover',
                      isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                    )}
                    onClick={() =>
                      !isDisabled && dispatch(IncomeChoice(text.text))
                    }
                    disabled={isDisabled} // Disable the button if necessary
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
