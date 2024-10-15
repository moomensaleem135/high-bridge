import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface IncomeCardProps {
  cardData: {
    text: string;
    title: string;
  }[];
  className?: string;
}

const IncomeCard: React.FC<IncomeCardProps> = ({
  cardData,
  className,
  ...props
}) => {
  return (
    <>
      {cardData.map((card, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-center min-w-56 max-w-64"
        >
          <div className="flex flex-col justify-start items-center gap-2 p-5 bg-cardbg rounded-xl border-cardBorder border-[1px] w-full">
            <h2 className="text-cardHeading font-medium text-xl text-center text-nowrap">
              {card.title}
            </h2>
            <p className="text-center font-light text-sm text-cardText text-wrap h-16 ">
              {card.text}
            </p>
            <Link
              href={'income-details'}
              className="flex justify-center items-center w-full mt-1"
            >
              <Button className="bg-black text-white font-medium text-base w-3/6 hover:bg-[#5e5f5d]">
                Start
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

IncomeCard.displayName = 'EventCard';

export default IncomeCard;
