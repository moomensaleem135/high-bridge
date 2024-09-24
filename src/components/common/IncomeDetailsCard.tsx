import React, { useState } from 'react';

import { IncomeDetailsIcon } from '@/assets/svgs/Income-details';
import { SelectedIcon } from '@/assets/svgs/selected';

interface IncomeDetailsCardProps {
  cardData: {
    text: string;
    title: string;
  }[];
  className?: string;
  setReligion: (value: string) => void;
}

const IncomeDetailsCard: React.FC<IncomeDetailsCardProps> = ({
  cardData,
  className,
  setReligion,
  ...props
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  return (
    <>
      {cardData.map((card, index) => (
        <div key={index} className="flex flex-col justify-center items-center">
          <div
            className={`flex flex-col justify-start items-center gap-2 p-5 bg-cardbg rounded-xl ${selectedIndex === index ? 'border-[#4CAF50]' : 'border-cardBorder'}  border-[1px] cursor-pointer  `}
            onClick={(e) => {
              alert(`religion ${card.title} selected`);
              setReligion(card.title);
              setSelectedIndex(index);
            }}
          >
            {selectedIndex === index ? (
              <div className="rounded-[50%] bg-[#4CAF5026] border-[#4CAF50] border-[1px] h-14 w-14 flex justify-center items-center">
                <SelectedIcon />
              </div>
            ) : (
              <div className="rounded-[50%] bg-[#DFE3E6] h-14 w-14 flex justify-center items-center">
                <IncomeDetailsIcon />
              </div>
            )}

            <div className="flex flex-col justify-center items-center h-24 w-60">
              <h2 className="text-cardHeading font-[600] text-xl">
                {card.title}
              </h2>
              <span className="text-center text-cardText text-md w-full text-wrap">
                {card.text}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

IncomeDetailsCard.displayName = 'IncomeDetailsCard';

export default IncomeDetailsCard;
