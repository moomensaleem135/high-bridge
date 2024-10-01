'use client';
import React from 'react';
import { cn } from '@/lib/cn';
import { Button } from '../ui/button';
import Link from 'next/link';

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
  const [current, setCurrent] = React.useState(0);

  return (
    <div className="lg:flex flex-col justify-evenly">
      <section className="flex flex-col justify-center items-center">
        <h1 className="text-left w-full max-w-[850px] font-medium leading-9 text-2xl mb-2">
          {title}
        </h1>
        <div className="flex flex-col w-full justify-center items-center gap-y-3">
          {texts.map((text, index) => (
            <div key={index} className={containerClassName}>
              <span>{text.text}</span>
              <Link
                href={'income-details'}
                className="flex justify-center items-center"
              >
                <Button className="bg-transparent border-black border-[1px] w-2/3 text-white font-medium h-8 bg-black hover:bg-btnHover">
                  Start
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default IncomeSection;
